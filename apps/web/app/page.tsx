import prismaClient from "@repo/db/client";

export default async function Home() {
  const user = await prismaClient.user.findMany();
  console.log("user", user);
  prismaClient
  return (
    <div>Hello world</div>
  );
}
