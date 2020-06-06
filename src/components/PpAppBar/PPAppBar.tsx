import React from "react";
import AppBar from "@material-ui/core/AppBar";
import { Toolbar, Typography, Button, LinearProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { AppState } from "../../redux/store";
import { useHistory } from "react-router-dom";

const PPAppBar: React.SFC = props => {
  const classes = useStyles();
  const isLoading = useSelector((store: AppState) => store.common.isLoading);
  const history = useHistory();

  return (
    <AppBar className={classes.root} position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.leading}>
          PayPay Challenge
        </Typography>
        <Button
          className={classes.signinButton}
          color="inherit"
          onClick={() => {
            history.push("/");
          }}
        >
          Sign Out
        </Button>
      </Toolbar>
      {isLoading && <LinearProgress />}
    </AppBar>
  );
};

const useStyles = makeStyles(theme => ({
  root: {
    marginBottom: 32,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  leading: {
    flexGrow: 1,
    MozUserSelect: "none",
    WebkitUserSelect: "none",
    msUserSelect: "none",
    userSelect: "none",
    cursor: "pointer",
  },
  signinButton: {
    whiteSpace: "nowrap",
  },
  body: {
    flexGrow: 1,
  },
}));

export default PPAppBar;
