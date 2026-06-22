import { describe, expect, test } from "vitest";
import type { FormEvent } from "react";
import { formDataToPlainObject } from "./formDataToPlainObject";

function makeFormEvent(
  fields: Record<string, string>,
): FormEvent<HTMLFormElement> {
  const form = document.createElement("form");
  for (const [name, value] of Object.entries(fields)) {
    const input = document.createElement("input");
    input.name = name;
    input.value = value;
    form.appendChild(input);
  }
  return { currentTarget: form } as unknown as FormEvent<HTMLFormElement>;
}

describe("formDataToPlainObject", () => {
  test("returns empty object for a form with no inputs", () => {
    expect(formDataToPlainObject(makeFormEvent({}))).toEqual({});
  });

  test("converts a single field", () => {
    expect(formDataToPlainObject(makeFormEvent({ name: "Alice" }))).toEqual({
      name: "Alice",
    });
  });

  test("converts multiple fields", () => {
    expect(
      formDataToPlainObject(
        makeFormEvent({ name: "Alice", position: "handler" }),
      ),
    ).toEqual({ name: "Alice", position: "handler" });
  });
});
