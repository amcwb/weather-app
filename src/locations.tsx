import { useStickyState } from "./stickyState";

interface LocalStorageData {
    locations: ILocation[]
}

interface ILocation {
    uuid: string,
    place: string,
    favourite: boolean
}

const initialState = {
    locations: []
}

type AddLocation = (location: ILocation) => void;
type RemoveLocation = (uuid: string) => void;
type GetLocations = () => ILocation[];

export default function useLocation(): [AddLocation, RemoveLocation, GetLocations, GetLocations] {
    const [rawData, setRawData] = useStickyState<LocalStorageData>(initialState, "data");

    const addLocation = (location: ILocation) => {
        setRawData({
            locations: rawData.locations.concat(location)
        });
    }

    const removeLocation = (uuid: string) => {
        setRawData({
            locations: rawData.locations.filter(v => v.uuid !== uuid)
        });
    }

    const getFavouriteLocations = () => {
        return rawData.locations.filter(v => v.favourite);
    }

    const getNonFavouriteLocations = () => {
        return rawData.locations.filter(v => !v.favourite);
    }

    return [addLocation, removeLocation, getFavouriteLocations, getNonFavouriteLocations]
}