export const formatRegisterErrorMessage = (errorResponse: any): string => {
  let errorMessage = '';

  for (const key in errorResponse) {
    const errorList: string[] = errorResponse[key];

    errorList.forEach(msg => {
      errorMessage += `${key}: ${msg}\n`;
    });
  }

  return errorMessage.trim();
}
