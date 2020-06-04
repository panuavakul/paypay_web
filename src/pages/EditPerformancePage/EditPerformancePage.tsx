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
} from "../../redux/slices/editPerformancePageSlice";
import { AppState } from "../../redux/store";

interface ComponentProps {
  isNew: boolean;
}

const selector = (state: AppState): EditPerformancePageState => {
  const employeeId = state.editPerformancePage.employeeId;
  const reviewerIds = state.editPerformancePage.reviewerIds;
  const achievement = state.editPerformancePage.achievement;
  return {
    employeeId: employeeId,
    reviewerIds: reviewerIds,
    achievement: achievement,
  };
};

const NewPerformancePage: React.SFC<ComponentProps> = props => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const state = useSelector(selector);

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
                  onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                    const id = event.target.value as string;
                    dispatch(setEmployeeIdAction(id));
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
                <Button color={"primary"} variant="contained">
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
