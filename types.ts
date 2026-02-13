
export interface Message {
  role: 'user' | 'model';
  content: string;
}

export interface StatItem {
  value: string;
  label: string;
}
