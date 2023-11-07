# Fly or ride

This is a complex web app designed as an ultimate travel planner, combining what is best in many external portals and providing the possibility to manage everything in one place. The app is in constant development, not even in its alpha, but I'm still pretty satisfied with it.

As it is still in development mode, it requires the NO-CORS Chrome Add-on to properly fetch from APIs.

## Functionality

### The Search Box
In this box the user can not only choose the desired airports, but also the starting point of his trip. This allows the app to calculate the cost of getting from/to other airports than desired and lets the customer calculate, whether it is cheaper to fly from another airport. Also, you can choose either fixed dates of your trip or dynamic range of them along with number of nights you want to spend in your desired place.

In the future I will implement the possibily to compare flight cost with driving with your own vehicle. The Search Box uses text prediction from Google Places API in order to provide proper text formatting, as it is used in queries later on.

### Results
After fetching data from Kiwi.com, the app displays the results. There you can choose whether to show the cost of getting to the airport or not - then you need to write the average fuel consumption of your car in order to calculate adequate result. 

The results can be filtered by the airports you want to include. The results are always sorted by price, but I will consider enhancing it in the future.

### Favorites
Upon clicking on the heart icon, the user may save the flight to his favorites tab. Then, he may compare his pinned itineraries. When the search query includes car transfer, the cost is saved in the favorites. If the search result did not include the car transfer, it is not shown. The favorites are stored in the browser local storage using Vue Use.

## Frameworks and APIs

The app runs on Nuxt.js, which is Vue's framework. It utilises its built in Routing and Layout capabilities. 

I have used the following APIs: 
- Google Places API for predicting the searchbox queries
- Kiwi.com (Tequila) Places API for finding proper IDs of airports/countries and Search API for looking for flights
- Google Matrix API for calculating the distance between starting point and airport
- Fuel Prices API for fetching actual fuel prices in whole Europe (used for calculating transfer's cost as well as for future uses).
- VueUse for utilising the local storage

## Colors, graphics, responsiveness
My app utilises Tailwwind in order to dynamically and easily setup the CSS. It is designed as Mobile-First app.

## Future
In the following days I am willing to implement API from Booking.com, RentalCars and Parking search, as well as weather predictions. I would also love to connect the app with Supabase in order to make users' accounts, where they can save their favourite trips and organise them, add new costs, split them, print as PDF etc.

### Check it out

Currently the website is deployed with majority of its possibilites working, but remember about the CORS.
