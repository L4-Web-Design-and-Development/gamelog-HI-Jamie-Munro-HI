export default function GameCard() {
  return (
    <div className="my-16">
      <div className="h-48 bg-gray-400">Picture</div>

      <div>
        Footer Container
        <div>Game Info</div>
        <div className="container mx-auto flex gap-6 flex-col items-end p-6">
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
