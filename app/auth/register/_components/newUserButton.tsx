"use client";
import { Button } from "@heroui/react";
import { addUser } from "@/actions/userActions";
import { copy } from "@/app/_assets/strings";

export const NewUserButton = () => (
  <Button
    onClick={async () => await addUser("test")}
    className="w-full rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
  >
    {copy.authPage.registerPage.submit}
  </Button>
);
