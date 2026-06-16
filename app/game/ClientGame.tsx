"use client";

import { useState } from "react";
import { Alert, Button, ErrorMessage, Spinner } from "@heroui/react";

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

  const [gameSavedStatus, setGameSavedStatus] = useState({
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
            <AddEventPopover
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
          onClick={async () => {
            setGameSavedStatus({
              pending: true,
              success: false,
              error: false,
            });

            try {
              await addGame(
                events,
                `${getScoreByTeam(teams.TEAM_LIGHT, events)}: ${getScoreByTeam(teams.TEAM_DARK, events)}`,
              );
              setGameSavedStatus({
                success: true,
                error: false,
                pending: false,
              });
            } catch (error) {
              setGameSavedStatus({
                error: true,
                success: false,
                pending: false,
              });
            }
          }}
        >
          {gameSavedStatus.pending
            ? "Saving..."
            : copy.gamePage.events.actions.save}
        </Button>

        {gameSavedStatus.pending && (
          <Alert status="accent">
            <Alert.Indicator>
              <Spinner size="sm" />
            </Alert.Indicator>
            <Alert.Content>
              <Alert.Title>Processing your request</Alert.Title>
              <Alert.Description>
                Please wait while we sync your data. This may take a few
                moments.
              </Alert.Description>
            </Alert.Content>
          </Alert>
        )}

        {gameSavedStatus.success && (
          <Alert status="success">
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Title>Game saved successfully</Alert.Title>
            </Alert.Content>
          </Alert>
        )}

        {gameSavedStatus.error && (
          <Alert status="danger">
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Title>Unable to connect to server</Alert.Title>
              <Alert.Description>
                We're experiencing connection issues. Please try the following:
                <ul className="mt-2 list-inside list-disc space-y-1 text-sm">
                  <li>Check your internet connection</li>
                  <li>Refresh the page</li>
                  <li>Clear your browser cache</li>
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
