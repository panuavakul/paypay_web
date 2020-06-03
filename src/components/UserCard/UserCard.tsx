import React, { useEffect } from "react";
import { Card, CardContent, Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { AppState } from "../../redux/store";
import { connect } from "react-redux";
import User from "../../models/User";
import { ArrowForwardIos } from "@material-ui/icons";

interface OwnProps {
  userId: string;
}

interface StateProps {
  userId: string;
  name: string;
}

const UserCard = (props: StateProps) => {
  const classes = useStyles();
  return (
    <Card>
      <CardContent>
        <Grid container direction={"column"}>
          <Grid item>
            <Typography className={classes.nameLabel} color="textPrimary">
              {props.name}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

const useStyles = makeStyles({
  nameLabel: {
    fontWeight: "bold",
    fontSize: 18,
  },
});

interface Props {
  userId: string;
}

const mapStateToProps = (state: AppState, props: Props) => {
  const user = state.user.byId[props.userId];
  const name = `${user.firstName} ${user.lastName}`;
  return { name: name };
};

export default connect(mapStateToProps)(UserCard);
