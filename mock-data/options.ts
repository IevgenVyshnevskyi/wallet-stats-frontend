import { IOption } from "../types/atoms";
import { mockCategories } from "./categories";

export const mockOptions: IOption[] = [];

for (let i = 0; i < mockCategories.length; i++) {
  const title = mockCategories[i].title
  mockOptions.push({
    value: title,
    label: title
  });
}
