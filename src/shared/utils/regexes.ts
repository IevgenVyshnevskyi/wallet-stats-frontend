export const moneyAmountRegex = /^-?\d{1,8}(?:\.\d{1,2})?$/;

export const lettersRegex = /^[A-Za-zА-Яа-яІіЇїЄєҐґ]{2,}$/;

export const passwordRegex =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!\"#$%&'()*+,-.\/:;<=>?@[\\\]^_`{|}~])[A-Za-z\d!\"#$%&'()*+,-.\/:;<=>?@[\\\]^_`{|}~]{8,}$/;

export const emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/