import React, { useContext } from "react";

/**
 * Whether the user wants to use celsius
 */
const TemperatureContext = React.createContext(true);

/**
 * Provider for temperature context
 */
export const TemperatureProvider = TemperatureContext.Provider;

export function useTemperaturePreference() {
    const context = useContext(TemperatureContext);

    return (value_c: number | undefined, value_f: number | undefined) => {
        if (context) {
            return `${value_c}°C`;
        } else {
            return `${value_f}°F`;
        }
    }
}

// Set default export to context
export default TemperatureContext;