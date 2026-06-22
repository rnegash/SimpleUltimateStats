import { FormEvent } from "react";

export const formDataToPlainObject = (
  formEvent: FormEvent<HTMLFormElement>,
) => {
  const formData = new FormData(formEvent.currentTarget);

  const data: Record<string, string> = {};

  formData.forEach((value, key) => {
    data[key] = value.toString();
  });

  return data;
};
