// import { User, getServerSession } from "next-auth";

// export const session = async ({ session, token }: any) => {

//     console.log("TOKEN ==== ", token)
//     console.log("SESSION ==== ", session)

//   session.user.id = token.id;
//   session.user.tenant = token.tenant;
//   return session;
// };
// export const getUserSession = async (): Promise<User> => {
//   const authUserSession = await getServerSession({
//     callbacks: {
//       session,
//     },
//   });
//   return authUserSession?.session;
// };

import { User, getServerSession } from "next-auth";

export const session = async ({ session, token }: any) => {
  console.log("TOKEN SESSION ==== ", token);
  console.log("SESSION SESSION ==== ", session);

  session.user.id = token.id;
  return session;
};

export const getUserSession = async (): Promise<User> => {
  const authUserSession = await getServerSession({
    callbacks: {
      session,
    },
  });
  // if (!authUserSession) throw new Error('unauthorized')
  return authUserSession?.user;
};
