import React, { useEffect } from "react";
import { useParams } from "react-router";
import { Grid, Typography } from "@material-ui/core";
import PerformanceCard from "../../components/PerformanceCard";
import { getPerformanceAction } from "../../redux/slices/ppperformanceSlice";
import { useDispatch } from "react-redux";

interface RouteParams {
  id: string;
}
interface ComponentProps {}

const PerformanceDetailPage: React.SFC<ComponentProps> = props => {
  let params: RouteParams = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPerformanceAction(params.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      <Typography color="textPrimary" variant={"h4"} gutterBottom>
        Performance
      </Typography>
      <Grid container>
        <PerformanceCard performanceId={params.id} />
      </Grid>
    </React.Fragment>
  );
};

export default PerformanceDetailPage;
