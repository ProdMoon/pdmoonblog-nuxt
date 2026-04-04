export default defineEventHandler(async (event): Promise<void> => {
  const id = getRouterParam(event, 'id');
  const body = await readBody(event);
  const baseURL = useRuntimeConfig().public.apiURL;
  await fetch(`${baseURL}/api/article/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
});
