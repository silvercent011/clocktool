export default defineEventHandler(async (event) => {
  const { issue_key, email } = await readBody(event);

  const { public: publicConfig } = useRuntimeConfig();

  const { clockworkApiToken } = publicConfig;

  const payload = await $fetch(`https://api.clockwork.report/v1/stop_timer`, {
    method: "POST",
    mode: "cors",
    body: {
      issue_key,
    },
    headers: {
      "Referrer-Policy": "strict-origin-when-cross-origin",
      "Content-Type": "application/json",
      Authorization: "Token " + clockworkApiToken,
    },
  });

  const storage = useStorage("data");

  storage.setItem(`lastTimerStatus:${email}:${issue_key}`, `stopped`);

  return payload;
});
