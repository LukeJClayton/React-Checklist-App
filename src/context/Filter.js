import React from "react";

export const FilterContext = React.createContext([{}, () => {}])
export default FilterContext;

export const FilterFunction = React.createContext([{}, () => {}])

// export const DarkModeProvider: FunctionComponent<DarkModeProviderProps> = ({ children }) => {