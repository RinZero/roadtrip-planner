import { responsiveFontSizes } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

export default () => {
  const theme = createMuiTheme({
    // hier überschreiben was wir überschreiben wollen - Sachen die wir global brauchen :)
    // buttons, border radius, etc.
    typography: {
      h1: {
        fontSize: "40px",
        color: "#707070",
        width: "100%",
      },
      h5: { fontWeight: "bold" },
    },
  });
  return responsiveFontSizes(theme);
};
