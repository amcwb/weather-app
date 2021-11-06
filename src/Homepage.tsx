import { Fab, Icon } from "@mui/material";
import { useNavigate } from "react-router";
import LocationCard from "./LocationCard";
import { useFavouriteLocations, useNonFavouriteLocations } from "./locationsContext";

interface HomepageProps {
    setTitle: (title: string) => any
}

export default function Homepage({setTitle}: HomepageProps) {
    setTitle("Homepage");
    const favouriteLocations = useFavouriteLocations();
    const nonFavouriteLocations = useNonFavouriteLocations();
    const navigate = useNavigate();
    return (
        <>
        {
            favouriteLocations.map(v => <LocationCard location={v.place} favourite={v.favourite}></LocationCard>)
        }
        {
            nonFavouriteLocations.map(v => <LocationCard location={v.place} favourite={v.favourite}></LocationCard>)
        }
        
            <Fab color="secondary" sx={{position: 'absolute', bottom: 16, right: 16}} onClick={() => {navigate("/new")}}>
                <Icon className="fa-plus"></Icon>
            </Fab>
        </>
    )
}