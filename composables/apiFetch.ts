export const apiFetch = $fetch.create({
  baseURL: useRuntimeConfig().public.apiURL,
});
