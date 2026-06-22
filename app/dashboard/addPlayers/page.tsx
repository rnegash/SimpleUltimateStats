"use client";
import { copy } from "../../_assets/strings";
import { playerPositions } from "@/app/game/types";
import {
  Form,
  TextField,
  Label,
  Input,
  Button,
  FieldError,
  RadioGroup,
  Radio,
} from "@heroui/react";
import { handleFormSubmit } from "./_utils/handleFormSubmit";
import { useState } from "react";

const AddPlayersPage = ({}) => {
  const [submitError, setSubmitError] = useState(false);

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70 flex flex-col gap-6">
      <h2 className="text-xl font-semibold text-slate-950">
        {copy.dashboardPage.addPlayersPage.title}
      </h2>

      <Form
        onSubmit={async (formData) => {
          try {
            setSubmitError(false);
            await handleFormSubmit(formData);
          } catch (error) {
            setSubmitError(true);
          }
        }}
        className="space-y-6"
      >
        <TextField
          name="name"
          type="text"
          isInvalid={submitError}
          onInput={() => setSubmitError(false)}
        >
          <Label>{copy.dashboardPage.addPlayersPage.form.nameLabel}</Label>
          <Input
            placeholder={copy.dashboardPage.addPlayersPage.form.namePlaceholder}
          />
          <FieldError>
            {copy.dashboardPage.addPlayersPage.form.error}
          </FieldError>
        </TextField>

        <RadioGroup name="position">
          <Label>{copy.dashboardPage.addPlayersPage.form.positionLabel}</Label>
          {Object.values(playerPositions).map((position) => (
            <Radio key={position} value={position}>
              <Radio.Control>
                <Radio.Indicator />
              </Radio.Control>
              <Radio.Content>
                <Label>{position}</Label>
              </Radio.Content>
            </Radio>
          ))}
        </RadioGroup>

        <Button type="submit">
          {copy.dashboardPage.addPlayersPage.form.submit}
        </Button>
      </Form>
    </section>
  );
};

export default AddPlayersPage;
