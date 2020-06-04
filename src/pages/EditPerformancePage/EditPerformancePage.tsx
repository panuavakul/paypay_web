import React, { useEffect } from "react";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
  makeStyles,
  TextField,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import UserSelector from "../../components/UserSelector";
import { useDispatch, useSelector } from "react-redux";
import { getUsersAction } from "../../redux/slices/userSlice";

interface ComponentProps {
  isNew: boolean;
}

const NewPerformancePage: React.SFC<ComponentProps> = props => {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsersAction());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      <Typography color="textPrimary" variant={"h4"} gutterBottom>
        Add New Performance
      </Typography>
      <Box width={1}>
        <Card className={classes.card}>
          <CardContent>
            <Grid container direction={"column"} spacing={2}>
              <Grid item>
                <UserSelector
                  id={"employee-selector"}
                  label={"Employee"}
                  values={""}
                  // onChange={userId => {}}
                />
              </Grid>
              <Grid item>
                <UserSelector
                  id={"reviewers-selector"}
                  label={"Reviewers"}
                  values={[]}
                  multiple
                  // onChange={userId => {}}
                />
              </Grid>
              <Grid item>
                <TextField
                  label={"Achievements"}
                  placeholder={"Some cool stuffs this person did"}
                  fullWidth
                  multiline
                  required
                />
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            <Grid container justify={"flex-end"}>
              <Grid item>
                <Button color={"primary"} variant="contained">
                  Add
                </Button>
              </Grid>
            </Grid>
          </CardActions>
        </Card>
      </Box>
    </React.Fragment>
  );
};

const useStyles = makeStyles(() => ({
  card: {
    padding: 16,
  },
  actions: {
    backgroundColor: "black",
  },
}));

export default NewPerformancePage;
