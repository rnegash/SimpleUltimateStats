"use client";
import { useState } from "react";
import {
  FieldError,
  Form,
  Input,
  Label,
  Popover,
  Button,
  TextField,
} from "@heroui/react";

import { copy } from "@/assets/strings";

import { sampleEvents } from "../../mocks/events";
import { getScoreByTeam } from "./utils";

import type { GameEvent } from "./types";
import { EventType } from "./types";
import { EventTable } from "./_components/EventTable";
import { scoreEventSchema } from "@/schemas/scoreEvent";
import { pullEventSchema } from "@/schemas/pullEvent";
import { turnoverEventSchema } from "@/schemas/turnoverEvent";

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

const renderForm = (eventType: keyof typeof EventType) => {
  const { events } = copy.game;
  switch (eventType) {
    case "pull":
      const { pull } = events;
      return (
        <>
          <TextField name="team" type="text">
            <Label>{pull.eventData.team.label}</Label>
            <Input placeholder={pull.eventData.team.label} />
            <FieldError />
          </TextField>
          <TextField name="player" type="text">
            <Label>{pull.eventData.player.label}</Label>
            <Input placeholder={pull.eventData.player.label} />
            <FieldError />
          </TextField>
          <TextField name="outcome" type="text">
            <Label>{pull.eventData.outcome.label}</Label>
            <Input placeholder={pull.eventData.outcome.label} />
            <FieldError />
          </TextField>
        </>
      );
    case "score":
      const { score } = events;
      return (
        <>
          <TextField name="team" type="text">
            <Label>{score.eventData.team.label}</Label>
            <Input placeholder={score.eventData.team.label} />
            <FieldError />
          </TextField>
          <TextField name="player" type="text">
            <Label>{score.eventData.player.label}</Label>
            <Input placeholder={score.eventData.player.label} />
            <FieldError />
          </TextField>
          <TextField name="assistBy" type="text">
            <Label>{score.eventData.assistBy.label}</Label>
            <Input placeholder={score.eventData.assistBy.label} />
            <FieldError />
          </TextField>
        </>
      );

    case "turnover":
      const { turnover } = events;
      return (
        <>
          <TextField name="team" type="text">
            <Label>{turnover.eventData.team.label}</Label>
            <Input placeholder={turnover.eventData.team.label} />
            <FieldError />
          </TextField>
          <TextField name="player" type="text">
            <Label>{turnover.eventData.player.label}</Label>
            <Input placeholder={turnover.eventData.player.label} />
            <FieldError />
          </TextField>
          <TextField name="reason" type="text">
            <Label>{turnover.eventData.reason.label}</Label>
            <Input placeholder={turnover.eventData.reason.label} />
            <FieldError />
          </TextField>
        </>
      );

    default:
      break;
  }
};

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

    alert(`Form submitted with: ${JSON.stringify(data, null, 2)}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center">
      <div className="w-full text-center">
        {copy.game.lightTeam} {getScoreByTeam("lightTeam", events)}
        {copy.game.darkTeam} {getScoreByTeam("darkTeam", events)}
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
                    onSubmit={(e) =>
                      onSubmit(
                        e,
                        event.title.toLowerCase() as keyof typeof EventType,
                      )
                    }
                  >
                    {renderForm(
                      event.title.toLowerCase() as keyof typeof EventType,
                    )}

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
