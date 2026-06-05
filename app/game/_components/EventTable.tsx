import { copy } from "@/app/assets/strings";
import { Table } from "@heroui/react/table";
import type { GameEvent } from "../types";

export const EventTable = ({ events }: { events: GameEvent[] }) => (
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
        {events.toReversed().map((event) => (
          <Table.Row key={event.timestamp}>
            <Table.Cell>
              {event.type} {event.type === "score" && event.data?.points}
            </Table.Cell>
            <Table.Cell>{event.teamId}</Table.Cell>
            <Table.Cell>{event.playerId}</Table.Cell>
            <Table.Cell>{event.gametime}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Content>
  </Table>
);
