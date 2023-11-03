export async function request<T>(
  url: string,
  options: object = {},
): Promise<T | string> {
  const response = await fetch(url, options);
  return response.json();
}
