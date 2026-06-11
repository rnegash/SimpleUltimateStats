"use client";

import { useState } from "react";
import { Button } from "@heroui/react";

import { copy } from "@/app/_assets/strings";
import { getScoreByTeam } from "./_utils/getScoreByTeam";

import type { GameEvent } from "./types";
import { EventTable } from "./_components/EventTable";

import { addGame } from "@/actions/gameActions";

const eventButtons = [
  {
    ...copy.gamePage.events.pull,
    color: "bg-blue-400",
  },
  {
    ...copy.gamePage.events.score,
    color: "bg-green-400",
  },
  {
    ...copy.gamePage.events.turnover,
    color: "bg-red-400",
  },
];

export type EventButton = (typeof eventButtons)[0];

import { teams } from "./constants";
import { AddEventPopover } from "./_components/AddEventPopover";

const ClientGame = ({ players }: { players: { name: string }[] }) => {
  const [events, setEvents] = useState<GameEvent[]>([]);

  return (
    <div className="min-h-screen flex flex-col items-center p-6">
      <div className="w-full justify-center text-2xl flex gap-2">
        <span>
          {teams.TEAM_DARK || copy.gamePage.darkTeam}{" "}
          {getScoreByTeam(teams.TEAM_DARK, events)}
        </span>
        -
        <span>
          {teams.TEAM_LIGHT || copy.gamePage.lightTeam}{" "}
          {getScoreByTeam(teams.TEAM_LIGHT, events)}
        </span>
      </div>

      <main className="max-w-3xl w-full px-6 py-20 flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          {eventButtons.map((event) => (
            <AddEventPopover
              key={event.title}
              players={players}
              event={event}
              events={events}
              setEvents={setEvents}
            />
          ))}
        </div>
        <div className="flex gap-4">
          <Button
            onClick={async () =>
              await addGame(
                events,
                `${getScoreByTeam(teams.TEAM_LIGHT, events)}: ${getScoreByTeam(teams.TEAM_DARK, events)}`,
              )
            }
          >
            {copy.gamePage.events.actions.save}
          </Button>
        </div>
        {events.length > 0 ? (
          <EventTable events={events} />
        ) : (
          copy.gamePage.eventTable.emptyState
        )}
      </main>
    </div>
  );
};

export default ClientGame;
