import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: async ({ req, token }) => {
      if (req.nextUrl.pathname.startsWith("/recruiters"))
        return token?.role === "RECRUITER";
      return !!token;
    },
  },
});

export const config = {
  matcher: ["/users/profile/edit/:id+", "/recruiters"],
};
