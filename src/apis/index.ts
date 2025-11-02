const BASE_URL = "/api";

export const getRequest = async <T = unknown>(url: string): Promise<T> => {
  const resp = await fetch(`${BASE_URL}${url}`, { method: "GET" });
  return await resp.json();
};

export const postRequest = async <T = unknown, D = unknown>(
  url: string,
  data: D,
): Promise<T> => {
  const resp = await fetch(`${BASE_URL}${url}`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
  return await resp.json();
};

export const putRequest = async <T = unknown, D = unknown>(
  url: string,
  data: D,
): Promise<T> => {
  const resp = await fetch(`${BASE_URL}${url}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
  return await resp.json();
};

export const deleteRequest = async <T = unknown>(
  url: string,
): Promise<T | undefined> => {
  const resp = await fetch(`${BASE_URL}${url}`, { method: "DELETE" });
  if (resp.status === 204) return;
  return await resp.json();
};
