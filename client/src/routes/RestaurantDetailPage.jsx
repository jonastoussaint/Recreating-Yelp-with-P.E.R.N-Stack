import React, {useContext, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { RestaurantsContext, RestaurantsContextProvider } from "../context/RestaurantsContext";
import RestaurantsFetcher from '../apis/RestaurantsFetcher';

const RestaurantDetailPage = () => {
    const {id} = useParams();
    const {selectedRestaurant, setSelectedRestaurant} = useContext(RestaurantsContext)
    
    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await RestaurantsFetcher.get(`/${id}`);
                ///console.log(response);
                setSelectedRestaurant(response.data.data.restaurant)
            } catch(err) {
                console.log(err);
            }          
        };
        fetchData();
    }, []);
    return (
        <div>
            {selectedRestaurant && selectedRestaurant.name}
        </div>
    )
}

export default RestaurantDetailPage
