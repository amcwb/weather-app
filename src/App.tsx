
import { AppBar, CssBaseline, Toolbar, Typography } from '@mui/material';
import { deepOrange, orange } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box } from "@mui/system";
import { useState } from 'react';
import {
    BrowserRouter as Router, Route, Routes
} from "react-router-dom";
import Homepage from './Homepage';
import { LocationProvider } from './locationsContext';
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
          }
      }
  }
});


function App() {
    const [title, setTitle] = useState("Weather");

    return (
        <LocationProvider>
            <TemperatureProvider>
                <ThemeProvider theme={theme}>
                    <Box>
                        <AppBar position="static">
                            <Toolbar>
                                <Typography>
                                    {title}
                                </Typography>
                            </Toolbar>
                        </AppBar>
                    </Box>
                    <CssBaseline />
                    <Router>
                        <Routes>
                            <Route
                                path="/"
                                element={<Homepage setTitle={setTitle}></Homepage>}
                            />
                            <Route
                                path="/:location:"
                                element={<></>}
                            />
                        </Routes>
                    </Router>
                </ThemeProvider>
            </TemperatureProvider>
        </LocationProvider>
    );
}

export default App;
