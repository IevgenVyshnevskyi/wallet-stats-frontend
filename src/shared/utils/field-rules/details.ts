import { titleRegex, twoSymbolsRegex } from "../regexes";

export const detailsFieldRules = (clearErrors: any) => {
  return {
    validate: {
      hasTwoSymbols: (value: string) => {
        if (!value) {
          clearErrors('title');
          return;
        };
        return twoSymbolsRegex.test(value) || 'Повинно бути не менше 2 символів';
      },
      hasTwoLetters: (value: string) => {
        if (!value) {
          clearErrors('title');
          return;
        };
        return titleRegex.test(value) || 'Повинно бути не менше 2 літер';
      },
    }
  }
}
