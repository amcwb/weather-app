import useLocation from "./locations";
import LocationCard from "./LocationCard";

interface HomepageProps {
    setTitle: (title: string) => any
}

export default function Homepage({setTitle}: HomepageProps) {
    setTitle("Homepage");
    const [addLocation, removeLocation, getFavouriteLocations, getNonFavouriteLocations] = useLocation();
    return (
        <>
        {
            getFavouriteLocations().map(v => <LocationCard location={v.place}></LocationCard>)
        }
        </>
    )
}