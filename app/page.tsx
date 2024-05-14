import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/options";

const Home = async () => {
  const user = await getServerSession(authOptions);
  console.log("USER ===== ", user);
  return (
    <main>
      <h1 className="text-center text-2xl my-5">
        🔐 Next auth with credential and google providers goes here!
      </h1>
    </main>
  );
};

export default Home;
