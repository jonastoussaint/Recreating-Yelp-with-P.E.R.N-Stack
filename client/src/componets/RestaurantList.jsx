import React, {useEffect, useContext} from 'react';
import RestaurantsFetcher from '../apis/RestaurantsFetcher';
import { RestaurantsContext } from '../context/RestaurantsContext';
import { useHistory } from 'react-router-dom'

const RestaurantList = (props) => {

    const {restaurants, setRestaurants } = useContext(RestaurantsContext);
    
    let history = useHistory();

    const handleDelete = async (e, id) => {
        e.stopPropagation();
        try{
            const response = await  RestaurantsFetcher.delete(`/${id}`);
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

    const handleUpdate = (e, id) => {
        e.stopPropagation();
        //Push URL into the history stack
        history.push(`/restaurants/${id}/update`);
    };

    const handleRestaurantSelect = (id) => {
        //Allow you to go into Detail Page
        history.push(`/restaurants/${id}`); 
    }

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
                        <tr onClick={() => handleRestaurantSelect(restaurant.id) } key = {restaurant.id} >
                            <td>{restaurant.name}</td>
                            <td>{restaurant.location}</td>
                            <td>{"$".repeat(restaurant.price_range)}</td>
                            <td>reviews</td>
                            <td>
                                <button onClick={(e) => handleUpdate(e,restaurant.id)} className="btn btn-warning"> Update </button>
                            </td>
                            <td>
                                {/*Pass a reference to a function 
                                and not the function itself right away 
                                otherwise it will think it wants to run right 
                                away*/}
                                <button onClick={(e) => handleDelete(e,restaurant.id)} className="btn btn-danger"> Delete </button>
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
