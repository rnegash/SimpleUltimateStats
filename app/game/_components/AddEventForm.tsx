import { Button, Form, Typography, Surface } from "@heroui/react";
import { Event, GameEvent } from "../types";
import { handleFormSubmit } from "../_utils/handleFormSubmit";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { EventButton } from "../ClientGame";
import { EventFormElements } from "./EventFormElements";
import { copy } from "@/app/_assets/strings";

export const AddEventForm = ({
  event,
  events,
  setEvents,
  players,
}: {
  event: EventButton;
  events: GameEvent[];
  setEvents: Dispatch<SetStateAction<GameEvent[]>>;
  players: { name: string }[];
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={event.color}
        fullWidth
        size="lg"
      >
        {event.title}
      </Button>
      <Surface
        className={`flex min-w-[320px] flex-col gap-3 rounded-3xl p-6 ${isOpen ? "visible" : "hidden"}`}
        variant="default"
      >
        <Typography className="font-bold">{event.addEvent}</Typography>
        <Form
          className="flex flex-col gap-4"
          onSubmit={(formEvent: FormEvent<HTMLFormElement>) => {
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
            players={players}
          />

          <div className="flex gap-2">
            <Button type="submit" onClick={() => setIsOpen(false)}>
              {copy.gamePage.events.actions.submit}
            </Button>
          </div>
        </Form>
      </Surface>
    </>
  );
};
