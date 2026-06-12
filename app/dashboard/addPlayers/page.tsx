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

const AddPlayersPage = ({}) => {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-950">Add Player</h2>
        </div>
      </div>

      <Form onSubmit={handleFormSubmit} className="space-y-6">
        <TextField name="name" type="text">
          <Label>{copy.dashboardPage.addPlayersPage.form.nameLabel}</Label>
          <Input
            placeholder={copy.dashboardPage.addPlayersPage.form.namePlaceholder}
          />
          <FieldError />
        </TextField>

        <RadioGroup name="position">
          <Label>Position</Label>
          {playerPositions.map((position) => (
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
