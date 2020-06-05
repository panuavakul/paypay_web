import React from "react";
import { InputLabel, Select, MenuItem, FormControl } from "@material-ui/core";

// Don't need to loop every time in return.
// Can probably user useMemo to memorize it just another wasted logic
const monthValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const monthLabels = [
  "January",
  "Febuary",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

interface ComponentProps {
  label: string;
  value: number;
  onChange?: (event: React.ChangeEvent<{ value: unknown }>) => void;
}

const MonthPicker: React.SFC<ComponentProps> = props => {
  return (
    <FormControl fullWidth>
      <InputLabel required>{props.label}</InputLabel>
      <Select value={props.value} onChange={props.onChange}>
        {monthValues.map((value, index) => (
          <MenuItem key={index} value={value}>
            {monthLabels[index]}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MonthPicker;
