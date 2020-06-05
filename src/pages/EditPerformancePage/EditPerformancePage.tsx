import React, { useEffect } from "react";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
  makeStyles,
  TextField,
} from "@material-ui/core";
import UserSelector from "../../components/UserSelector";
import { useDispatch, useSelector } from "react-redux";
import { getUsersAction } from "../../redux/slices/userSlice";
import {
  EditPerformancePageState,
  setEmployeeIdAction,
  setAchievementAction,
  setReviewerIdsAction,
  setMonthAction,
  postPerformance,
  resetPerformancePage,
} from "../../redux/slices/editPerformancePageSlice";
import { AppState } from "../../redux/store";
import MonthPicker from "../../components/MonthPicker/MonthPicker";
import { useHistory } from "react-router-dom";

interface ComponentProps {
  isNew: boolean;
}

const selector = (state: AppState): EditPerformancePageState => {
  return { ...state.editPerformancePage };
};

const NewPerformancePage: React.SFC<ComponentProps> = props => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const state = useSelector(selector);
  const history = useHistory();

  useEffect(() => {
    dispatch(getUsersAction());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      <Typography color="textPrimary" variant={"h4"} gutterBottom>
        Add New Performance
      </Typography>
      <Box width={1}>
        <Card className={classes.card}>
          <CardContent>
            <Grid container direction={"column"} spacing={2}>
              <Grid item>
                <UserSelector
                  id={"employee-selector"}
                  label={"Employee"}
                  values={state.employeeId}
                  errorMsg={state.employeeErrorMsg}
                  onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                    const id = event.target.value as string;
                    dispatch(setEmployeeIdAction(id));
                  }}
                />
              </Grid>
              <Grid item>
                <MonthPicker
                  label={"Performance Month"}
                  value={state.month}
                  onChange={event => {
                    const month = event.target.value as number;
                    dispatch(setMonthAction(month));
                  }}
                />
              </Grid>
              <Grid item>
                <UserSelector
                  id={"reviewers-selector"}
                  label={"Reviewers"}
                  values={state.reviewerIds}
                  multiple
                  reviewers
                  errorMsg={state.reviewersErrorMsg}
                  onChange={event => {
                    const values: string[] = event.target.value as string[];
                    dispatch(setReviewerIdsAction(values));
                  }}
                />
              </Grid>
              <Grid item>
                <TextField
                  label={"Achievements"}
                  placeholder={"Some cool stuffs this person did"}
                  value={state.achievement}
                  error={state.achievementErrorMsg.length > 0}
                  helperText={state.achievementErrorMsg}
                  onChange={event => {
                    const value = event.target.value;
                    dispatch(setAchievementAction(value));
                  }}
                  fullWidth
                  multiline
                  required
                />
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Grid container justify={"flex-end"}>
              <Grid item>
                <Button
                  color={"primary"}
                  variant="contained"
                  onClick={async () => {
                    const result: any = await dispatch(postPerformance());
                    const type: string = result.type;

                    dispatch(resetPerformancePage());

                    // length is always > 1
                    const thunkType = type.split("/")[1];
                    if (thunkType === "fulfilled") {
                      history.push("/performances");
                    }
                  }}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </CardActions>
        </Card>
      </Box>
    </React.Fragment>
  );
};

const useStyles = makeStyles(() => ({
  card: {
    padding: 16,
  },
}));

export default NewPerformancePage;
