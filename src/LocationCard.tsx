import { Card, CardActionArea, CardActions, CardContent, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router";
import { useWeatherData } from "./getWeather";
import { useRemoveLocation, useToggleFavouriteLocation } from "./locationsContext";
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
    const deleteLocation = useRemoveLocation();

    return (
        <>
            <Card>
                <CardActionArea onClick={() => {navigate("/location/" + encodeURIComponent(location))}}>
                    <CardContent sx={{ display: 'flex' }}>
                        <Box sx={{flex: '1 0 auto'}}>
                            <Typography fontSize="2rem">
                                {data?.location?.name}
                            </Typography>
                            <Typography color="text.secondary">
                                {data?.location?.country}
                            </Typography>
                        </Box>
                        <Box sx={{textAlign: "right"}}>
                            <Typography fontSize="2rem">
                                {temperature(data?.current?.temp_c, data?.current?.temp_f)}
                            </Typography>
                            <Typography color="text.secondary">
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
                    <IconButton
                        className="fas fa-trash"
                        sx={{color: "red", cursor: "pointer"}}
                        onClick={(e) => {
                            deleteLocation(location);
                        }}
                    />
                </CardActions>
            </Card>
        </>
    )
}