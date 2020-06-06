import * as Validator from "../../helpers/validators";

describe("validators", () => {
  it("should validateAchievement", () => {
    expect(Validator.validateAchievement("")).toEqual(
      "Please enter some achiement of this employee"
    );
    expect(Validator.validateAchievement("asdsadsa")).toBeUndefined();
  });

  it("should validateEmployeeId", () => {
    expect(Validator.validateEmployeeId("")).toEqual(
      "Please select an employee"
    );
    expect(Validator.validateEmployeeId("asdsadsa")).toBeUndefined();
  });

  it("should validateFeedbackComment", () => {
    expect(Validator.validateFeedbackComment("")).toEqual(
      "Please enter some comment for this person"
    );
    expect(Validator.validateFeedbackComment("asdsadsa")).toBeUndefined();
  });

  it("should validateFirstName", () => {
    expect(Validator.validateFirstName("")).toEqual("Please enter first name");
    expect(Validator.validateFirstName("John")).toBeUndefined();
  });

  it("should validateLastName", () => {
    expect(Validator.validateLastName("")).toEqual("Please enter last name");
    expect(Validator.validateLastName("Smith")).toBeUndefined();
  });

  it("should validateReviewers", () => {
    expect(Validator.validateReviewers([])).toEqual(
      "Please select at least one reviewer"
    );
    expect(Validator.validateReviewers(["0", "1"])).toBeUndefined();
  });
});
