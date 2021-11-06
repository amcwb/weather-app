import { Card, CardContent, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import getWeatherForecast, { IWeatherForecastReturnData } from "./getWeather";
import { useTemperaturePreference } from "./temperatureContext";

interface ILocationCardProps {
    location: string;
    favourite: boolean;
}

export default function LocationCard({ location, favourite }: ILocationCardProps) {
    const [data, setData] = useState<IWeatherForecastReturnData | null>(null);
    const temperature = useTemperaturePreference();

    useEffect(() => {
        const run = async () => {
            const data = await getWeatherForecast(location);

            setData(data);
        }
        run();
    }, []);

    return (
        <>
            <Card>
                <CardContent sx={{ display: 'flex' }}>
                    <Typography fontSize="larger" sx={{flex: '1 0 auto'}}>
                        {data?.location?.name}
                    </Typography>
                    <Box sx={{display: 'flex', flexDirection: 'column', textAlign: "right"}}>
                        <Typography fontSize="2rem">
                            {temperature(data?.current?.temp_c, data?.current?.temp_f)}
                        </Typography>
                        <Typography fontSize="smaller">
                            Feels like {temperature(data?.current?.feelslike_c, data?.current?.feelslike_f)}
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        </>
    )
}