
import { AppBar, CssBaseline, Icon, Toolbar, Typography } from '@mui/material';
import { deepOrange, orange } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box } from "@mui/system";
import { createBrowserHistory } from "history";
import { useState } from 'react';
import {
    BrowserRouter as Router, Route, Routes
} from "react-router-dom";
import Homepage from './Homepage';
import Location from './Location';
import { LocationProvider } from './locationsContext';
import New from './New';
import { TemperatureProvider } from './temperatureContext';

const theme = createTheme({
    palette: {
        primary: {
            main: orange[100]
        },
        secondary: {
            main: deepOrange[200]
        },
    },
    components: {
        MuiIcon: {
            defaultProps: {
                baseClassName: "fas"
            },
            styleOverrides: {
                root: {
                    // Match 24px = 3 * 2 + 1.125 * 16
                    boxSizing: 'content-box',
                    padding: 3,
                    fontSize: '90%',
                    verticalAlign: "middle"
                  },
            }
        }
    }
});


function App() {
    const [title, setTitle] = useState("Weather");
    const history = createBrowserHistory({window});
    
    return (
        <LocationProvider>
            <TemperatureProvider>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Box>
                        <AppBar position="static">
                            <Toolbar>
                                {
                                    history.location.pathname !== "/" ?
                                    <Icon className="fa-arrow-left" sx={{marginRight: "1rem", cursor: "pointer"}} onClick={() => history.back()}></Icon>
                                    : <></>
                                }
                                <Typography>
                                    {title}
                                </Typography>
                            </Toolbar>
                        </AppBar>
                    </Box>
                    <Router>
                        <Routes>
                            <Route
                                path="/location/:location"
                                element={<Location setTitle={setTitle}/>}
                            />
                            <Route
                                path="/new"
                                element={<New setTitle={setTitle}></New>}
                            />
                            <Route
                                path="/"
                                element={<Homepage setTitle={setTitle}></Homepage>}
                            />
                        </Routes>
                    </Router>
                </ThemeProvider>
            </TemperatureProvider>
        </LocationProvider>
    );
}

export default App;
