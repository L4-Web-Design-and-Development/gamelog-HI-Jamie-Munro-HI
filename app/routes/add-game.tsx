import { useState } from "react";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { json, redirect } from "@remix-run/node";
import type { ActionFunctionArgs } from "@remix-run/node";
import { PrismaClient } from "@prisma/client";
import ImageUploader from "~/components/ImageUploader";
import GameImage from "~/assets/png/Add-game-background.png";

export async function loader() {
  const prisma = new PrismaClient();
  const categories = await prisma.category.findMany({
    select: { id: true, title: true },
    orderBy: { title: "asc" },
  });

  prisma.$disconnect();
  return json({ categories });
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const price = parseFloat(formData.get("price") as string);
  const rating = parseFloat(formData.get("rating") as string);
  const releaseDate = new Date(formData.get("releaseDate") as string);
  const imageUrl = formData.get("imageUrl") as string;
  const categoryId = formData.get("categoryId") as string;

  const prisma = new PrismaClient();
  await prisma.game.create({
    data: {
      title,
      description,
      price,
      rating,
      releaseDate,
      imageUrl,
      categoryId,
    },
  });

  prisma.$disconnect();
  return redirect("/");
}

export default function AddGame() {
  const { categories } = useLoaderData<typeof loader>();
  const [imageUrl, setImageUrl] = useState("");

  const handleImageUploaded = (url: string) => {
    setImageUrl(url);
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center px-4 py-12"
      style={{ backgroundImage: `url(${GameImage})` }}
    >
      <div className="w-full max-w-5xl bg-white/10 backdrop-blur-md p-10 rounded-3xl border border-white/10 shadow-2xl text-white">
        <h1 className="text-5xl font-bold mb-10 text-center">
          Add A <span className="text-cyan-400">Game</span>
        </h1>

        <Form method="post" className="space-y-8">
          <input type="hidden" name="imageUrl" value={imageUrl} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label htmlFor="title" className="block mb-2 text-slate-300">
                  Game Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  required
                  placeholder="For example: Cuphead, Uncharted"
                  className="w-full p-3 rounded-md bg-white/10 text-white placeholder-slate-400 border border-white/20 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
              </div>

              <div>
                <label htmlFor="price" className="block mb-2 text-slate-300">
                  Game Price
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  step="0.01"
                  min="0"
                  required
                  className="w-full p-3 rounded-md bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
              </div>

              <div>
                <label
                  htmlFor="categoryId"
                  className="block mb-2 text-slate-300"
                >
                  Game Genre
                </label>
                <select
                  id="categoryId"
                  name="categoryId"
                  required
                  className="w-full p-3 rounded-md bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                >
                  <option value="">Select a genre</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="releaseDate"
                  className="block mb-2 text-slate-300"
                >
                  Date Released
                </label>
                <input
                  type="date"
                  id="releaseDate"
                  name="releaseDate"
                  required
                  className="w-full p-3 rounded-md bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
              </div>

              <div>
                <label htmlFor="rating" className="block mb-2 text-slate-300">
                  Game Rating
                </label>
                <input
                  type="number"
                  id="rating"
                  name="rating"
                  step="0.1"
                  min="0"
                  max="5"
                  required
                  className="w-full p-3 rounded-md bg-white/10 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                />
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label
                  htmlFor="description"
                  className="block mb-2 text-slate-300"
                >
                  Description Of Game
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={6}
                  required
                  className="w-full p-3 rounded-md bg-white/10 text-white placeholder-slate-400 border border-white/20 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                ></textarea>
              </div>

              <div>
                <label
                  htmlFor="image-upload"
                  className="block mb-2 text-slate-300"
                >
                  Image From Game
                </label>
                <div className="p-3 bg-white/10 border border-white/20 rounded-md">
                  <ImageUploader
                    id="image-upload"
                    onImageUploaded={handleImageUploaded}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-6">
            <Link
              to="/"
              className="py-3 px-6 rounded-md text-white border border-white/20 bg-white/10 hover:bg-white/20 transition"
            >
              CANCEL
            </Link>
            <button
              type="submit"
              className="py-3 px-6 rounded-md bg-cyan-400 text-black font-semibold hover:bg-cyan-300 transition"
            >
              SUBMIT
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}
