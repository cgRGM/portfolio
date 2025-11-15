import { Password } from "@convex-dev/auth/providers/Password";
import { convexAuth } from "@convex-dev/auth/server";

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [
    Password({
      profile(params) {
        // Only allow cg@rocktownlabs.com to sign up/sign in
        if (params.email !== "cg@rocktownlabs.com") {
          throw new Error("Unauthorized email address");
        }
        return {
          email: params.email as string,
        };
      },
    }),
  ],
});
