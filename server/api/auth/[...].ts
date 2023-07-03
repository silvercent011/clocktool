import { NuxtAuthHandler } from "#auth";
import AtlassianProvider from "@auth/core/providers/atlassian";
import type { AuthConfig } from "@auth/core/types";

const runtimeConfig = useRuntimeConfig();

export const authOptions: AuthConfig = {
  secret: runtimeConfig.authJs.secret,
  providers: [
    AtlassianProvider({
      clientId: runtimeConfig.atlassian.clientId,
      clientSecret: runtimeConfig.atlassian.clientSecret,
      authorization: {
        params: {
          scope:
            "write:jira-work read:jira-work read:jira-user offline_access read:me",
        },
      },
    }),
  ],
};

export default NuxtAuthHandler(authOptions, runtimeConfig);
