export const baseUrl = 'http://localhost:3001';

export const username = 'InternetCitizen1';
export const headers = {
  Authorization: `${username}:passwd`,
  'Content-Type': 'application/json',
};

export const httpGetRequestOptions = {
  method: 'GET',
  headers: headers,
  cache: 'default',
};

// TODO: do the above for the other verbs



