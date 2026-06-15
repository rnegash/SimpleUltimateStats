import { getEventsDataByGameId } from "@/actions/eventActions";
import { getGameById } from "@/actions/gameActions";
import { copy } from "@/app/_assets/strings";
import { EventTable } from "@/app/game/_components/EventTable";
import { Table } from "@heroui/react";

export default async function PastGamePAge({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const game = await getGameById(parseInt(id));
  const gameEvents = await getEventsDataByGameId(parseInt(id));

  return (
    <section className="flex flex-col gap-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70">
      <h2 className="text-xl font-semibold text-slate-950">
        {game.name} - Final result:
        <span>{game.finalScore}</span>
      </h2>

      <Table>
        <Table.Content aria-label="Event history" className="min-w-150">
          <Table.Header>
            <Table.Column isRowHeader>
              {copy.gamePage.eventTable.eventData.required.type}
            </Table.Column>
            <Table.Column>
              {copy.gamePage.eventTable.eventData.required.team}
            </Table.Column>
            <Table.Column>
              {copy.gamePage.eventTable.eventData.required.player}
            </Table.Column>
            <Table.Column>
              {copy.gamePage.eventTable.eventData.required.timestamp}
            </Table.Column>
          </Table.Header>
          <Table.Body>
            {gameEvents.toReversed().map((event) => {
              return (
                <Table.Row key={event.timestamp}>
                  <Table.Cell>
                    {event.eventType}{" "}
                    {event.eventType === "score" &&
                      (
                        event.additionalStats as {
                          assistBy: string;
                          points: number;
                        }
                      )?.points}
                  </Table.Cell>
                  <Table.Cell>{event.team}</Table.Cell>
                  <Table.Cell>{event.player}</Table.Cell>
                  <Table.Cell>{event.gametime}</Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table.Content>
      </Table>
    </section>
  );
}
