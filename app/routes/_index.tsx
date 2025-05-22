import { PrismaClient } from "@prisma/client";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/node";
import GameCard from "~/components/GameCard";
import gamelogFallback from "~/assets/svg/gamelog-logo.svg";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader() {
  const prisma = new PrismaClient();

  const games = await prisma.game.findMany({
    select: {
      id: true,
      title: true,
      releaseDate: true,
      imageUrl: true,
      category: {
        select: {
          title: true,
        },
      },
    },
  });

  return json({ games });
}

export default function Index() {
  const { games } = useLoaderData<typeof loader>();

  return (
    <div className="container px-8 mx-auto min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {games.map((game) => (
          <GameCard
            key={game.id}
            id={game.id}
            title={game.title}
            releaseDate={game.releaseDate}
            imageUrl={game.imageUrl || gamelogFallback}
            genre={game.category?.title || "Unknown"}
          />
        ))}
      </div>
    </div>
  );
}
