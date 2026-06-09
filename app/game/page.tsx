"use client";
import { useState } from "react";
import { Form, Popover, Button } from "@heroui/react";

import { copy } from "@/app/_assets/strings";

//import { sampleEvents } from "../../mocks/events";
import { getScoreByTeam } from "./_utils/getScoreByTeam";

import type { GameEvent, Event } from "./types";
import { EventTable } from "./_components/EventTable";

import { EventFormElements } from "./_components/EventFormElements";
import { handleFormSubmit } from "./_utils/handleFormSubmit";
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

export const teams = {
  TEAM_DARK: "Darks",
  TEAM_LIGHT: "Lights",
} as const;

type TeamKeys = keyof typeof teams;

export type Team = (typeof teams)[TeamKeys];

const GamePage = () => {
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
            <Popover key={event.title}>
              <Button className={event.color} fullWidth size="lg">
                {event.title}
              </Button>
              <Popover.Content className="max-w-72 overflow-scroll">
                <Popover.Dialog>
                  <Popover.Heading className=" font-bold">
                    {event.addEvent}
                  </Popover.Heading>
                  <Form
                    className="flex flex-col gap-4"
                    onSubmit={(formEvent) => {
                      handleFormSubmit(
                        formEvent,
                        event.title.toLowerCase() as Event,
                        events,
                        setEvents,
                      );
                    }}
                  >
                    <EventFormElements
                      eventType={event.title.toLowerCase() as Event}
                    />

                    <div className="flex gap-2">
                      <Button type="submit">Submit</Button>
                    </div>
                  </Form>
                </Popover.Dialog>
              </Popover.Content>
            </Popover>
          ))}
        </div>
        <div className="flex gap-4">
          <Button onClick={async () => await addGame(events)}>
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

export default GamePage;
