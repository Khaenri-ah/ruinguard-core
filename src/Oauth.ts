import fetch from 'node-fetch';

export interface TokenOptions {
  access_token: string,
}

export interface CodeGrantOptions {
  client_id: string,
  client_secret: string,
  code: string,
  redirect_uri: string,
}

export interface AccessTokenRespone {
  access_token: string,
  token_type: string,
  expires_in: number,
  refresh_token: string,
  scope: string,
}


export async function refresh(options: CodeGrantOptions): Promise<AccessTokenRespone> {
  const res = await fetch('https://discord.com/api/v9/oauth2/token', {
    method: 'POST', body: new URLSearchParams({
      ...options,
      grant_type: 'refresh_token', // eslint-disable-line camelcase
    }),
  });
  if (!res.ok) throw new Error(res.status.toString());
  return res.json() as Promise<AccessTokenRespone>;
}

export async function token(options: CodeGrantOptions): Promise<AccessTokenRespone> {
  const res = await fetch('https://discord.com/api/v9/oauth2/token', {
    method: 'POST', body: new URLSearchParams({
      ...options,
      grant_type: 'authorization_code', // eslint-disable-line camelcase
    }),
  });
  if (!res.ok) throw new Error(res.status.toString());
  return res.json() as Promise<AccessTokenRespone>;
}


export async function user(options: TokenOptions): Promise<object[]> {
  const res = await fetch('https://discord.com/api/v9/users/@me', { headers: { Authorization: `Bearer ${options.access_token}` } });
  if (!res.ok) throw new Error(res.status.toString());
  return res.json() as Promise<object[]>;
}

export async function guilds(options: TokenOptions): Promise<object[]> {
  const res = await fetch('https://discord.com/api/v9/users/@me/guilds', { headers: { Authorization: `Bearer ${options.access_token}` } });
  if (!res.ok) throw new Error(res.status.toString());
  return res.json() as Promise<object[]>;
}
