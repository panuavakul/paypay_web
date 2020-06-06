import React, { useEffect } from "react";
import { useParams } from "react-router";
import { Typography } from "@material-ui/core";
import PerformanceCard from "../../components/PerformanceCard";
import { getPerformanceAction } from "../../redux/slices/ppperformanceSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../../redux/store";
import FeedbackListArea from "./FeedbackListArea";
import GiveFeedbackArea from "./GiveFeedbackArea";
import { withAdminOrUser } from "../../components/hocs/withAdminOrUser";

interface RouteParams {
  id: string;
}
interface ComponentProps {
  isFeedbackMode?: boolean;
}

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
      {!props.isFeedbackMode && (
        <FeedbackListArea feedbackIds={state.feedbackIds} />
      )}
      {props.isFeedbackMode && <GiveFeedbackArea performanceId={params.id} />}
    </React.Fragment>
  );
};

PerformanceDetailPage.defaultProps = {
  isFeedbackMode: true,
};

export default withAdminOrUser(PerformanceDetailPage);
