import Image from "next/image";
import { PrismaClient } from "@prisma/client";

export default async function Home() {
  const prisma = new PrismaClient();
  
  const allUsers = await prisma.user.findMany();
  const allRestaurants = await prisma.restaurant.findMany();

  console.log(allUsers, allRestaurants);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1>Derash App</h1>
    </div>
  );
}
