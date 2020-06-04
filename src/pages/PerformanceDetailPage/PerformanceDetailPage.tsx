import React, { useEffect } from "react";
import { useParams } from "react-router";
import { Grid, Typography } from "@material-ui/core";
import PerformanceCard from "../../components/PerformanceCard";
import { getPerformanceAction } from "../../redux/slices/ppperformanceSlice";
import { useDispatch, useSelector } from "react-redux";
import FeedbackCard from "../../components/FeedbackCard";
import { AppState } from "../../redux/store";

interface RouteParams {
  id: string;
}
interface ComponentProps {}

interface State {
  feedbackIds: string[];
}

const idsSelector = (performanceId: string) => (state: AppState): State => {
  const allIds = state.feedback.allIds;
  const byId = state.feedback.byId;

  const feedbackIds = allIds.filter(id => {
    const feedback = byId[id];
    const parentPerformanceId: string = `${feedback.performanceId}`;
    return parentPerformanceId === performanceId;
  });

  console.log(feedbackIds);

  return { feedbackIds: feedbackIds };
};

const PerformanceDetailPage: React.SFC<ComponentProps> = props => {
  let params: RouteParams = useParams();

  const dispatch = useDispatch();
  const state = useSelector(idsSelector(params.id));

  useEffect(() => {
    dispatch(getPerformanceAction(params.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      <Typography color="textPrimary" variant={"h4"} gutterBottom>
        Performance
      </Typography>
      <PerformanceCard performanceId={params.id} />

      <Typography color="textPrimary" variant={"h4"} gutterBottom>
        Feedbacks
      </Typography>
      <Grid container direction={"column"} spacing={2}>
        {state.feedbackIds.map((id, index) => (
          <Grid item key={index}>
            <FeedbackCard feedbackId={id} />
          </Grid>
        ))}
      </Grid>
    </React.Fragment>
  );
};

export default PerformanceDetailPage;
