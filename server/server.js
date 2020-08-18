require("dotenv").config();
const db = require("./db");
const express = require("express");
const morgan = require("morgan");
const app = express();


app.use(express.json());

/*
Third party middleware using json
app.use(morgan("dev"))

app.use((req, res, next) => {
    console.log("something");
    next();
});
*/

//Always define your middleware at the top
//You can create as many middleware as needed
//You can have middleware send a response back to user
//Anything you can do with a routehandler you can do with middleware 

/*app.use((req, res, next) => {
    console.log("yeah our middleware");
    next();
});*/

/*
app.use((req, res, next) => {
    console.log("this is our second middleware");
    next();
});
*/

//Create rest API

//https://localhost:3001/whatever URL link is put inside parathesis.

/*inside parathese (URL,callback function which gets 2 param request and response

//Example app.get("/getRestaurants", (req, res) => {

})
*/

//Get all restaurants 
app.get("/api/v1/restaurants", async (req, res) => {

    try {
        const results = await db.query("SELECT * FROM restaurants")
        console.log(results); 
        res.status(200).json({
        results: results.rows.length,
        status: "success",
        data: {
            restaurants: results.rows, 
        },   
    });
    
    }catch (err) {
        console.log(err) 
    }  
});

//Get an individual restaurant        This callback function is call a rout handler
// :id -> is a variable parameter
app.get("/api/v1/restaurants/:id", async (req, res) => {
    console.log(req.params.id);
    try {
        //Ayways use this format because it protects from sql injection attacks
        //You can also pass in as many parameters as you want.
        const results = await db.query("SELECT * FROM restaurants WHERE id = $1", [req.params.id]);
       res.status(200).json({
           status: "success",
           data: {
               restaurant: results.rows[0],
           },
       });
    }catch(err){
        console.log(err) 
    }
}); 

//Create a Restaurants
app.post("/api/v1/restaurants", async (req, res) => {
    console.log(req.body);

    try{
        const results = await db.query("INSERT INTO restaurants (name, location, price_range) VALUES ($1, $2, $3) RETURNING *",  
        [req.body.name, req.body.location, req.body.price_range]);
        console.log(results);
        res.status(201).json({
        status: "success",
        data: {
            restaurant: results.rows[0],        
        },
    });
    }catch(err){
        console.log(err);
    }
    
});

//Update a Restaurants
app.put("/api/v1/restaurants/:id", async (req, res) => {
    try{
        const results = await db.query("UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 RETURNING *", 
        [req.body.name, req.body.location, req.body.price_range, req.params.id]);
        console.log(req.params.id);
        console.log(req.body);
        res.status(201).json({
        status: "success",
        data: {
            restaurant: results.rows[0],
        },          
    });  
    }catch(err){
        console.log(err);
    }
    
});

//Delete a Restaurants
app.delete("/api/v1/restaurants/:id", async(req, res) => {
    try{
        const results = await db.query("DELETE FROM restaurants WHERE id = $1",
        [req.params.id]); 
        res.status(204).json({
        status: "success",
        data: {
            restaurant: results.rows[0],},  
        });  
    }catch(err){
        console.log(err);
    }


    
    
});

//console.log("Test ");
//Create a new port variable if not specifiec than run on 3001.
const port = process.env.PORT || 3001;

//Specified what port you want your app to listen to.
app.listen(port, () => {
    console.log(`server is up and listening on port ${port}`);
});
