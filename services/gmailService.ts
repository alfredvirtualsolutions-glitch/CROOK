const GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";
const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
const GOOGLE_USER_INFO_URL = "https://www.googleapis.com/oauth2/v2/userinfo";
const GMAIL_API_BASE_URL = "https://gmail.googleapis.com/gmail/v1/users/me";

const GMAIL_SCOPES = [
	"https://www.googleapis.com/auth/gmail.send",
	"https://www.googleapis.com/auth/gmail.readonly",
	"https://www.googleapis.com/auth/userinfo.email",
] as const;

export interface GmailTokenResponse {
	access_token: string;
	refresh_token?: string;
	expires_in: number;
	scope: string;
	token_type: string;
}

interface GmailTokenError {
	error?: string;
	error_description?: string;
}

export interface GmailUserInfo {
	email: string;
	verified_email: boolean;
}

interface GmailMessageHeader {
	name: string;
	value: string;
}

interface GmailMessagePart {
	mimeType?: string;
	body?: {
		data?: string;
	};
	parts?: GmailMessagePart[];
}

interface GmailApiMessage {
	id: string;
	threadId: string;
	payload?: {
		headers?: GmailMessageHeader[];
		body?: {
			data?: string;
		};
		parts?: GmailMessagePart[];
	};
}

export interface GmailMessage {
	id: string;
	threadId: string;
	from: string;
	to: string;
	subject: string;
	body: string;
	date: string;
}

function decodeBase64Url(input: string): string {
	const normalized = input.replace(/-/g, "+").replace(/_/g, "/");
	const padded = normalized + "=".repeat((4 - (normalized.length % 4)) % 4);
	try {
		return atob(padded);
	} catch (e) {
		return "";
	}
}

function getMessageHeader(headers: GmailMessageHeader[] | undefined, name: string): string {
	if (!headers) {
		return "";
	}

	const found = headers.find((header) => header.name.toLowerCase() === name.toLowerCase());
	return found?.value ?? "";
}

function extractBody(part: GmailMessagePart | undefined): string {
	if (!part) {
		return "";
	}

	if (part.body?.data) {
		return decodeBase64Url(part.body.data);
	}

	for (const childPart of part.parts ?? []) {
		if (childPart.mimeType === "text/plain" && childPart.body?.data) {
			return decodeBase64Url(childPart.body.data);
		}
	}

	for (const childPart of part.parts ?? []) {
		const nestedBody = extractBody(childPart);
		if (nestedBody) {
			return nestedBody;
		}
	}

	return "";
}

async function parseJsonResponse<T>(response: Response, context: string): Promise<T> {
	if (!response.ok) {
		let errorDetail = `${context} (status: ${response.status})`;
		try {
			const errorBody = (await response.json()) as GmailTokenError;
			if (errorBody.error_description) {
				errorDetail += `: ${errorBody.error_description}`;
			} else if (errorBody.error) {
				errorDetail += `: ${errorBody.error}`;
			}
		} catch {
			// Ignore JSON parsing errors
		}
		throw new Error(errorDetail);
	}

	return (await response.json()) as T;
}

export function getGmailAuthUrl(clientId: string, redirectUri: string, state?: string): string {
	const params = new URLSearchParams({
		client_id: clientId,
		redirect_uri: redirectUri,
		response_type: "code",
		scope: GMAIL_SCOPES.join(" "),
		access_type: "offline",
		prompt: "consent",
		include_granted_scopes: "true",
	});

	if (state) {
		params.set("state", state);
	}

	return `${GOOGLE_AUTH_URL}?${params.toString()}`;
}

export async function exchangeGmailCode(
	code: string,
	clientId: string,
	clientSecret: string,
	redirectUri: string,
): Promise<GmailTokenResponse> {
	const response = await fetch(GOOGLE_TOKEN_URL, {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: new URLSearchParams({
			code,
			client_id: clientId,
			client_secret: clientSecret,
			redirect_uri: redirectUri,
			grant_type: "authorization_code",
		}),
	});

	return parseJsonResponse<GmailTokenResponse>(response, "Failed to exchange Gmail authorization code");
}

export async function getGmailUserInfo(accessToken: string): Promise<GmailUserInfo> {
	const response = await fetch(GOOGLE_USER_INFO_URL, {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});

	return parseJsonResponse<GmailUserInfo>(response, "Failed to fetch Gmail user info");
}

export async function refreshGmailToken(
	refreshToken: string,
	clientId: string,
	clientSecret: string,
): Promise<{ access_token: string; expires_in: number }> {
	const response = await fetch(GOOGLE_TOKEN_URL, {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: new URLSearchParams({
			refresh_token: refreshToken,
			client_id: clientId,
			client_secret: clientSecret,
			grant_type: "refresh_token",
		}),
	});

	return parseJsonResponse<{ access_token: string; expires_in: number }>(
		response,
		"Failed to refresh Gmail access token",
	);
}

export async function fetchGmailInbox(accessToken: string, maxResults = 10): Promise<GmailMessage[]> {
	const boundedMaxResults = Math.min(Math.max(Math.trunc(maxResults), 1), 100);
	const listResponse = await fetch(
		`${GMAIL_API_BASE_URL}/messages?q=is:unread&maxResults=${boundedMaxResults}`,
		{
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		},
	);

	const listData = await parseJsonResponse<{ messages?: Array<{ id: string; threadId: string }> }>(
		listResponse,
		"Failed to fetch Gmail messages list",
	);

	if (!listData.messages?.length) {
		return [];
	}

	const messagePromises = listData.messages.map(async (messageRef): Promise<GmailMessage> => {
		const messageResponse = await fetch(`${GMAIL_API_BASE_URL}/messages/${messageRef.id}?format=full`, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});

		const messageData = await parseJsonResponse<GmailApiMessage>(
			messageResponse,
			`Failed to fetch Gmail message ${messageRef.id}`,
		);

		const headers = messageData.payload?.headers;
		return {
			id: messageRef.id,
			threadId: messageRef.threadId,
			from: getMessageHeader(headers, "From"),
			to: getMessageHeader(headers, "To"),
			subject: getMessageHeader(headers, "Subject"),
			body: extractBody(messageData.payload as any),
			date: getMessageHeader(headers, "Date"),
		};
	});

	const settledMessages = await Promise.allSettled(messagePromises);
	return settledMessages
		.filter(
			(settled): settled is PromiseFulfilledResult<GmailMessage> => settled.status === "fulfilled",
		)
		.map((settled) => settled.value);
}

export async function markGmailAsRead(accessToken: string, messageId: string): Promise<void> {
	const response = await fetch(`${GMAIL_API_BASE_URL}/messages/${messageId}/modify`, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${accessToken}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			removeLabelIds: ["UNREAD"],
		}),
	});

	await parseJsonResponse<Record<string, never>>(response, `Failed to mark Gmail message ${messageId} as read`);
}
