import React from "react";
import { Card, CardContent, Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Rating from "@material-ui/lab/Rating";

interface PerformanceCard {}

const PerformanceCard: React.SFC<PerformanceCard> = () => {
  const classes = useStyles();
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
                    Panu Avakul
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Typography
                    className={classes.dateLabel}
                    color="textSecondary"
                    gutterBottom
                  >
                    2020/1
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Rating readOnly value={3} />
            </Grid>
            <Grid item>
              <Typography
                className={classes.achievement}
                color="textPrimary"
                variant={"body1"}
              >
                Finished project in a really fast time preriod Finished project
                in a really fast time preriodFinished project in a really fast
                time preriodFinished project in a really fast time preriod
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
