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
