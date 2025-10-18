const BASE_URL = "";

export const getRequest = async <T = unknown>(url: string): Promise<T> => {
  const resp = await fetch(`${BASE_URL}${url}`, { method: "GET" });
  return await resp.json();
};
