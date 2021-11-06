import LocationCard from "./LocationCard";
import { useFavouriteLocations, useNonFavouriteLocations } from "./locationsContext";

interface HomepageProps {
    setTitle: (title: string) => any
}

export default function Homepage({setTitle}: HomepageProps) {
    setTitle("Homepage");
    const favouriteLocations = useFavouriteLocations();
    const nonFavouriteLocations = useNonFavouriteLocations();
    return (
        <>
        {
            favouriteLocations.map(v => <LocationCard location={v.place} favourite={v.favourite}></LocationCard>)
        }
        {
            nonFavouriteLocations.map(v => <LocationCard location={v.place} favourite={v.favourite}></LocationCard>)
        }
        </>
    )
}