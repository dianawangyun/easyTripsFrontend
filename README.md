# Easy Trips (Frontend)

This app uses Google Map API for place search and locations reference for activities in trips. 

Once logged in, the user can create his/her trips plan and add activities into trips. For each activity in the trip, the user can easily search the place and view on the map. And all the activities added to the trip are marked on the map for easy reference. 

This is the frontend part, for the backend part please refer to the following url:

https://github.com/dianawangyun/easyTripsBackend

## Technology stacks used:

- 3rd party API: Google Places, Geocoding and Maps JavaScript API, Use Places Autocomplete.
- Frontend: Create React App, Bootstrap, JSON Web Tokens
- Backend: Node.js, Express, bcrypt, pg, JSON Schema
- Database: PostgreSQL



## Setup

1. Backend: 
   1. Open a command line console, cd to the folder of this app,  run `npm i` in the command line console to install the dependencies.
   2. Make sure postgreSQL is installed and setup (if not please download and install [postgreSQL](https://www.postgresql.org/download/) first).
   3. Run `psql -f -easytrips.sql` (for windows user) to initialize the database.
   4. Run `npm start` to start the server.
2. Frontend:
   1. Open a command line console, cd to the folder of this app,  run `npm i` in the command line console to install the dependencies.
   2. replace the googleMapsApiKey value with your API key in Map.js (line 29).
   3. Run `npm start` to start the server.
3. Access the app via a browser:
   1. Open Chrome or other browser, type in "localhost:3000" in the address bar.
   2. Start planning your trip.

## **Test**

The following works for both Backend and Frontend:

1.  Open a command line console, cd to the folder of frontend or backend.
2.  Run `npm test`.