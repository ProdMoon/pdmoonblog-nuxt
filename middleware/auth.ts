export default defineNuxtRouteMiddleware((to, from) => {
  const { status } = useAuth();

  if (status.value === 'authenticated') {
    return;
  }

  return navigateTo(`/account/signin?returnurl=${encodeURIComponent(to.path)}`);
});
