import React from "react";
import { Grid, Typography, Box } from "@material-ui/core";
import FeedbackCard from "../../components/FeedbackCard";

interface ComponentProps {
  feedbackIds: string[];
}

const FeedbackListArea: React.SFC<ComponentProps> = props => {
  const { feedbackIds } = props;
  return (
    <React.Fragment>
      <Box paddingTop={2}>
        <Typography color="textPrimary" variant={"h4"} gutterBottom>
          Feedbacks
        </Typography>
      </Box>
      <Grid container direction={"column"} spacing={2}>
        {feedbackIds.length > 0 ? (
          feedbackIds.map((id, index) => (
            <Grid item key={index}>
              <FeedbackCard feedbackId={id} />
            </Grid>
          ))
        ) : (
          <Box width={1} textAlign={"center"}>
            <Typography color="textPrimary" variant={"body1"}>
              No feedback yet...
            </Typography>
          </Box>
        )}
      </Grid>
    </React.Fragment>
  );
};

export default FeedbackListArea;
