# CLIENTS

## NAVIGATION

There are 3 different **React Apps** for ***ADMINISTRATOR***, ***TICKET COLLECTOR*** and ***USER***.
These can be found in the `clients` directory in the `project root`. All 3 apps are built using `create-react-app`.

### ADMINISTRATOR APP

This app is the Admin Panel that resides in the `/clients/admin_client/` directory. A Live demo is deployed on **Vercel** [HERE](https://intellipark-admin.vercel.app/).

### TICKET-COLLECTOR APP

This app is the Ticket-Collector's Panel that resides in the `/clients/collector_client/` directory. A Live demo is deployed on **Vercel** [HERE](https://intellipark.vercel.app/).

### USERS APP

This app is the User's Single Page Application where they can check their active tickets. It resides in the `/clients/user_spa_client/` directory. A Live demo is deployed on **Vercel** [HERE](https://intelli-view.vercel.app/).

## STATE MANAGEMENT

All the 3 apps use **Context API** for global state management as of now **Redux** is overkill!! They are split into `components` to increase **readability** and **decrease clutter** thus following Clean Code approach. 

You can find components in these apps in `/clients/<respective-app>/src/components`.

## STYLING

All the 3 apps use `Tailwind CSS` for their styling and uses `craco` package for `start`, `build` and `test` commands.

## RUNNING THE APPS

If you are running the app locally, then navigate to the respective **app directories** from your terminal/Powershell and run `npm install` first to install all the dependencies.
Then run `npm start`. 


