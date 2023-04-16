import { ICategory } from "../src/store/types";

export const mockCategories: ICategory[] = [
  {
    id: 1,
    title: "Подарунки та благодійність (подарунки родичам та друзям, пожертвування)",
    type_of_outlay: "income",
    owner: 1
  },
  {
    id: 2,
    title: "Розваги (кінотеатри, концерти, музеї, ігри)",
    type_of_outlay: "expense",
    owner: 1
  },
  {
    id: 3,
    title: "Техніка та електроніка (комп\'ютери, смартфони, планшети)",
    type_of_outlay: "expense",
    owner: 1
  },
  {
    id: 4,
    title: "Їжа та напої (ресторани, кав\'ярні, супермаркети)",
    type_of_outlay: "income",
    owner: 1
  },
  {
    id: 5,
    title: "Охорона здоров\'я та краса (лікарські засоби, косметика, зубні послуги)",
    type_of_outlay: "expense",
    owner: 1
  }
];
