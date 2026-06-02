"use client";
import { useState } from "react";
import { Form, Popover, Button } from "@heroui/react";

import { copy } from "@/app/assets/strings";

import { sampleEvents } from "../../mocks/events";
import { getScoreByTeam } from "./_utils/getScoreByTeam";

import type { GameEvent } from "./types";
import { EventType } from "./types";
import { EventTable } from "./_components/EventTable";

import { EventFormElements } from "./_components/EventFormElements";
import { handleFormSubmit } from "./_utils/handleFormSubmit";

const eventButtons = [
  {
    ...copy.game.events.pull,
    color: "bg-blue-400",
  },
  {
    ...copy.game.events.score,
    color: "bg-green-400",
  },
  {
    ...copy.game.events.turnover,
    color: "bg-red-400",
  },
];

export const TEAM_DARK = "Darks";
export const TEAM_LIGHT = "Lights";

const GamePage = () => {
  const [events, setEvents] = useState<GameEvent[]>(sampleEvents);

  return (
    <div className="min-h-screen flex flex-col items-center">
      <div className="w-full justify-center text-2xl flex gap-2  ">
        <span>
          {TEAM_LIGHT || copy.game.lightTeam}{" "}
          {getScoreByTeam(TEAM_LIGHT, events)}
        </span>
        -
        <span>
          {TEAM_DARK || copy.game.darkTeam} {getScoreByTeam(TEAM_DARK, events)}
        </span>
      </div>
      <main className="max-w-3xl w-full px-6 py-20 flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          {eventButtons.map((event) => (
            <Popover key={event.title}>
              <Button className={event.color} fullWidth size="lg">
                {event.title}
              </Button>
              <Popover.Content className="max-w-64">
                <Popover.Dialog>
                  <Popover.Heading>{event.addEvent}</Popover.Heading>
                  <Form
                    className="flex flex-col gap-4"
                    onSubmit={(formEvent) =>
                      handleFormSubmit(
                        formEvent,
                        event.title.toLowerCase() as keyof typeof EventType,
                        events,
                        setEvents,
                      )
                    }
                  >
                    <EventFormElements
                      eventType={
                        event.title.toLowerCase() as keyof typeof EventType
                      }
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
        {events && <EventTable events={events} />}
      </main>
    </div>
  );
};

export default GamePage;
