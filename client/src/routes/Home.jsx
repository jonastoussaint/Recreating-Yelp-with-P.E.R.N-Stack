 import React from 'react'
import Header from '../componets/Header'
import AddRestaurant from '../componets/AddRestaurant'
import RestaurantList from '../componets/RestaurantList'
 
 const Home = () => {
     return (
         <div>
             <Header/>
             <AddRestaurant/>
             <RestaurantList/>
         </div>
     )
 }
 
 export default Home
 