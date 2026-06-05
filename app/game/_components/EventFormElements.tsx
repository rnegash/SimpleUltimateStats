import { copy } from "@/app/assets/strings";
import {
  RadioGroup,
  Label,
  Radio,
  TextField,
  Input,
  FieldError,
} from "@heroui/react";
import { outcomes, type Event } from "../types";
import { teams } from "../page";

export const EventFormElements = ({ eventType }: { eventType: Event }) => {
  const { events } = copy.gamePage;
  const { TEAM_DARK, TEAM_LIGHT } = teams;

  switch (eventType) {
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

          <RadioGroup name="outcome">
            <Label>Outcome</Label>
            {outcomes.map((outcome) => (
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
