import { JiraIssuesRequest } from "types/JiraIssuesRequest";

interface TCloud {
  id: String;
  url: String;
  name: String;
  scopes: String[];
  avatarUrl: String;
}

export const fetchMyOpenIssues = async () => {
  const { public: publicConfig } = useRuntimeConfig();

  const { jiraApiToken, jiraSubdomain } = publicConfig;

  const { data: session } = useAuth();

  const cloudData = await $fetch<TCloud[]>(
    "https://api.atlassian.com/oauth/token/accessible-resources",
    {
      headers: {
        // @ts-ignore
        Authorization: `Bearer ${session.value.accessToken}`,
      },
    }
  );

  const cloudActual = cloudData.find((cloud) => cloud.name === jiraSubdomain);

  const jqlQuery = `assignee = currentUser() AND status != "Done" AND resolution = Unresolved order by updated DESC`;

  const payload = await $fetch<JiraIssuesRequest>(
    `https://api.atlassian.com/ex/jira/${cloudActual!.id}/rest/api/3/search`,
    {
      headers: {
        // Authorization: `Basic ${Buffer.from(
        //   `${session.value!.user!.email}:${jiraApiToken}`
        // ).toString("base64")}`,
        // @ts-ignore
        Authorization: `Bearer ${session.value.accessToken}`,
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
