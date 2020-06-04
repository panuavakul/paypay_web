import React from "react";
import { Card, CardContent, Typography, Grid, Box } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import { makeStyles } from "@material-ui/core/styles";
import { AppState } from "../../redux/store";
import { useSelector } from "react-redux";
import Rating from "@material-ui/lab/Rating";
import User from "../../models/User";

interface ComponentProps {
  feedbackId: string;
}

interface State {
  name: string;
  points: number;
  comment: string;
  hasData: boolean;
}

const selector = (feedbackId: string) => (state: AppState): State => {
  const feedback = state.feedback.byId[feedbackId];
  const user: User | undefined = state.user.byId[feedback.userId];

  return {
    name: user ? `${user.firstName} ${user.lastName}` : "",
    comment: feedback.comment,
    points: feedback.points,
    hasData: true,
  };
};

const FeedbackCard: React.SFC<ComponentProps> = props => {
  const classes = useStyles();
  const state = useSelector(selector(props.feedbackId));
  return (
    <Box width={1}>
      <Card className={classes.root}>
        <CardContent>
          <Grid container direction={"column"}>
            <Grid item>
              <Grid container>
                <Grid item>
                  <Typography
                    className={classes.title}
                    color="textPrimary"
                    gutterBottom
                  >
                    {state.name}
                  </Typography>
                </Grid>
                <Grid item xs />
                <Grid item>
                  <Rating value={state.points} readOnly />
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Typography color="textPrimary" variant={"body1"}>
                {state.comment}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

const useStyles = makeStyles({
  root: {},
  title: {
    fontWeight: "bold",
    fontSize: 18,
  },
  dateLabel: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "right",
  },
  averageLabel: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default FeedbackCard;
