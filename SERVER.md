# SERVER

### LOCALHOST DEFAULT URL

```
http://localhost:3300/
```

### ENDPOINTS DOCUMENTATION

```
https://documenter.getpostman.com/view/11888806/TW6uppf6
```

### STACK
 The server is based on MongoDB, ExpressJS, NodeJS. It is a REST API.
 
### DESIGN
The server is based on MVC design pattern with the `Models` existing in `models` directory, `Controllers` in the `controllers` directory and `Routes` in the `routes` directory.

### ENVIRONMENT VARIABLES

Inside the `server` directory a `sample.env` file is included. Create a new `.env` file if your are running server on `localhost`.
The server requires the following environment variables:
``` 
MONGO_DB_URI=YOUR_MONGO_DB_CONNECTION_STRING
AUTH_KEY=MSG_91_AUTH_KEY
TEMPLATE_ID=MSG_91_TEMPLATE_ID
```
> If you don't have MSG_91 credentials then fill the last 2 environment variables with some random string!

### STARTING THE SERVER

To start the server on localhost:
- Run `npm install`  to install all the required packages.
- To start in development mode - `npm run start-dev`
- To start in production mode - remove the `dotenv` package import and initialization from `app.js` then run `npm start`.

> Use node version 14 and above to run the app for consistency reasons.

### NAVIGATION

You can find the entrypoint of routes in the `app.js` file where all respective routes have prefixes. Example: For `Admin Routes`, `app.use('/administrator',administratorRoutes);` from where the request is forwarded to the **admin routes** and then to the **controller** respectively! 

So, you can navigate inside the project files following the same pattern for all the **endpoints**.

### MIDDLEWARES

You can find middlewares in the `middlewares` directory. They basically check the authentication status of the Administrators/Ticket Collectors.

### HELPERS

All the functions including CRON JOBS resides inside the `helpers` directory. This has been done to ensure **Clean Code!**

### CRON JOBS

There is also a CRON JOB that executes every minute. It automatically increments the price of all the Active tickets per minute. The respective charges Hourly and per minute can be set by Administrator.

### ENDPOINT FIRING ORDER

When connecting a new Database to the app,

- `Admin Sign Up` endpoint should be fired first to register a new Administrator. (This endpoint must be disabled in Production due to security reasons!)
- `Admin Log In` and get the Auth Token!
- `Create Minimum requirements` to create minimum requirements.
- `Register a new Ticket Collector` using Admin Auth Token.
- `Authorize the Ticket Collector` so that he can create tickets.

> This order must be followed to avoid errors when a new Database is connected.

