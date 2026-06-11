import { getGamesData } from "@/actions/gameActions";
import { copy } from "../../_assets/strings";
import { Table } from "@heroui/react/table";

const PastGamesPage = async ({}) => {
  const data = await getGamesData();

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-950">Games</h2>
        </div>
      </div>
      {!data ? (
        copy.dashboardPage.pastGamesPage.gameList.emptyState
      ) : (
        <Table>
          <Table.Content
            aria-label="Past games"
            className="overflow-hidden rounded-3xl border border-slate-200 bg-white"
          >
            <Table.Header>
              {Object.values(
                copy.dashboardPage.pastGamesPage.gameList.columns,
              ).map((column) => (
                <Table.Column key={column} isRowHeader={column === "Game"}>
                  {column}
                </Table.Column>
              ))}
            </Table.Header>
            <Table.Body>
              {data.map((game) => (
                <Table.Row key={game.id}>
                  <Table.Cell>{game.name}</Table.Cell>
                  <Table.Cell>{game.finalScore}</Table.Cell>
                  <Table.Cell>
                    {new Date(game.createdAt).toISOString()}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Content>
        </Table>
      )}
    </section>
  );
};

export default PastGamesPage;
