export default defineEventHandler(async (event): Promise<void> => {
  const body = await readBody(event);
  const baseURL = useRuntimeConfig().public.apiURL;
  await fetch(`${baseURL}/api/article`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
});
