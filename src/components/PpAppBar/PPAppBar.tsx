import React from "react";
import AppBar from "@material-ui/core/AppBar";
import { Toolbar, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import HttpService from "../../services/HttpService";
import PPPerformanceService from "../../services/PPPerformanceService";

interface PPAppBar {}

const PPAppBar: React.SFC<PPAppBar> = props => {
  const classes = useStyles();
  return (
    <AppBar className={classes.root} position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.leading}>
          PayPay Challenge
        </Typography>
        <div className={classes.body} />
        <Button
          className={classes.signinButton}
          color="inherit"
          onClick={async () => {
            // Debug Remove this
            const temp = await PPPerformanceService.get();
            console.log(temp);
          }}
        >
          Sign In
        </Button>
      </Toolbar>
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
