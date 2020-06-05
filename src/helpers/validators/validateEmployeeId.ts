export const validateEmployeeId = (value: string): string | undefined => {
  if (!value) {
    return "Please select an employee";
  }
  return undefined;
};
