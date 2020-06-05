import React from "react";
import Fab from "@material-ui/core/Fab";
import { Theme, makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import { Link } from "react-router-dom";

interface ComponentProps {
  to: string;
}

const AddFab: React.SFC<ComponentProps> = props => {
  const classes = useStyles();
  return (
    <Link to={props.to}>
      <Fab
        size="large"
        color="secondary"
        aria-label="add"
        className={classes.root}
      >
        <AddIcon />
      </Fab>
    </Link>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: "fixed",
    bottom: theme.spacing(4),
    right: theme.spacing(4),
  },
}));

export default AddFab;
