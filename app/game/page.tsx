import { getPlayers } from "@/actions/playerActions";
import ClientGame from "./ClientGame";

const GamePage = async () => {
  const rows = await getPlayers();
  const players = rows.map((p) => ({ name: p.name }));

  return <ClientGame players={players} />;
};

export default GamePage;
