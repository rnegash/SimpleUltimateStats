import { Popover, Button, Form } from "@heroui/react";
import { Event, GameEvent } from "../types";
import { handleFormSubmit } from "../_utils/handleFormSubmit";
import { Dispatch, FormEvent, SetStateAction } from "react";
import { EventButton } from "../ClientGame";
import { EventFormElements } from "./EventFormElements";

export const AddEventPopover = ({
  event,
  events,
  setEvents,
  players,
}: {
  event: EventButton;
  events: GameEvent[];
  setEvents: Dispatch<SetStateAction<GameEvent[]>>;
  players: { name: string }[];
}) => (
  <Popover>
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
            <Button type="submit">Submit</Button>
          </div>
        </Form>
      </Popover.Dialog>
    </Popover.Content>
  </Popover>
);
