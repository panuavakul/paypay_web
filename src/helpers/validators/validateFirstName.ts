export const validateFirstName = (value: string): string | undefined => {
  if (!value) {
    return "Please enter first name";
  }
  return undefined;
};
