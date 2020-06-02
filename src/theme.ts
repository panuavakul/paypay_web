import red from "@material-ui/core/colors/red";
import { createMuiTheme } from "@material-ui/core/styles";
import createPalette from "@material-ui/core/styles/createPalette";

// Create a theme instance.
const theme = createMuiTheme({
  palette: createPalette({
    type: "light",
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#e0e0e0",
    },
  }),
});

export default theme;
