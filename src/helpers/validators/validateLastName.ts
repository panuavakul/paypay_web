export const validateLastName = (value: string): string | undefined => {
  if (!value) {
    return "Please enter last name";
  }
  return undefined;
};
