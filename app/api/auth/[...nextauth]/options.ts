// import { NextAuthOptions } from "next-auth";
// import { encode, decode } from "next-auth/jwt";
// import GoogleProvider from "next-auth/providers/google";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { MongoDBAdapter } from "@auth/mongodb-adapter";
// import clientPromise from "@/lib/db/clientPromise";
// import { Adapter } from "next-auth/adapters";

// const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
// const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;
// const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET!;

// // console.log("GOOGLE CREDS ===== ", GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET);

// export const authOptions: NextAuthOptions = {
//   secret: NEXTAUTH_SECRET,
//   adapter: MongoDBAdapter(clientPromise) as Adapter,

//   // oAuth providers like google, facebook etc and also credentials provider (user provided creds)
//   providers: [
//     GoogleProvider({
//       clientId: GOOGLE_CLIENT_ID,
//       clientSecret: GOOGLE_CLIENT_SECRET,
//     }),
//     CredentialsProvider({
//       name: "Credentials",
//       //   Input fields for form as signin page
//       credentials: {
//         username: {
//           label: "username",
//           type: "text",
//           placeholder: "Enter your name",
//         },
//         password: {
//           label: "passord",
//           type: "password",
//           placeholder: "Enter your password",
//         },
//       },

//       async authorize(
//         credentials: Record<"username" | "password", string> | undefined
//       ) {
//         // database management logic (if user exists in database or not)

//         // hardcoding for just testing purpose
//         const user = { id: "1", username: "raheel", password: "12345" };
//         if (
//           credentials?.username === user.username &&
//           credentials?.password === user.password
//         ) {
//           console.log("HERE COMES USER ========= ", user);
//           return {
//             name: credentials.username,
//             password: credentials.password,
//           };
//         } else {
//           return null;
//         }
//       },
//     }),
//   ],

//   session: {
//     strategy: "jwt",
//   },
//   jwt: { encode, decode },

//   callbacks: {
//     session: async ({ session, token }) => {
//       console.log("HERE COMES TOKEN SESSION ==== ", token);
//       return {
//         ...session,
//         user: { ...session.user, password: "My new password goes here" },
//       };
//     },
//     async signIn(params) {
//       console.log("HERE COMES SIGNIN");
//       return true;
//     },
//     //   async jwt({ token, account, profile }) {
//     //     console.log("JWT ===== ", { token, account, profile });
//     //     // Persist the OAuth access_token and or the user id to the token right after signin
//     //     if (account) {
//     //       token.accessToken = account.access_token;
//     //       token.id = profile?.id;
//     //     }
//     //     return token;
//     //   },
//     // },

//     // defines the custom path for signin page
//     // pages : {
//     //     signIn : '/signin'
//   },
// };

import { NextAuthOptions } from "next-auth";
import { encode, decode } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
// import { MongoDBAdapter } from "@auth/mongodb-adapter";
// import clientPromise from "@/lib/db/clientPromise";
// import { Adapter } from "next-auth/adapters";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;
const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET!;

console.log(
  "ENVS ===== ",
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  NEXTAUTH_SECRET
);

// console.log("GOOGLE CREDS ===== ", GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET);

export const authOptions: NextAuthOptions = {
  secret: NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      async profile(profile) {
        const googleProfile = {
          ...profile,
          id: profile.sub,
          image: profile.picture,
          name: profile.name,
          role: "ANOTHER ROLE",
        };

        return googleProfile;
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      //   Input fields for form as signin page
      credentials: {
        username: {
          label: "username",
          type: "text",
          placeholder: "Enter your name",
        },
        password: {
          label: "passord",
          type: "password",
          placeholder: "Enter your password",
        },
      },

      async authorize(
        credentials: Record<"username" | "password", string> | undefined
      ) {
        // database management logic (if user exists in database or not)

        // hardcoding for just testing purpose
        const user = { id: "1", username: "raheel", password: "12345" };
        if (
          credentials?.username === user.username &&
          credentials?.password === user.password
        ) {
          console.log("HERE COMES USER ========= ", user);
          return {
            name: credentials.username,
            password: credentials.password,
          };
        } else {
          return null;
        }
      },
    }),
  ],

  callbacks: {
    jwt({ token, user }) {
      console.log("JWT=============", user);
      if (user) token.role = user.role;
      return token;
    },

    session({ session, token }) {
      console.log("SESSION=============", token);
      if (session.user) session.user.role = token.role;
      return session;
    },
  },
};
