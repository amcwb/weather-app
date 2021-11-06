import { Accordion, AccordionDetails, AccordionSummary, Card, CardContent, Icon, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useParams } from "react-router";
import { useWeatherData } from "./getWeather";
import { useTemperaturePreference } from "./temperatureContext";

interface ILocationProps {
    setTitle: (title: string) => any;
}

export default function Location({ setTitle }: ILocationProps) {
    const { location } = useParams();
    // Split location for title
    const title = (location as string).split(",")[0];
    setTitle(title);

    const data = useWeatherData(location as string);
    const temperature = useTemperaturePreference();

    return (
        <>
            <Card>
                <CardContent>
                    <Box sx={{display: 'flex', marginBottom: "1rem"}}>
                        <Box sx={{flex: '1 0 auto'}}>
                            <Typography fontSize="2rem">
                                {temperature(data?.current.temp_c, data?.current.temp_f)}
                            </Typography>
                            <Typography fontSize="smaller">
                                Feels like {temperature(data?.current.feelslike_c, data?.current.feelslike_f)}
                            </Typography>
                            <Typography>
                                <Icon className="fa-wind"></Icon> {data?.current?.gust_kph}kph {data?.current?.wind_dir}
                            </Typography>
                            <Typography>
                                <Icon className="fa-tint"></Icon> {data?.current?.humidity} humidity
                            </Typography>
                        </Box>
                        <Box sx={{display: 'flex', flexDirection: 'column'}}>
                            <img src={data?.current?.condition?.icon} alt="" />
                        </Box>
                    </Box>
                    {
                        data?.forecast?.forecastday.slice(0, 10).map(v => (
                            <Accordion>
                                <AccordionSummary>
                                    <Typography sx={{width: "33%"}}>{(new Date(v.date_epoch*1000)).toLocaleDateString()}</Typography>
                                    <Typography sx={{color: "text.secondary"}}>{v.day.condition.text}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Box sx={{display: "flex"}}>
                                        <Box sx={{width: "33%"}}>
                                            <img src={v.day.condition.icon} alt="" />
                                        </Box>
                                        <Box>
                                            <Typography fontSize="larger">{temperature(v.day.avgtemp_c, v.day.avgtemp_f)}</Typography>
                                            <Typography fontSize="smaller">
                                                <Icon className="fa-temperature-low"></Icon>
                                                {temperature(v.day.mintemp_c, v.day.mintemp_f)}
                                                <Icon className="fa-temperature-high"></Icon>
                                                {temperature(v.day.maxtemp_c, v.day.maxtemp_f)}
                                            </Typography>
                                            <Typography fontSize="smaller">
                                                <Icon className="fa-tint"></Icon>
                                                {v.day.avghumidity} humid
                                            </Typography>
                                            <Typography fontSize="smaller">
                                                <Icon className="fa-cloud-rain"></Icon>
                                                {v.day.daily_chance_of_rain}%
                                                <Icon className="fa-snowflake"></Icon>
                                                {v.day.daily_chance_of_snow}%
                                            </Typography>
                                            <Typography fontSize="smaller">
                                                <Icon className="fa-sun"></Icon>
                                                {v.day.uv} UV
                                            </Typography>
                                        </Box>
                                    </Box>
                                </AccordionDetails>
                            </Accordion>
                        ))
                    }
                </CardContent>
            </Card>
        </>
    )

}