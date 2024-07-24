const DefaultPalette = (mode, themeColor) => {
  // ** Vars
  const lightColor = '58, 53, 65' // Color claro original
  const darkColor = '231, 227, 252' // Color oscuro original
  const mainColor = mode === 'light' ? lightColor : darkColor

  const primaryGradient = () => {
    if (themeColor === 'primary') {
      return '#FF6F61' // Naranja claro para el color primario
    } else if (themeColor === 'secondary') {
      return '#FFA07A' // Naranja claro para el color secundario
    } else if (themeColor === 'success') {
      return '#28A745' // Verde para éxito
    } else if (themeColor === 'error') {
      return '#DC3545' // Rojo para error
    } else if (themeColor === 'warning') {
      return '#FFC107' // Amarillo para advertencia
    } else {
      return '#17A2B8' // Azul para información
    }
  }

  return {
    customColors: {
      main: mainColor,
      primaryGradient: primaryGradient(),
      tableHeaderBg: mode === 'light' ? '#F9FAFC' : '#1E1E2F'
    },
    common: {
      black: '#000',
      white: '#FFF'
    },
    mode: mode,
    primary: {
      light: '#FF6F61', // Naranja claro
      main: '#FF6347', // Naranja
      dark: '#E5533D', // Naranja oscuro
      contrastText: '#FFF'
    },
    secondary: {
      light: '#FFA07A', // Naranja claro
      main: '#FF7F50', // Naranja
      dark: '#E6735C', // Naranja oscuro
      contrastText: '#FFF'
    },
    success: {
      light: '#28A745', // Verde claro
      main: '#218838', // Verde
      dark: '#1E7E34', // Verde oscuro
      contrastText: '#FFF'
    },
    error: {
      light: '#DC3545', // Rojo claro
      main: '#C82333', // Rojo
      dark: '#BD2130', // Rojo oscuro
      contrastText: '#FFF'
    },
    warning: {
      light: '#FFC107', // Amarillo claro
      main: '#E0A800', // Amarillo
      dark: '#C69500', // Amarillo oscuro
      contrastText: '#FFF'
    },
    info: {
      light: '#17A2B8', // Azul claro
      main: '#138496', // Azul
      dark: '#117A8B', // Azul oscuro
      contrastText: '#FFF'
    },
    grey: {
      50: '#FAFAFA',
      100: '#F5F5F5',
      200: '#EEEEEE',
      300: '#E0E0E0',
      400: '#BDBDBD',
      500: '#9E9E9E',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
      A100: '#D5D5D5',
      A200: '#AAAAAA',
      A400: '#616161',
      A700: '#303030'
    },
    text: {
      primary: `rgba(${mainColor}, 0.87)`,
      secondary: `rgba(${mainColor}, 0.68)`,
      disabled: `rgba(${mainColor}, 0.38)`
    },
    divider: `rgba(${mainColor}, 0.12)`,
    background: {
      paper: mode === 'light' ? '#FFF' : '#2B2B40',
      default: mode === 'light' ? '#F4F5FA' : '#1C1C28'
    },
    action: {
      active: `rgba(${mainColor}, 0.54)`,
      hover: `rgba(${mainColor}, 0.04)`,
      selected: `rgba(${mainColor}, 0.08)`,
      disabled: `rgba(${mainColor}, 0.3)`,
      disabledBackground: `rgba(${mainColor}, 0.18)`,
      focus: `rgba(${mainColor}, 0.12)`
    }
  }
}

export default DefaultPalette