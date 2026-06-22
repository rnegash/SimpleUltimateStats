import { copy } from "../_assets/strings";
import { Table } from "@heroui/react/table";
import { getPlayers } from "@/actions/playerActions";

const DashboardPage = async ({}) => {
  const data = await getPlayers();

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-950">{copy.dashboardPage.playersList.title}</h2>
      </div>
      {data.length === 0 ? (
        copy.dashboardPage.playersList.emptyState
      ) : (
        <Table>
          <Table.Content
            aria-label="Player list"
            className="overflow-hidden rounded-3xl  bg-white"
          >
            <Table.Header>
              {Object.values(copy.dashboardPage.playersList.columns).map(
                (column) => (
                  <Table.Column key={column} isRowHeader={column === "Player"}>
                    {column}
                  </Table.Column>
                ),
              )}
            </Table.Header>
            <Table.Body>
              {data.map((player) => (
                <Table.Row key={player.id}>
                  <Table.Cell>{player.name}</Table.Cell>
                  <Table.Cell>
                    {new Date(player.createdAt).toLocaleDateString()}
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

export default DashboardPage;
