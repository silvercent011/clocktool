export default defineNuxtRouteMiddleware((to) => {
  const { status } = useAuth();

  if (status.value === "authenticated" && to.path === "/signin") {
    return navigateTo("/");
  }
  if (status.value === "unauthenticated" && to.path !== "/signin") {
    return navigateTo("/signin");
  }
});
