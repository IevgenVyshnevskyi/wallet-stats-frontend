import { ICategory } from "../src/store/types";

export const mockCategories: ICategory[] = [
  {
    id: 0,
    title: "Подарунки та благодійність (подарунки родичам та друзям, пожертвування)",
    type_of_outlay: "income",
    owner: 1
  },
  {
    id: 1,
    title: "Розваги (кінотеатри, концерти, музеї, ігри)",
    type_of_outlay: "expense",
    owner: 1
  },
  {
    id: 2,
    title: "Техніка та електроніка (комп\'ютери, смартфони, планшети)",
    type_of_outlay: "expense",
    owner: 1
  },
];
