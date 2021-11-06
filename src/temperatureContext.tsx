import React, { Context, useContext, useEffect, useReducer } from "react";

const initialState = JSON.parse(localStorage.getItem("temperaturePreference") as string) || { prefersCelsius: true }
const temperatureReducer = (_: any, prefersCelsius: boolean) => { return prefersCelsius  }


interface TemperatureContext {
    prefersCelsius: boolean;
    dispatch: React.Dispatch<boolean>;
}
/**
 * Whether the user wants to use celsius
 */
const TemperatureContext: Context<TemperatureContext> = React.createContext({} as TemperatureContext);


/**
 * Provider for temperature context
 */
export const TemperatureProvider: React.FC = ({ children }) => {
    const [prefersCelsius, dispatch] = useReducer(temperatureReducer, initialState);

    useEffect(() => {
        localStorage.setItem("temperaturePreference", JSON.stringify({ prefersCelsius }));
    }, [prefersCelsius])

    return (
        <TemperatureContext.Provider value={{prefersCelsius, dispatch}}>
            {children}
        </TemperatureContext.Provider>
    )
}

export function useTemperaturePreference() {
    const context = useContext(TemperatureContext);

    return (value_c: number | undefined, value_f: number | undefined) => {
        if (context.prefersCelsius) {
            return `${value_c}°C`;
        } else {
            return `${value_f}°F`;
        }
    }
}

// Set default export to context
export default TemperatureContext;