export default defineEventHandler(async (event) => {
  const { issue_key, email } = getQuery(event);

  const storage = useStorage("data");

  const item = await storage.getItem(`lastTimerStatus:${email}:${issue_key}`);

  return item;
});
