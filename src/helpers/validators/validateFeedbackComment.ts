export const validateFeedbackComment = (value: string): string | undefined => {
  if (!value) {
    return "Please enter some comment for this person";
  }
  return undefined;
};
