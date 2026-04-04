export default defineEventHandler(async (event): Promise<void> => {
  const id = getRouterParam(event, 'id');
  const baseURL = useRuntimeConfig().public.apiURL;
  await fetch(`${baseURL}/api/article/${id}`, {
    method: 'DELETE',
  });
});
