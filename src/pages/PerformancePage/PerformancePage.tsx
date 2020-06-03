import React, { useEffect } from "react";
import { Grid, Typography } from "@material-ui/core";
import PerformanceCard from "../../components/PerformanceCard";
import { AppState } from "../../redux/store";
import { getPerformancesAction } from "../../redux/slices/ppperformanceSlice";
import { useDispatch, useSelector } from "react-redux";

interface ComponentProps {}

const idsSelector = (state: AppState) => state.ppperformance.allIds;

const PerformancePage: React.SFC<ComponentProps> = props => {
  const performanceIds = useSelector(idsSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPerformancesAction());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <React.Fragment>
      <Typography color="textPrimary" variant={"h4"} gutterBottom>
        Performances
      </Typography>
      <Grid container direction={"column"} spacing={2}>
        {performanceIds.map((id, index) => (
          <Grid item key={index}>
            <PerformanceCard performanceId={id} />
          </Grid>
        ))}
      </Grid>
    </React.Fragment>
  );
};

export default PerformancePage;
