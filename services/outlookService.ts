const OUTLOOK_AUTH_URL = "https://login.microsoftonline.com/common/oauth2/v2.0/authorize";
const OUTLOOK_TOKEN_URL = "https://login.microsoftonline.com/common/oauth2/v2.0/token";
const OUTLOOK_API_BASE_URL = "https://graph.microsoft.com/v1.0/me";

const OUTLOOK_SCOPES = "openid profile email offline_access Mail.Send Mail.Read User.Read";

export interface OutlookTokenResponse {
	access_token: string;
	refresh_token: string;
	expires_in: number;
	scope: string;
	token_type: string;
}

export interface OutlookUserInfo {
	mail: string;
	userPrincipalName: string;
	displayName: string;
}

export interface OutlookMessage {
	id: string;
	conversationId: string;
	from: string;
	to: string;
	subject: string;
	body: string;
	date: string;
}

interface OutlookMessagesResponse {
	value?: Array<{
		id: string;
		conversationId?: string;
		receivedDateTime?: string;
		subject?: string;
		body?: { content?: string };
		from?: { emailAddress?: { address?: string } };
		toRecipients?: Array<{ emailAddress?: { address?: string } }>;
	}>;
}

async function parseJsonResponse<T>(response: Response, errorMessage: string): Promise<T> {
	if (!response.ok) {
		throw new Error(`${errorMessage} (status: ${response.status})`);
	}
	return (await response.json()) as T;
}

export function getOutlookAuthUrl(clientId: string, redirectUri: string): string {
	const params = new URLSearchParams({
		client_id: clientId,
		redirect_uri: redirectUri,
		response_type: "code",
		scope: OUTLOOK_SCOPES,
		response_mode: "query",
		prompt: "consent",
	});

	return `${OUTLOOK_AUTH_URL}?${params.toString()}`;
}

export async function exchangeOutlookCode(
	code: string,
	clientId: string,
	clientSecret: string,
	redirectUri: string,
): Promise<OutlookTokenResponse> {
	const response = await fetch(OUTLOOK_TOKEN_URL, {
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

	return parseJsonResponse<OutlookTokenResponse>(response, "Failed to exchange Outlook authorization code");
}

export async function getOutlookUserInfo(accessToken: string): Promise<OutlookUserInfo> {
	const response = await fetch(OUTLOOK_API_BASE_URL, {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});

	return parseJsonResponse<OutlookUserInfo>(response, "Failed to fetch Outlook user info");
}

export async function refreshOutlookToken(
	refreshToken: string,
	clientId: string,
	clientSecret: string,
): Promise<{ access_token: string; expires_in: number; refresh_token?: string }> {
	const response = await fetch(OUTLOOK_TOKEN_URL, {
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: new URLSearchParams({
			refresh_token: refreshToken,
			client_id: clientId,
			client_secret: clientSecret,
			grant_type: "refresh_token",
			scope: OUTLOOK_SCOPES,
		}),
	});

	return parseJsonResponse<{ access_token: string; expires_in: number; refresh_token?: string }>(
		response,
		"Failed to refresh Outlook access token",
	);
}

export async function fetchOutlookInbox(accessToken: string, maxResults = 10): Promise<OutlookMessage[]> {
	const boundedMaxResults = Math.min(Math.max(Math.trunc(maxResults), 1), 100);
	const query = new URLSearchParams({
		"$filter": "isRead eq false",
		"$top": String(boundedMaxResults),
		"$select": "id,conversationId,from,toRecipients,subject,body,receivedDateTime",
	});

	const response = await fetch(`${OUTLOOK_API_BASE_URL}/mailFolders/inbox/messages?${query.toString()}`, {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	});

	const data = await parseJsonResponse<OutlookMessagesResponse>(response, "Failed to fetch Outlook messages");
	return (data.value ?? []).map((msg) => ({
		id: msg.id,
		conversationId: msg.conversationId ?? "",
		from: msg.from?.emailAddress?.address ?? "",
		to: msg.toRecipients?.[0]?.emailAddress?.address ?? "",
		subject: msg.subject ?? "",
		body: msg.body?.content ?? "",
		date: msg.receivedDateTime ?? "",
	}));
}

export async function markOutlookAsRead(accessToken: string, messageId: string): Promise<void> {
	const response = await fetch(`${OUTLOOK_API_BASE_URL}/messages/${messageId}`, {
		method: "PATCH",
		headers: {
			Authorization: `Bearer ${accessToken}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			isRead: true,
		}),
	});

	if (!response.ok) {
		throw new Error(`Failed to mark Outlook message ${messageId} as read (status: ${response.status})`);
	}
}
