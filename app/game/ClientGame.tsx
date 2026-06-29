"use client";

import { useState } from "react";
import { Alert, Button, ErrorMessage, Spinner } from "@heroui/react";

import { copy } from "@/app/_assets/strings";
import { getScoreByTeam } from "./_utils/getScoreByTeam";

import type { GameEvent } from "./types";
import { EventTable } from "./_components/EventTable";

import { saveGame } from "./_utils/saveGame";

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

export type GameSavedStatus = {
  pending: boolean;
  success: boolean;
  error: boolean;
};

import { teams } from "./constants";
import { AddEventForm } from "./_components/AddEventForm";

const ClientGame = ({ players }: { players: { name: string }[] }) => {
  const [events, setEvents] = useState<GameEvent[]>([]);

  const [gameSavedStatus, setGameSavedStatus] = useState<GameSavedStatus>({
    pending: false,
    success: false,
    error: false,
  });

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
            <AddEventForm
              key={event.title}
              players={players}
              event={event}
              events={events}
              setEvents={setEvents}
            />
          ))}
        </div>
        <Button
          isDisabled={gameSavedStatus.pending}
          onClick={() => saveGame(events, setGameSavedStatus)}
        >
          {gameSavedStatus.pending
            ? copy.gamePage.events.actions.saving
            : copy.gamePage.events.actions.save}
        </Button>

        {gameSavedStatus.pending && (
          <Alert status="accent">
            <Alert.Indicator>
              <Spinner size="sm" />
            </Alert.Indicator>
            <Alert.Content>
              <Alert.Title>
                {copy.gamePage.events.actions.pending.title}
              </Alert.Title>
              <Alert.Description>
                {copy.gamePage.events.actions.pending.description}
              </Alert.Description>
            </Alert.Content>
          </Alert>
        )}

        {gameSavedStatus.success && (
          <Alert status="success">
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Title>
                {copy.gamePage.events.actions.success.title}
              </Alert.Title>
            </Alert.Content>
          </Alert>
        )}

        {gameSavedStatus.error && (
          <Alert status="danger">
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Title>
                {copy.gamePage.events.actions.error.title}
              </Alert.Title>
              <Alert.Description>
                {copy.gamePage.events.actions.error.description}

                <ul className="mt-2 list-inside list-disc space-y-1 text-sm">
                  {copy.gamePage.events.actions.error.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </Alert.Description>
            </Alert.Content>
          </Alert>
        )}

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
