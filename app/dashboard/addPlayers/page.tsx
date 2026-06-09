import { copy } from "../../_assets/strings";
import { addPlayer } from "@/actions/userActions";
import {
  Form,
  TextField,
  Label,
  Input,
  Button,
  FieldError,
} from "@heroui/react";

const AddPlayersPage = ({}) => {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/70">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-950">Add Player</h2>
        </div>
      </div>

      <Form action={addPlayer} className="space-y-6">
        <TextField name="name" type="text">
          <Label>{copy.dashboardPage.addPlayersPage.form.nameLabel}</Label>
          <Input
            placeholder={copy.dashboardPage.addPlayersPage.form.namePlaceholder}
          />
          <FieldError />
        </TextField>

        <Button type="submit">
          {copy.dashboardPage.addPlayersPage.form.submit}
        </Button>
      </Form>
    </section>
  );
};

export default AddPlayersPage;
