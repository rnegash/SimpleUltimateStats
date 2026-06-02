import { copy } from "@/assets/strings";
import {
  RadioGroup,
  Label,
  Radio,
  TextField,
  Input,
  FieldError,
} from "@heroui/react";
import { EventType } from "../types";
import { TEAM_DARK, TEAM_LIGHT } from "../page";

export const EventFormElements = ({
  eventType,
}: {
  eventType: keyof typeof EventType;
}) => {
  const { events } = copy.game;
  switch (eventType) {
    case "pull":
      const { pull } = events;
      return (
        <>
          <RadioGroup name="team">
            <Label>Team</Label>
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
          <RadioGroup name="team">
            <Label>Team</Label>
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
          <RadioGroup name="team">
            <Label>Team</Label>
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
