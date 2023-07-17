import { UseFormClearErrors, FieldValues } from "react-hook-form";

import { titleRegex, twoSymbolsRegex } from "../regexes";

const setDetailsFieldRules = (
  clearErrors: UseFormClearErrors<FieldValues>
) => ({
  validate: {
    hasTwoSymbols: (value: string) => {
      if (!value) {
        clearErrors("title");
        return undefined;
      }
      return twoSymbolsRegex.test(value) || "Повинно бути не менше 2 символів";
    },
    hasTwoLetters: (value: string) => {
      if (!value) {
        clearErrors("title");
        return undefined;
      }
      return titleRegex.test(value) || "Повинно бути не менше 2 літер";
    },
  },
});

export default setDetailsFieldRules;
