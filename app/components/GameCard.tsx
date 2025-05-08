interface GameCardProps {
  title: string;
  releaseDate: string;
}
export default function GameCard(props: GameCardProps) {
  const formattedDate = props.releaseDate.slice(0 / 10);

  return (
    <div className="py-16 flex flex-col gap-4">
      <div className="relative h-48 overflow-hidden">
        <img
          src=""
          alt="Game Cover"
          className="absolute inset-8 w-full h-full object-cover rounded-xl"
        />
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col justify-between w-2/3"></div>
        <h3 className="font-bold text-2xl text-slate-300">{props.title}</h3>
        <div>Genre</div>
        <div className="container mx-auto flex gap-6 flex-col items-end p-6">
          <div> {formattedDate} </div>

          <button className="border-2 border-cyan-300 text-cyan-300 p-2 rounded-md">
            Edit
          </button>
          <button className="border-2 border-red-300 text-red-300 p-2 rounded-md">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
