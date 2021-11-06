import { Card, CardActionArea, CardActions, CardContent, Icon, IconButton, Typography } from "@mui/material";
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
            <Card>
                <CardActionArea onClick={() => {navigate("/location/" + encodeURIComponent(location))}}>
                    <CardContent sx={{ display: 'flex' }}>
                        <Typography fontSize="2rem" sx={{flex: '1 0 auto'}}>
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
                </CardActionArea>
                <CardActions>
                    <IconButton
                        className="fas fa-star"
                        sx={{color: favourite ? "gold" : "black", cursor: "pointer"}}
                        onClick={(e) => {
                            toggleFavourite(location);
                        }}
                    />
                </CardActions>
            </Card>
        </>
    )
}