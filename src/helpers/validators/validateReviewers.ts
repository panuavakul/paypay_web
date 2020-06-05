export const validateReviewers = (values: string[]): string | undefined => {
  if (values.length < 1) {
    return "Please select at least one reviewer";
  }
  return undefined;
};
