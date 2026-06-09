import { copy } from "../../_assets/strings";
import { NewUserButton } from "./_components/newUserButton";
import { Form, TextField, Label, Input } from "@heroui/react";

export default function RegisterPage() {
  const { registerPage } = copy.authPage;

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl shadow-sm p-8">
        <h1 className="text-2xl font-semibold text-slate-900 mb-2">
          {registerPage.title}
        </h1>
        <p className="text-sm text-slate-500 mb-6">{registerPage.subtitle}</p>

        <Form className="space-y-6">
          <TextField name="name" type="text">
            <Label>{registerPage.nameLabel}</Label>
            <Input
              id="name"
              autoComplete="name"
              required
              className="rounded-xl border-slate-300 bg-white"
            />
          </TextField>

          <TextField name="email" type="email">
            <Label>{registerPage.emailLabel}</Label>
            <Input
              id="email"
              autoComplete="email"
              required
              className="rounded-xl border-slate-300 bg-white"
            />
          </TextField>

          <TextField name="password" type="password">
            <Label>{registerPage.passwordLabel}</Label>
            <Input
              id="password"
              autoComplete="new-password"
              required
              className="rounded-xl border-slate-300 bg-white"
            />
          </TextField>

          <NewUserButton />
        </Form>
      </div>
    </div>
  );
}
