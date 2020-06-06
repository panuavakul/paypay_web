import React, { useEffect } from "react";
import { Grid } from "@material-ui/core";
import PerformanceCard from "../../components/PerformanceCard";
import { AppState } from "../../redux/store";
import { getPerformancesAction } from "../../redux/slices/ppperformanceSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AddFab from "../../components/AddFab";
import PageSelector from "../../components/PageSelector";
import AdminPageType from "../../enums/AdminPageType";
import { withAdmin } from "../../components/hocs/withAdmin";

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
      <PageSelector mode={AdminPageType.Performances} />
      <Grid container direction={"column"} spacing={2}>
        {performanceIds.map((id, index) => (
          <Grid item key={index}>
            <Link to={`/performances/${id}`} style={{ textDecoration: "none" }}>
              <PerformanceCard performanceId={id} />
            </Link>
          </Grid>
        ))}
      </Grid>
      <AddFab to={"/performances/new"} />
    </React.Fragment>
  );
};

export default withAdmin(PerformancePage);
