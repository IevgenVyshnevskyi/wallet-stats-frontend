import { FieldValues, UseFormWatch } from "react-hook-form";

import { passwordRegex } from "../regexes";

type ConfirmPasswordInputRules = {
  required: string;
  validate: (val: string) => string;
};

export const passwordInputRules = {
  required: 'Обов\'язкове поле для заповнення',
  pattern: {
    value: passwordRegex,
    message: `Пароль повинен містити не менше 8 символів, 1 літеру, 1 цифру та 1 спеціальний символ`
  },
};

export const confirmPasswordInputRules = (
  watchFunc: UseFormWatch<FieldValues>,
  passwordName: string
): ConfirmPasswordInputRules => {
  return {
    required: 'Обов\'язкове поле для заповнення',
    validate: (val: string) => {
      if (watchFunc(passwordName) !== val) {
        return "Паролі не співпадають";
      }
    },
  };
};
