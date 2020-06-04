import React, { forwardRef } from "react";
import {
  Grid,
  Box,
  makeStyles,
  InputLabel,
  Select,
  MenuItem,
  Chip,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { AppState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";

interface ComponentProps {
  id: string;
  label: string;
  values: string[] | string;
  multiple?: boolean;
  onChange?: (id: string) => void;
}

const usersSelector = (state: AppState) => state.user.allIds;

const UserSelector: React.SFC<ComponentProps> = props => {
  const classes = useStyles();
  const userIds = useSelector(usersSelector);
  return (
    <Grid container direction={"column"} spacing={2}>
      <Grid item>
        <InputLabel required id={`${props.id}-label`}>
          {props.label}
        </InputLabel>
        <Select
          labelId={`${props.id}-label`}
          value={props.values}
          fullWidth
          multiple={props.multiple}
          renderValue={
            props.multiple
              ? selected => {
                  return (
                    <Box>
                      {(selected as string[]).map(selectedId => (
                        <UserChip userId={selectedId} />
                      ))}
                    </Box>
                  );
                }
              : undefined
          }
        >
          {userIds.map((id, index) => (
            <UserMenuItem key={index} userId={id} />
          ))}
        </Select>
      </Grid>
    </Grid>
  );
};

UserSelector.defaultProps = {
  multiple: false,
};

interface UserMenuItemProps {
  userId: string;
}

const UserMenuItem: React.SFC<UserMenuItemProps> = forwardRef(props => {
  const user = useSelector((store: AppState) => store.user.byId[props.userId]);
  return (
    <MenuItem
      value={props.userId}
    >{`${user.firstName} ${user.lastName}`}</MenuItem>
  );
});

interface UserChipProps {
  userId: string;
}

const UserChip: React.SFC<UserChipProps> = props => {
  const user = useSelector((store: AppState) => store.user.byId[props.userId]);

  return <Chip label={`${user.firstName} ${user.lastName}`} />;
};

const useStyles = makeStyles(() => ({
  clip: {
    margin: 1,
  },
}));

export default UserSelector;
