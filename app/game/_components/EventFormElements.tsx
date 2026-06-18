"use client";

import { copy } from "@/app/_assets/strings";
import {
  ComboBox,
  ListBox,
  ListBoxItem,
  RadioGroup,
  Label,
  Radio,
  Input,
} from "@heroui/react";
import {
  eventTypes,
  pullOutcomes,
  turnoverReasons,
  type Event,
} from "../types";
import { teams } from "../constants";

type PlayerOption = {
  name: string;
};

type PlayerPickerProps = {
  players: PlayerOption[];
  label: string;
  placeholder: string;
  name: string;
};

const PlayerPicker = ({
  players,
  label,
  placeholder,
  name,
}: PlayerPickerProps) => (
  <ComboBox.Root
    items={players}
    name={name}
    allowsCustomValue
    formValue="text"
    className="w-full"
  >
    <Label className="font-bold">{label}</Label>
    <ComboBox.InputGroup>
      <Input placeholder={placeholder} />
      <ComboBox.Trigger />
    </ComboBox.InputGroup>

    <ComboBox.Popover>
      <ListBox className="max-h-60 overflow-auto p-2">
        {players.map((player) => (
          <ListBoxItem key={player.name} textValue={player.name}>
            {player.name}
          </ListBoxItem>
        ))}
      </ListBox>
    </ComboBox.Popover>
  </ComboBox.Root>
);

export const EventFormElements = ({
  eventType,
  players,
}: {
  eventType: Event;
  players: PlayerOption[];
}) => {
  const { events } = copy.gamePage;
  const { TEAM_DARK, TEAM_LIGHT } = teams;

  switch (eventType) {
    case eventTypes.score:
      const { score } = events;

      return (
        <>
          <RadioGroup name="team" orientation="horizontal">
            <Label className="font-bold">{score.eventData.team.label}</Label>
            <Radio value={TEAM_DARK}>
              <Radio.Control>
                <Radio.Indicator />
              </Radio.Control>
              <Radio.Content>
                <Label>{TEAM_DARK}</Label>
              </Radio.Content>
            </Radio>

            <Radio value={TEAM_LIGHT}>
              <Radio.Control>
                <Radio.Indicator />
              </Radio.Control>
              <Radio.Content>
                <Label>{TEAM_LIGHT}</Label>
              </Radio.Content>
            </Radio>
          </RadioGroup>
          <PlayerPicker
            players={players}
            label={score.eventData.player.label}
            name="player"
            placeholder={score.eventData.player.label}
          />
          <PlayerPicker
            players={players}
            name="assistBy"
            label={score.eventData.assistBy.label}
            placeholder={score.eventData.assistBy.label}
          />
        </>
      );

    case eventTypes.turnover:
      const { turnover } = events;

      return (
        <>
          <RadioGroup name="team" orientation="horizontal">
            <Label className="font-bold">{turnover.eventData.team.label}</Label>
            <Radio value={TEAM_DARK}>
              <Radio.Control>
                <Radio.Indicator />
              </Radio.Control>
              <Radio.Content>
                <Label>{TEAM_DARK}</Label>
              </Radio.Content>
            </Radio>

            <Radio value={TEAM_LIGHT}>
              <Radio.Control>
                <Radio.Indicator />
              </Radio.Control>
              <Radio.Content>
                <Label>{TEAM_LIGHT}</Label>
              </Radio.Content>
            </Radio>
          </RadioGroup>
          <PlayerPicker
            name="player"
            players={players}
            label={turnover.eventData.player.label}
            placeholder={turnover.eventData.player.label}
          />
          <RadioGroup name="reason" orientation="horizontal">
            <Label className="font-bold">
              {turnover.eventData.reason.label}
            </Label>
            {Object.values(turnoverReasons).map((reason) => (
              <Radio key={reason} value={reason}>
                <Radio.Control>
                  <Radio.Indicator />
                </Radio.Control>
                <Radio.Content>
                  <Label>{reason}</Label>
                </Radio.Content>
              </Radio>
            ))}
          </RadioGroup>
        </>
      );

    case eventTypes.pull:
      const { pull } = events;

      return (
        <>
          <RadioGroup name="team">
            <Label className="font-bold">{pull.eventData.team.label}</Label>
            <Radio value={TEAM_DARK}>
              <Radio.Control>
                <Radio.Indicator />
              </Radio.Control>
              <Radio.Content>
                <Label>{TEAM_DARK}</Label>
              </Radio.Content>
            </Radio>

            <Radio value={TEAM_LIGHT}>
              <Radio.Control>
                <Radio.Indicator />
              </Radio.Control>
              <Radio.Content>
                <Label>{TEAM_LIGHT}</Label>
              </Radio.Content>
            </Radio>
          </RadioGroup>
          <PlayerPicker
            name="player"
            players={players}
            label={pull.eventData.player.label}
            placeholder={pull.eventData.player.label}
          />

          <RadioGroup name="outcome" orientation="horizontal">
            <Label className="font-bold">{pull.eventData.outcome.label}</Label>
            {Object.values(pullOutcomes).map((outcome) => (
              <Radio key={outcome} value={outcome}>
                <Radio.Control>
                  <Radio.Indicator />
                </Radio.Control>
                <Radio.Content>
                  <Label>{outcome}</Label>
                </Radio.Content>
              </Radio>
            ))}
          </RadioGroup>
        </>
      );

    default:
      break;
  }
};
