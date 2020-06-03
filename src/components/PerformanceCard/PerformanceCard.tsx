import React from "react";
import { Card, CardContent, Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { AppState } from "../../redux/store";
import { useSelector } from "react-redux";

interface ComponentProps {
  performanceId: string;
}

interface State {
  name: string;
  achievement: string;
  date: string;
}

const selector = (performanceId: string) => (state: AppState): State => {
  const performance = state.ppperformance.byId[performanceId];
  const userId = performance.userId;
  const user = state.user.byId[userId];

  const date = new Date(performance.date);

  return {
    name: `${user.firstName} ${user.lastName}`,
    achievement: performance.achievement,
    date: `${date.getFullYear()}/${date.getMonth()}`,
  };
};

const PerformanceCard: React.SFC<ComponentProps> = props => {
  const classes = useStyles();
  const state = useSelector(selector(props.performanceId));
  return (
    <Card className={classes.root}>
      <CardContent>
        <Grid item>
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
                <Grid item xs>
                  <Typography
                    className={classes.dateLabel}
                    color="textSecondary"
                    gutterBottom
                  >
                    {state.date}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Typography
                className={classes.achievement}
                color="textPrimary"
                variant={"body1"}
              >
                {state.achievement}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
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
  achievement: {
    maxLines: 1,
  },
});

export default PerformanceCard;
