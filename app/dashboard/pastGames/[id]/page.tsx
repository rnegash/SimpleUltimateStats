import { getGameById } from "@/actions/gameActions";

export default async function PastGamePAge({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const game = await getGameById(parseInt(id));

  return (
    <div>
      <h1>{game.name}</h1>
      <p>{game.finalScore}</p>
    </div>
  );
}
