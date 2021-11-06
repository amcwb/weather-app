import React, { Context, Reducer, useContext, useEffect, useReducer } from "react";

interface ILocation {
    place: string,
    favourite: boolean
}

// Grab from local storage
const initialState = JSON.parse(localStorage.getItem("data") as string)?.locations || []

type Action = 
    | { type: "ADD_LOCATION", location: ILocation }
    | { type: "REMOVE_LOCATION", place: string }
    | { type: "TOGGLE_FAVOURITE", place: string }

// Reduce dispatched events
const locationReducer: Reducer<ILocation[], Action> = (state: ILocation[], action: Action) => {
    switch (action.type) {
        case "ADD_LOCATION":
            return state.concat(action.location)
        
        case "REMOVE_LOCATION":
            return state.filter(v => v.place !== action.place)
        
        case "TOGGLE_FAVOURITE":
            return state.filter(v => (v.place === action.place && (v.favourite = !v.favourite)) || true)
    }
}


interface LocationContext {
    locations: ILocation[];
    dispatch: React.Dispatch<Action>;
}
/**
 * Location context
 */
const LocationContext: Context<LocationContext> = React.createContext({} as LocationContext);


/**
 * Provider for location context
 */
export const LocationProvider: React.FC = ({ children }) => {
    const [locations, dispatch] = useReducer(locationReducer, initialState);

    useEffect(() => {
        localStorage.setItem("data", JSON.stringify({ locations }));
    }, [locations])

    return (
        <LocationContext.Provider value={{locations, dispatch}}>
            {children}
        </LocationContext.Provider>
    )
}

// Helper functions
export function useAddLocation() {
    const context = useContext(LocationContext);

    return (location: ILocation) => {
        context.dispatch({
            type: "ADD_LOCATION",
            location
        })
    }
}

export function useRemoveLocation() {
    const context = useContext(LocationContext);

    return (place: string) => {
        context.dispatch({
            type: "REMOVE_LOCATION",
            place
        });
    }
}

export function useToggleFavouriteLocation() {
    const context = useContext(LocationContext);

    return (place: string) => {
        context.dispatch({
            type: "TOGGLE_FAVOURITE",
            place
        });
    }
}


export function useFavouriteLocations() {
    const context = useContext(LocationContext);

    return context.locations.filter(v => v.favourite);
}

export function useNonFavouriteLocations() {
    const context = useContext(LocationContext);

    return context.locations.filter(v => !v.favourite);
}

// Set default export to context
export default LocationContext;