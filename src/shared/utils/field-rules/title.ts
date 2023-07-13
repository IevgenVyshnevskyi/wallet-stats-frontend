import { titleRegex, twoSymbolsRegex } from "../regexes";

const titleFieldRules = {
  required: "Обов'язкове поле для заповнення",
  validate: {
    hasTwoSymbols: (value: string) =>
      twoSymbolsRegex.test(value) || "Повинно бути не менше 2 символів",
    hasTwoLetters: (value: string) =>
      titleRegex.test(value) || "Повинно бути не менше 2 літер",
  },
};

export default titleFieldRules;
