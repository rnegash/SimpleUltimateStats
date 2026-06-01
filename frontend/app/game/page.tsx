"use client";
import { useState } from "react";
import {
  Description,
  FieldError,
  Form,
  Input,
  Label,
  Popover,
  Button,
  TextField,
} from "@heroui/react";

import { copy } from "@/assets/strings";

import { sampleEvents } from "../mocks/events";
import { getScoreByTeam } from "./utils";

import type { GameEvent } from "./types";
import { EventType } from "./types";
import { EventTable } from "./_components/EventTable";

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
          <TextField name="team" type="text">
            <Label>{pull.eventData.player.label}</Label>
            <Input placeholder={pull.eventData.player.label} />
            <FieldError />
          </TextField>
          <TextField name="team" type="text">
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
          <TextField name="team" type="text">
            <Label>{score.eventData.player.label}</Label>
            <Input placeholder={score.eventData.player.label} />
            <FieldError />
          </TextField>
          <TextField name="team" type="text">
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
          <TextField name="team" type="text">
            <Label>{turnover.eventData.player.label}</Label>
            <Input placeholder={turnover.eventData.player.label} />
            <FieldError />
          </TextField>
          <TextField name="team" type="text">
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

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: Record<string, string> = {};

    // Convert FormData to plain object
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });

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
                  <Form className="flex flex-col gap-4" onSubmit={onSubmit}>
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
