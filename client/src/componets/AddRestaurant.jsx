import React from 'react'
import {useState, useContext} from "react";
import RestaurantsFetcher from '../apis/RestaurantsFetcher';
import { RestaurantsContext } from '../context/RestaurantsContext';

const AddRestaurant = () => {
     const {addRestaurants} = useContext(RestaurantsContext);
     const [name, setName] = useState("");
     const [location, setLocation] = useState("");
     const [priceRange, setPriceRange] = useState("Price Range");
     
     const handleSubmit = async  (e) => {
         e.preventDefault();
         try {
                const response = await RestaurantsFetcher.post("/", {
                    name,
                    location,
                    price_range: priceRange,
                });
            addRestaurants(response.data.data.restaurant); 
            console.log(response);
         } catch(err){
            console.log(err);
         }
     }
    return (
        <div>
            <h1 className="mb-4">
                <form action="">
                    <div className="form-row">
                        <div className="col">
                            <input value={name} onChange={e => setName(e.target.value)} type="text" className="form-control" placeholder="name"></input>
                        </div>
                        <div className="col">
                             <input value={location} onChange={e => setLocation(e.target.value)} type="text" className="form-control" placeholder="location"></input>
                        </div>
                        <div className="col">
                            {/*This is how you do a dropdown menu */}
                            <select value={priceRange} onChange={e => setPriceRange(e.target.value)} className="custom-select my-1 mr-sm-2">
                                <option disabled> Price Range </option>
                                <option value="1"> $ </option>
                                <option value="2"> $$ </option>
                                <option value="3"> $$$ </option>
                                <option value="4"> $$$$ </option>
                                <option value="5"> $$$$$ </option>
                            </select>
                        </div>
                        <button onClick={handleSubmit}  type="Submit"className="button btn btn-primary"> Add </button>
                    </div>
                </form>
            </h1>
        </div>
    )
}

export default AddRestaurant
