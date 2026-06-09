import { getPlayers } from "@/actions/userActions";
import ClientGame from "./ClientGame";

const GamePage = async () => {
  const rows = await getPlayers();
  const players = rows.map((p: any) => ({ name: p.name }));

  return <ClientGame players={players} />;
};

export default GamePage;
