"use client";
import { addUser } from "@/actions/userActions";

export const NewUserButton = () => (
  <button
    onClick={async () => await addUser("test")}
    className="w-full rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
  >
    Create account
  </button>
);
