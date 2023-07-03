import { JiraIssuesRequest } from "types/JiraIssuesRequest";

export const fetchMyOpenIssues = async () => {
  const { public: publicConfig } = useRuntimeConfig();

  const { jiraApiToken, jiraSubdomain } = publicConfig;

  const { session } = useAuth();

  const jqlQuery = `assignee = currentUser() AND status != "Done" AND resolution = Unresolved order by updated DESC`;

  const payload = await $fetch<JiraIssuesRequest>(
    `https://${jiraSubdomain}.atlassian.net/rest/api/3/search`,
    {
      headers: {
        Authorization: `Basic ${Buffer.from(
          `${session.value.user.email}:${jiraApiToken}`
        ).toString("base64")}`,
      },
      query: {
        jql: `${jqlQuery}`,
        maxResults: 100,
        fields: "summary,status,issuetype,project,id,key",
      },
    }
  );

  return payload;
};
