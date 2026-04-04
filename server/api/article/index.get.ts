import { Article } from '~/types/article';

export default defineEventHandler(async (event): Promise<Article[]> => {
  const baseURL = useRuntimeConfig().public.apiURL;
  const res = await fetch(`${baseURL}/api/article`);
  const data = await res.json();
  return data;
});
