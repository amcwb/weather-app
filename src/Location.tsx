import { Avatar, Card, CardContent, Icon, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useParams } from "react-router";
import { useWeatherData } from "./getWeather";
import { useTemperaturePreference } from "./temperatureContext";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

interface ILocationProps {
    setTitle: (title: string) => any;
}

export default function Location({ setTitle }: ILocationProps) {
    const { location } = useParams();
    setTitle(location as string);

    const data = useWeatherData(location as string);
    const temperature = useTemperaturePreference();

    console.log(data?.current)
    return (
        <>
            <Card>
                <CardContent>
                    <Box sx={{display: 'flex'}}>
                        <Box sx={{flex: '1 0 auto'}}>
                            <Typography fontSize="2rem">
                                {temperature(data?.current.temp_c, data?.current.temp_f)}
                            </Typography>
                            <Typography fontSize="smaller">
                                Feels like {temperature(data?.current.feelslike_c, data?.current.feelslike_f)}
                            </Typography>
                            <Typography>
                                <Icon className="fa-wind"></Icon> {data?.current?.gust_kph}kph
                            </Typography>
                            <Typography>
                                <Icon className="fa-tint"></Icon> {data?.current?.humidity} humidity
                            </Typography>
                        </Box>
                        <Box sx={{display: 'flex', flexDirection: 'column', textAlign: "right"}}>
                            <img src={data?.current?.condition?.icon} alt="" />
                        </Box>
                    </Box>
                    <Box sx={{paddingTop: "1rem"}}>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Day</TableCell>
                                        <TableCell>Description</TableCell>
                                        <TableCell align="right">Highs</TableCell>
                                        <TableCell align="right">Lows</TableCell>
                                        <TableCell align="right">Max gust</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                {
                                    data?.forecast?.forecastday.slice(0, 10).map(v => (
                                        <TableRow>
                                            <TableCell>
                                                {(new Date(v.date_epoch*1000)).toLocaleDateString()}
                                            </TableCell>
                                            <TableCell>
                                                {v.day.condition.text}
                                            </TableCell>
                                            <TableCell align="right">
                                                {temperature(v.day.maxtemp_c, v.day.maxtemp_f)}
                                            </TableCell>
                                            <TableCell align="right">
                                                {temperature(v.day.mintemp_c, v.day.mintemp_f)}
                                            </TableCell>
                                            <TableCell align="right">
                                                {v.day.maxwind_kph}kph
                                            </TableCell>
                                        </TableRow>
                                    ))
                                }
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </CardContent>
            </Card>
        </>
    )

}