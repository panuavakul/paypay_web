export const validateAchievement = (value: string): string | undefined => {
  if (!value) {
    return "Please enter some achiement of this employee";
  }
  return undefined;
};
