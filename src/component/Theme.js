import { createTheme } from "@mui/material";

export const theme = createTheme({
    palette: {
        primary: {
            light: '#ffb74d',
            main: '#e94e1b',
            dark: '#f57c00',
        },
        secondary: {
            main: '#673ab7',
        },
    },
    components: {
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    color: 'black', // Label rengi
                },
            },
        },
        MuiSelect: {
            styleOverrides: {
                select: {
                    backgroundColor: 'white',
                    color: 'black',
                    '&:focus': {
                        backgroundColor: 'white',
                        color: 'black', // Select odaklandığında arka plan rengi
                    },
                    '&:hover': {
                        backgroundColor: 'white',
                        color: 'black', // Select üzerine gelindiğinde arka plan rengi
                    },
                    '& ul': {
                        backgroundColor: 'white', // Seçeneklerin arka plan rengi
                        color: 'black', // Seçeneklerin yazı rengi
                    },
                    '.MuiMenu-paper': {
                        backgroundColor: 'white', // Seçeneklerin arka plan rengi
                        color: 'black', //
                    },
                },
                icon: {
                    color: 'yellow',
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    borderColor: 'red',
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    backgroundColor: 'black',
                    color: '#e94e1b',
                    '&:hover': {
                        backgroundColor: 'white',
                        color: 'black',
                    },
                    '&:disabled': {
                        backgroundColor: 'red',
                        color: 'black',
                    },
                },
                contained: {
                    fontWeight: 'bold',
                    textAlign: 'center',
                    width: '100%',
                    height: '10vw',
                    marginTop: '2%',
                    marginBottom: '2%',
                    flex: '1',
                },
            },
        },
    },


    typography: {
        h6: {
            color: 'white',
        },
        h5: {
            color: 'white',
            marginBottom: '10px',
        },
        h4: {
            color: 'white',
            marginBottom: '10px',
        },
        h3: {
            color: 'white',
            marginBottom: '10px',
        },
        body1: {
            fontSize: '20px',
            color: '#e94e1b',
            marginBottom: '10px',
        },
        body2: {
            fontSize: '16px',
            color: 'white',
            marginBottom: '10px',
        },
    },

});