export const fetchClockworkData = async () => {
  const { public: publicConfig } = useRuntimeConfig();

  const { clockworkApiToken } = publicConfig;

  const { session } = useAuth();

  const payload = await $fetch(`https://api.clockwork.report/v1/worklogs`, {
    query: {
      user_query: session.value.user.email,
      expand: "issues,authors,emails",
    },
    headers: {
      Authorization: "Token " + clockworkApiToken,
    },
  });

  return payload;
};
