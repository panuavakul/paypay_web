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
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { getUsersAction } from "../../redux/slices/userSlice";
import { AppState } from "../../redux/store";
import { useHistory } from "react-router-dom";
import {
  EditUserPageState,
  setFirstNameAction,
  setLastNameAction,
  postUserAction,
  resetEditUserPage,
} from "../../redux/slices/editUserPageSlice";

interface ComponentProps {
  isNew: boolean;
}

const selector = (state: AppState): EditUserPageState => {
  return { ...state.editUserPage };
};

const EditUserPage: React.SFC<ComponentProps> = props => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const state = useSelector(selector);
  const history = useHistory();

  useEffect(() => {
    dispatch(getUsersAction());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      <Typography color="textPrimary" variant={"h4"} gutterBottom>
        Add a New Employee
      </Typography>
      <Box width={1}>
        <Card className={classes.card}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs>
                <TextField
                  label={"First"}
                  placeholder={"John"}
                  value={state.firstName}
                  error={state.firstNameErrorMsg.length > 0}
                  helperText={state.firstNameErrorMsg}
                  onChange={event => {
                    const value = event.target.value;
                    dispatch(setFirstNameAction(value));
                  }}
                  fullWidth
                  multiline
                  required
                />
              </Grid>
              <Grid item xs>
                <TextField
                  label={"Last"}
                  placeholder={"Smith"}
                  value={state.lastName}
                  error={state.firstNameErrorMsg.length > 0}
                  helperText={state.firstNameErrorMsg}
                  onChange={event => {
                    const value = event.target.value;
                    dispatch(setLastNameAction(value));
                  }}
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
                <Button
                  color={"primary"}
                  variant="contained"
                  onClick={async () => {
                    const result: any = await dispatch(postUserAction());
                    const type: string = result.type;
                    const success: boolean = result.payload;

                    dispatch(resetEditUserPage());

                    // length is always > 1
                    const thunkType = type.split("/")[1];
                    if (thunkType === "fulfilled" && success) {
                      history.push("/users");
                    }
                  }}
                >
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
}));

export default EditUserPage;
