import { Card, CardContent, Icon, List, ListItem, ListItemButton, ListItemIcon, ListItemText, TextField, Typography } from "@mui/material"
import { useNavigate } from "react-router";
import { useWeatherAutocomplete } from "./getWeather";
import { useAddLocation } from "./locationsContext";

interface INewProps {
    setTitle: (title: string) => any;
}

export default function New({ setTitle }: INewProps) {
    const [autocomplete, search] = useWeatherAutocomplete();
    const addLocation = useAddLocation();
    const navigate = useNavigate();
    
    setTitle("Add location");
    return (
        <Card>
            <CardContent >
                <Typography>
                    Find a new location here:
                </Typography>
                <TextField
                    id="standard-basic"
                    label="Location"
                    variant="standard"
                    fullWidth
                    // Search from weather autocomplete service
                    onChange={(e) => search(e.target.value)}
                />

                <List>
                    {
                        // Provide list of autocomplete
                        autocomplete?.map(v => 
                            <ListItem onClick={() => {
                                // Add new location
                                addLocation({
                                    place: v.name,
                                    favourite: false
                                });
                                // Go back to home
                                navigate("/");
                            }}>
                                <ListItemButton>
                                    <ListItemIcon>
                                        <Icon className="fa-map-marker"></Icon>
                                    </ListItemIcon>
                                    <ListItemText primary={v.name} secondary={v.region} />
                                </ListItemButton>
                            </ListItem>
                        )
                    }
                </List>
            </CardContent>
        </Card>
    )
}