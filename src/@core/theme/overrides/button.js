// ** Theme Config Imports

import themeConfig from 'src/configs/themeConfig';

const Button = theme => {
 return {
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          borderRadius: 5,
          lineHeight: 1.71,
          letterSpacing: '0.3px',
          padding: `${theme.spacing(1.875, 3)}`
        },
        contained: {
          boxShadow: theme.shadows[3],
          padding: `${theme.spacing(1.875, 5.5)}`,
          backgroundColor: '#FF6347', // Naranja
          '&:hover': {
            backgroundColor: '#E5533D', // Naranja oscuro
          },
          border: '2px solid #FF6347', // Naranja
          boxShadow: '0 0 10px #FF6347, 0 0 5px #FF6347', // Naranja
        },
        outlined: {
          padding: `${theme.spacing(1.625, 5.25)}`,
          borderColor: '#FF6347', // Naranja
          '&:hover': {
            borderColor: '#E5533D', // Naranja oscuro
          },
        },
        sizeSmall: {
          padding: `${theme.spacing(1, 2.25)}`,
          '&.MuiButton-contained': {
            padding: `${theme.spacing(1, 3.5)}`
          },
          '&.MuiButton-outlined': {
            padding: `${theme.spacing(0.75, 3.25)}`
          }
        },
        sizeLarge: {
          padding: `${theme.spacing(2.125, 5.5)}`,
          '&.MuiButton-contained': {
            padding: `${theme.spacing(2.125, 6.5)}`
          },
          '&.MuiButton-outlined': {
            padding: `${theme.spacing(1.875, 6.25)}`
          }
        }
      }
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: themeConfig.disableRipple
      }
    }
 }
}

export default Button;