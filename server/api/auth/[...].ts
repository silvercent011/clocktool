import { NuxtAuthHandler } from "#auth";
import { AuthOptions } from "next-auth";
import AtlassianProvider from "next-auth/providers/atlassian";

const runtimeConfig = useRuntimeConfig();

export const authOptions: AuthOptions = {
  secret: runtimeConfig.authJs.secret,
  providers: [
    // @ts-expect-error
    AtlassianProvider.default({
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
  callbacks: {
    async session({ session, token, user }) {
      // @ts-ignore
      session.user.id = token.id;
      // @ts-ignore
      session.accessToken = token.accessToken;
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        token.id = user.id;
      }
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
  },
};

export default NuxtAuthHandler(authOptions);
