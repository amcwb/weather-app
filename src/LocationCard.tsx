import { Card, CardContent, Icon, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import getWeatherForecast, { IWeatherForecastReturnData, useWeatherData } from "./getWeather";
import { useToggleFavouriteLocation } from "./locationsContext";
import { useTemperaturePreference } from "./temperatureContext";

interface ILocationCardProps {
    location: string;
    favourite: boolean;
}

export default function LocationCard({ location, favourite }: ILocationCardProps) {
    const data = useWeatherData(location);
    const temperature = useTemperaturePreference();
    const toggleFavourite = useToggleFavouriteLocation();
    const navigate = useNavigate();


    return (
        <>
            <Card sx={{cursor: "pointer"}} onClick={() => {navigate("/location/" + encodeURIComponent(location))}}>
                <CardContent sx={{ display: 'flex' }}>
                    <Typography fontSize="larger" sx={{flex: '1 0 auto'}}>
                        <Icon
                            className="fa-star"
                            sx={{color: favourite ? "gold" : "black", cursor: "pointer"}}
                            fontSize="small"
                            onClick={(e) => {
                                // Stop it from progressing to card click
                                e.preventDefault();
                                toggleFavourite(location);
                            }}
                        />
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