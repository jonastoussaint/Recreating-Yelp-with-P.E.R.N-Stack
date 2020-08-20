import React, {useEffect, useContext} from 'react';
import RestaurantsFetcher from '../apis/RestaurantsFetcher';
import { RestaurantsContext } from '../context/RestaurantsContext';

const RestaurantList = (props) => {

    const {restaurants, setRestaurants } = useContext(RestaurantsContext);
    
    const handleDelete = async (id) => {
        try{
            const repsonse = await  RestaurantsFetcher.delete(`/${id}`);
            /*When this function returns something and it equals to true you add that restaurant 
            that your iterate over back into the restaurant array 
            and if the id doesnt not equal the id that passed in then you
            dont add it back into the array */
            setRestaurants(restaurants.filter(restaurant => {
                return restaurant.id !== id;
            }))
        } catch(err) {
            console.log(err);
        }
    }
    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await RestaurantsFetcher.get("/")
                setRestaurants(response.data.data.restaurants);
            } catch(err){}
        };
       fetchData();
    }, []);

    return (
        <div className="list-group">
            <table className="table table-hover table-dark">
                {/*Header for table*/}
                <thead>
                    <tr className="bg-primary">
                        <th scope="col"> Restaurant </th>
                        <th scope="col"> Location </th>
                        <th scope="col"> Price Range  </th>
                        <th scope="col"> Rating </th>
                        <th scope="col"> Edit  </th>
                        <th scope="col"> Delete </th>
                    </tr>
                </thead>
                <tbody>
                    {restaurants && restaurants.map((restaurant) => {
                        return (
                        <tr key = {restaurant.id} >
                            <td>{restaurant.name}</td>
                            <td>{restaurant.location}</td>
                            <td>{"$".repeat(restaurant.price_range)}</td>
                            <td>reviews</td>
                            <td>
                                <button className="btn btn-warning"> Update </button>
                            </td>
                            <td>
                                {/*Pass a reference to a function 
                                and not the function itself right away 
                                otherwise it will think it wants to run right 
                                away*/}
                                <button onClick={() => handleDelete(restaurant.id)} className="btn btn-danger"> Delete </button>
                            </td>
                        </tr>
                        );                      
                    })}
                    
                </tbody>
            </table>
            
        </div>
    )
}

export default RestaurantList
