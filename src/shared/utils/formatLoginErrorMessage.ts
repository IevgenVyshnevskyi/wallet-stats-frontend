export const formatLoginErrorMessage = (errorResponse: any): string => {
  let errorMessage = '';

  for (const key in errorResponse) {
    errorMessage += `${errorResponse[key]}\n`;
  }

  return errorMessage.trim();
}
