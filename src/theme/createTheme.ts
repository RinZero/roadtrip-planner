import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

export default () => {
  const theme = createMuiTheme({
    // hier überschreiben was wir überschreiben wollen - Sachen die wir global brauchen :)
    // buttons, border radius, etc.
    typography: {
      button: {
        fontSize: "1rem",
      },
    },
  });
};
