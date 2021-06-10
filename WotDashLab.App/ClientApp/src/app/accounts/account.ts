export interface IWotAccount {
  nickname: string;
  account_id: number;
}

export interface IWgnAccountSearchResult {
  account_id: number,
  created_at: number,
  games: string[],
  nickname: string
}
