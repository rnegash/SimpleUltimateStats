"use client";
import { useState } from "react";
import { Form, Popover, Button } from "@heroui/react";

import { copy } from "@/assets/strings";

import { sampleEvents } from "../../mocks/events";
import { getScoreByTeam } from "./utils";

import type { GameEvent } from "./types";
import { EventType } from "./types";
import { EventTable } from "./_components/EventTable";
import { scoreEventSchema } from "@/schemas/scoreEvent";
import { pullEventSchema } from "@/schemas/pullEvent";
import { turnoverEventSchema } from "@/schemas/turnoverEvent";
import { EventFormElements } from "./_components/EventFormElements";

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

  const onSubmit = (
    e: React.FormEvent<HTMLFormElement>,
    eventType: keyof typeof EventType,
  ) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: Record<string, string> = {};

    // Convert FormData to plain object
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

    switch (eventType) {
      case "score":
        const scoreData = scoreEventSchema.safeParse(data);

        if (scoreData.success) {
          const newScoreEvent: GameEvent = {
            type: "score",
            teamId: scoreData.data.team,
            timestamp: new Date().toISOString(),
            playerId: scoreData.data.player,
            data: {
              assistBy: scoreData.data.assistBy,
              points: getScoreByTeam(scoreData.data.team, events) + 1,
            },
          };

          setEvents((events) => [...events, newScoreEvent]);
        } else {
          console.log(scoreData.error);
        }

        break;

      case "pull":
        const pullData = pullEventSchema.safeParse(data);

        if (pullData.success) {
          const newPullEvent: GameEvent = {
            type: "pull",
            teamId: pullData.data.team,
            timestamp: new Date().toISOString(),
            playerId: pullData.data.player,
            data: {
              outcome: pullData.data.outcome,
            },
          };
          setEvents((events) => [...events, newPullEvent]);
        } else {
          console.log(pullData.error);
        }

        break;

      case "turnover":
        const turnoverData = turnoverEventSchema.safeParse(data);

        if (turnoverData.success) {
          const newTurnoverEvent: GameEvent = {
            type: "turnover",
            teamId: turnoverData.data.team,
            timestamp: new Date().toISOString(),
            playerId: turnoverData.data.player,
            data: {
              reason: turnoverData.data.reason,
            },
          };
          setEvents((events) => [...events, newTurnoverEvent]);
        } else {
          console.log(turnoverData.error);
        }

        break;

      default:
        break;
    }
  };

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
                      onSubmit(
                        formEvent,
                        event.title.toLowerCase() as keyof typeof EventType,
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
