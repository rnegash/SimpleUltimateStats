"use client";
import { useState } from "react";
import { Button } from "@heroui/react/button";
import { Popover, Table } from "@heroui/react";

import { copy } from "@/assets/strings";

import { sampleEvents } from "../mocks/events";
import { getScoreByTeam } from "./utils";

import type { Dispatch, SetStateAction } from "react";
import type { GameEvent } from "./types";
import { EventType } from "./types";

type EventButton = { text: keyof typeof EventType; color: string };

const eventButtons: EventButton[] = [
  {
    text: copy.game.events.pull as keyof typeof EventType,
    color: "bg-blue-400",
  },
  {
    text: copy.game.events.score as keyof typeof EventType,
    color: "bg-green-400",
  },
  {
    text: copy.game.events.turnover as keyof typeof EventType,
    color: "bg-red-400",
  },
];
const GamePage = () => {
  const [events, setEvents] = useState<GameEvent[]>(sampleEvents);

  return (
    <div className="min-h-screen flex flex-col items-center">
      <div className="w-full text-center">
        {copy.game.lightTeam} {getScoreByTeam("lightTeam", events)}
        {copy.game.darkTeam} {getScoreByTeam("darkTeam", events)}
      </div>
      <main className="max-w-3xl w-full px-6 py-20 flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          {eventButtons.map((event) => (
            <Popover key={event.text}>
              <Button className={event.color} fullWidth size="lg">
                {event.text}
              </Button>
              <Popover.Content className="max-w-64">
                <Popover.Dialog>
                  <Popover.Heading>Popover Title</Popover.Heading>
                  <p className="mt-2 text-sm text-muted">
                    This is the popover content. You can put any content here.
                  </p>
                </Popover.Dialog>
              </Popover.Content>
            </Popover>
          ))}
        </div>
        {events && (
          <Table>
            <Table.Content aria-label="Team members" className="min-w-[600px]">
              <Table.Header>
                <Table.Column isRowHeader>
                  {copy.game.eventData.required.type}
                </Table.Column>
                <Table.Column>{copy.game.eventData.required.team}</Table.Column>
                <Table.Column>
                  {copy.game.eventData.required.player}
                </Table.Column>
                <Table.Column>
                  {copy.game.eventData.required.timestamp}
                </Table.Column>
              </Table.Header>
              <Table.Body>
                {events.map((event) => (
                  <Table.Row key={event.timestamp}>
                    <Table.Cell>
                      {event.type}{" "}
                      {event.type === "score" && event.data?.points}
                    </Table.Cell>
                    <Table.Cell>{event.teamId}</Table.Cell>
                    <Table.Cell>{event.playerId}</Table.Cell>
                    <Table.Cell>{event.timestamp}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Content>
          </Table>
        )}
      </main>
    </div>
  );
};

export default GamePage;
