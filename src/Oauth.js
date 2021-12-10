import fetch from 'node-fetch';

export async function user(options) {
  const res = await fetch('https://discord.com/api/v9/users/@me', { headers: { Authorization: `Bearer ${options.access_token}` } });
  if (!res.ok) throw new Error(res.status);
  return res.json();
}

export async function refresh(options) {
  const res = await fetch('https://discord.com/api/v9/oauth2/token', {
    method: 'POST', body: new URLSearchParams({
      ...options,
      grant_type: 'refresh_token', // eslint-disable-line camelcase
    }),
  });
  if (!res.ok) throw new Error(res.status);
  return res.json();
}

export async function token(options) {
  const res = await fetch('https://discord.com/api/v9/oauth2/token', {
    method: 'POST', body: new URLSearchParams({
      ...options,
      grant_type: 'authorization_code', // eslint-disable-line camelcase
    }),
  });
  if (!res.ok) throw new Error(res.status);
  return res.json();
}

export async function guilds(options) {
  const res = await fetch('https://discord.com/api/v9/users/@me/guilds', { headers: { Authorization: `Bearer ${options.access_token}` } });
  if (!res.ok) throw new Error(res.status);
  return res.json();
}

export default { user, refresh, token, guilds };
