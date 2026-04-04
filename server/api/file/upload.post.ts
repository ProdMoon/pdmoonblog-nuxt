export default defineEventHandler(async (event): Promise<void> => {
  const formData = await readMultipartFormData(event);
  const body = new FormData();
  formData?.forEach((part) => {
    if (!part.name) return;
    if (part.filename) {
      const blob = new Blob([part.data], { type: part.type });
      body.append(part.name, blob, part.filename);
      return;
    }
    body.append(part.name, part.data.toString());
  });
  const baseURL = useRuntimeConfig().public.apiURL;
  await $fetch(`${baseURL}/api/file/upload`, {
    method: 'POST',
    body,
  });
});
