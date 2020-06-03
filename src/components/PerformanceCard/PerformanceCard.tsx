import React from "react";
import { Card, CardContent, Typography, Grid, Box } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
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
  hasData: boolean;
}

const selector = (performanceId: string) => (state: AppState): State => {
  const performance = state.ppperformance.byId[performanceId];
  const hasData = performance != null;
  const userId = performance?.userId;
  const user = state.user.byId[userId];

  const date = performance && new Date(performance.date);

  return {
    name: user ? `${user.firstName} ${user.lastName}` : "",
    achievement: performance?.achievement ?? "",
    date: date ? `${date.getFullYear()}/${date.getMonth()}` : "",
    hasData: hasData,
  };
};

const PerformanceCard: React.SFC<ComponentProps> = props => {
  const classes = useStyles();
  const state = useSelector(selector(props.performanceId));
  return (
    <Box width={1}>
      <Card className={classes.root}>
        <CardContent>
          <Grid item xs>
            <Grid container direction={"column"}>
              <Grid item>
                <Grid container>
                  <Grid item>
                    {state.hasData ? (
                      <Typography
                        className={classes.title}
                        color="textPrimary"
                        gutterBottom
                      >
                        {state.name}
                      </Typography>
                    ) : (
                      <Skeleton variant="text" height={40} width={160} />
                    )}
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
                {state.hasData ? (
                  <Typography
                    className={classes.achievement}
                    color="textPrimary"
                    variant={"body1"}
                  >
                    {state.achievement}
                  </Typography>
                ) : (
                  <Box width={1}>
                    <Skeleton variant="text" height={40} />
                  </Box>
                )}
              </Grid>
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
  achievement: {
    maxLines: 1,
  },
});

export default PerformanceCard;
