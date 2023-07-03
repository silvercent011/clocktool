export const createWorkLog = async (
  issueId: string,
  timeSpentInSeconds: number,
  startedTime: Date,
  text?: string
) => {
  const { public: publicConfig } = useRuntimeConfig();

  const { jiraApiToken, jiraSubdomain } = publicConfig;

  const { session } = useAuth();

  const bodyData = {
    comment: {
      content: [
        {
          content: [
            {
              text: text || "",
              type: "text",
            },
          ],
          type: "paragraph",
        },
      ],
      type: "doc",
      version: 1,
    },
    started: startedTime,
    timeSpentSeconds: timeSpentInSeconds,
  };

  const payload = await $fetch(
    `https://${jiraSubdomain}.atlassian.net/rest/api/3/issue/${issueId}/worklog`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${session.value.user.email}:${jiraApiToken}`
        ).toString("base64")}`,
      },
      body: bodyData,
    }
  );

  return payload;
};
