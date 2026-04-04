import type { Article } from '~/types/article';

export default defineEventHandler(async (event): Promise<Article> => {
  const id = getRouterParam(event, 'id');
  const baseURL = useRuntimeConfig().public.apiURL;
  const res = await fetch(`${baseURL}/api/article/${id}`);
  const data = await res.json();
  return data;
});
