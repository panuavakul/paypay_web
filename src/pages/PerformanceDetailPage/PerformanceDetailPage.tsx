import React, { useEffect } from "react";
import { useParams } from "react-router";
import { Grid, Typography } from "@material-ui/core";
import PerformanceCard from "../../components/PerformanceCard";

interface RouteParams {
  id: string;
}
interface ComponentProps {}

const PerformanceDetailPage: React.SFC<ComponentProps> = props => {
  let params: RouteParams = useParams();
  return (
    <React.Fragment>
      <Grid container>
        <PerformanceCard performanceId={params.id} />
      </Grid>
    </React.Fragment>
  );
};

export default PerformanceDetailPage;
