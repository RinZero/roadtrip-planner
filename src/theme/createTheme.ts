import { responsiveFontSizes } from '@material-ui/core/styles'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'

declare module '@material-ui/core/Button/Button' {
  interface ButtonPropsVariantOverrides {
    smallButton: true
  }
}

export default () => {
  const theme = createMuiTheme({
    // hier überschreiben was wir überschreiben wollen - Sachen die wir global brauchen :)
    // buttons, border radius, etc.
    typography: {
      h1: {
        fontSize: '40px',
        color: '#707070',
        width: '100%',
      },
      h5: { fontWeight: 'bold' },
      button: {
        color: '#b1b1b1',
        textTransform: 'none',
      },
      h6: {
        color: '#707070',
        fontSize: '20px',
      },
    },
    overrides: {
      MuiButton: {
        root: {
          borderRadius: '15px',
          backgroundColor: '#71B255',
          boxShadow: '0px 3px 6px 1px rgba(0, 0, 0, 0.16)',
          padding: '10px 15px',
        },
      },
      MuiAppBar: {
        colorPrimary: {
          backgroundColor: '#FFFFFF',
        },
      },
      MuiToolbar: {
        root: {
          justifyContent: 'flex-end',
          gap: '24px',
        },
      },
    },
  })
  return responsiveFontSizes(theme)
}
