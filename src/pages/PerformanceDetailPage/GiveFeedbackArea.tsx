import React from "react";
import {
  Grid,
  Typography,
  Box,
  Card,
  CardContent,
  TextField,
  CardActions,
  Button,
  makeStyles,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import FeedbackCard from "../../components/FeedbackCard";
import Rating from "@material-ui/lab/Rating";
import { AppState } from "../../redux/store";
import {
  setFeedbackPointsAction,
  GiveFeedbackState,
  setFeedbackCommentAction,
} from "../../redux/slices/giveFeedbackSlice";

interface ComponentProps {
  performanceId: string;
}

interface State {
  point: number;
  comment: string;
}

const selector = (state: AppState): GiveFeedbackState => {
  return { ...state.giveFeedback };
};

const GiveFeedbackArea: React.SFC<ComponentProps> = props => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const state = useSelector(selector);
  const { performanceId } = props;
  return (
    <React.Fragment>
      <Box paddingTop={2}>
        <Typography color="textPrimary" variant={"h4"} gutterBottom>
          Give Feedback
        </Typography>
        <Card className={classes.card}>
          <CardContent>
            <Grid container direction={"column"}>
              <Grid item>
                <Rating
                  size={"large"}
                  value={state.point}
                  onChange={(_, newValue) => {
                    if (newValue) {
                      dispatch(setFeedbackPointsAction(newValue));
                    }
                  }}
                />
              </Grid>
              <Grid item>
                <TextField
                  label={"Comments"}
                  placeholder={"Hey great job! Keep it going!"}
                  value={state.comment}
                  error={false}
                  helperText={state.commentErrorMsg}
                  onChange={event => {
                    const value = event.target.value;
                    dispatch(setFeedbackCommentAction(value));
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
                  onClick={async () => {}}
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

export default GiveFeedbackArea;
