import NextAuth from "next-auth/next";
import { authOptions } from "./options";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

// import { session } from "@/lib/auth/session";
// import { NextAuthOptions } from "next-auth";
// import NextAuth from "next-auth/next";
// import GoogleProvider from "next-auth/providers/google";

// const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
// const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;

// const authOption: NextAuthOptions = {
//   session: {
//     strategy: "jwt",
//   },
//   providers: [
//     GoogleProvider({
//       clientId: GOOGLE_CLIENT_ID,
//       clientSecret: GOOGLE_CLIENT_SECRET,
//     }),
//   ],
//   callbacks: {
//     async signIn({ account, profile }) {
//       if (!profile?.email) {
//         throw new Error("No profile");
//       }

//       //   await prisma.user.upsert({
//       //     where: {
//       //       email: profile.email,
//       //     },
//       //     create: {
//       //       email: profile.email,
//       //       name: profile.name,
//       //     },
//       //     update: {
//       //       name: profile.name,
//       //     },
//       //   });
//       return true;
//     },
//     session,
//     async jwt({ token, user, account, profile }) {
//       console.log("PROFILE ===== ", profile);
//       console.log("USER ===== ", user);
//       console.log("ACCOUNT ===== ", account);
//       console.log("TOKEN ===== ", token);
//       return token;
//     },
//   },
// };

// const handler = NextAuth(authOption);
// export { handler as GET, handler as POST };

