import { responsiveFontSizes } from '@material-ui/core/styles'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import { NoEncryption } from '@material-ui/icons'
import { nodeModuleNameResolver } from 'typescript'

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
      fontFamily: `"Montserrat", sans-serif`,
      h1: {
        fontSize: '40px',
        color: '#707070',
        width: '100%',
      },
      h3: {
        fontSize: '30px',
        marginTop: '24px',
        marginBottom: '12px',
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
        textPrimary: {
          color: '#707070',
          backgroundColor: '#fff',
        },
        textSecondary: {
          color: '#fff',
          backgroundColor: '#e67676',
          '&:hover': {
            backgroundColor: '#da3535',
          },
          '&:active': {
            backgroundColor: '#da3535',
          },
        },
        root: {
          color: '#fff',
          borderRadius: '15px',
          backgroundColor: '#71B255',
          boxShadow: '0px 3px 6px 1px rgba(0, 0, 0, 0.16)',
          padding: '16px',
          '&:hover': {
            backgroundColor: '#355727',
          },
          '&:active': {
            backgroundColor: '#355727',
          },
        },
      },
      MuiListItemSecondaryAction: {
        root: {
          top: '24px',
          right: '8px',
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
      MuiInput: {
        underline: {
          '&::before': {
            content: 'none',
          },
          '&::after': {
            content: 'none',
          },
        },
      },
    },
  })
  return responsiveFontSizes(theme)
}
