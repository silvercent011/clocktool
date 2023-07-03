import { JiraIsssue } from "types/JiraIssue";

export const fetchIssueData = async (issueId: string) => {
  const { public: publicConfig } = useRuntimeConfig();

  const { jiraApiToken, jiraSubdomain } = publicConfig;

  const { session } = useAuth();

  const jqlQuery = `assignee = currentUser()`;

  const payload = await $fetch<JiraIsssue>(
    `https://${jiraSubdomain}.atlassian.net/rest/api/3/issue/${issueId}`,
    {
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${session.value.user.email}:${jiraApiToken}`
        ).toString("base64")}`,
      },
      query: {
        // jql: `${jqlQuery}`,
        maxResults: 100,
        fields: "timetracking,status,issuetype,subtasks",
      },
    }
  );

  return payload;
};
