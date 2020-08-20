import React, {useState, createContext} from "react";

export const RestaurantsContext = createContext();

export const RestaurantsContextProvider = props => {
    const [restaurants, setRestaurants] = useState([]);
   
                            //Pass newly created restaurants
    const addRestaurants = (restaurant) => {
        //take current restaurants array and copy it over to new array
        setRestaurants([...restaurants, restaurant])
    }

    return(
        <RestaurantsContext.Provider value={{restaurants, setRestaurants, addRestaurants}}>
            {props.children}
        </RestaurantsContext.Provider>
    )
};
