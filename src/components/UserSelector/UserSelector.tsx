import React from "react";
import {
  Grid,
  Box,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  FormHelperText,
  FormControl,
} from "@material-ui/core";
import { AppState } from "../../redux/store";
import { useSelector } from "react-redux";
import User from "../../models/User";

interface ComponentProps {
  id: string;
  label: string;
  values: string[] | string;
  multiple?: boolean;
  reviewers?: boolean;
  errorMsg?: string;
  onChange?: (event: React.ChangeEvent<{ value: unknown }>) => void;
}

interface State {
  userIds: string[];
  byId: {
    [key: string]: User;
  };
}

const usersSelector = (isReviewerMode: boolean) => (state: AppState): State => {
  const allIds = state.user.allIds;
  const byId = { ...state.user.byId };

  const selectedEmployeeId = state.editPerformancePage.employeeId;

  let result: string[] = [...allIds];
  if (isReviewerMode) {
    result = result.filter(id => id !== selectedEmployeeId);
  }
  return { userIds: result, byId: byId };
};

const UserSelector: React.SFC<ComponentProps> = props => {
  const state = useSelector(usersSelector(props.reviewers ?? false));
  const allIds = state.userIds;
  const byId = state.byId;
  const hasError: boolean = props.errorMsg != null && props.errorMsg.length > 0;
  return (
    <Grid container direction={"column"} spacing={2}>
      <Grid item>
        <FormControl fullWidth required error={hasError}>
          <InputLabel id={`${props.id}-label`}>{props.label}</InputLabel>
          <Select
            labelId={`${props.id}-label`}
            value={props.values}
            multiple={props.multiple}
            onChange={props.onChange}
            renderValue={
              props.multiple
                ? selected => {
                    return (
                      <Box>
                        {(selected as string[]).map((selectedId, index) => {
                          const user = byId[selectedId];
                          return (
                            <Chip
                              key={index}
                              label={`${user.firstName} ${user.lastName}`}
                            />
                          );
                        })}
                      </Box>
                    );
                  }
                : undefined
            }
          >
            {allIds.map((id, index) => {
              const user = byId[id];
              return (
                <MenuItem
                  key={index}
                  value={id}
                >{`${user.firstName} ${user.lastName}`}</MenuItem>
              );
            })}
          </Select>
          {hasError && <FormHelperText>{props.errorMsg}</FormHelperText>}
        </FormControl>
      </Grid>
    </Grid>
  );
};

UserSelector.defaultProps = {
  multiple: false,
  reviewers: false,
};

export default UserSelector;
