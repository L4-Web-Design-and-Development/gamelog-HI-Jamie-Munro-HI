import { Form, Link } from "@remix-run/react";

interface GameCardProps {
  id: string;
  title: string;
  releaseDate: string;
  genre: string;
  imageUrl: string;
}
export default function GameCard({
  id,
  title,
  releaseDate,
  genre,
  imageUrl,
}: GameCardProps) {
  const formattedDate = releaseDate.substring(0, 10);

  return (
    <div className="py-5 flex flex-col gap-4 ">
      <div className="flex justify-center h-48 overflow-hidden w-96">
        <img src={imageUrl} alt={`${title} cover`} />
      </div>

      <div className="flex justify-between">
        <div className="flex flex-col justify-between w-2/3">
          <h3 className="font-bold text-lg text-slate-300">{title}</h3>
          <p className="text-cyan-300 uppercase text-sm font-semibold">
            {genre}
          </p>
          <p className="text-slate-200/60 text-sm font-semibold">
            {formattedDate}
          </p>
        </div>
        <div className="flex flex-col gap-7 w-1/3">
          <Link to={`/edit-game/${id}`}>
            <button className="border-2 border-cyan-300 text-cyan-300 p-2 rounded-md transition hover:bg-cyan-50/10 w-full">
              Edit
            </button>
          </Link>
          <Form action={`/delete-game/${id}`} method="post">
            <button
              type="submit"
              className="border-2 border-red-300 text-red-300 p-2 rounded-md transition hover:bg-red-50/10 w-full"
            >
              Delete
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
}
