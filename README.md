# todolist_app
a small RESTful app for scheduling todo list based on MongoDB, React, Express, Passport

You should first install all dependecies in both api and client folder.
Then create a .env file in api folder with mongodb atlas url, like below (edit the username and password accordingly)

#mongodb, atlas

ATLAS=mongodb+srv://[username]:[password]@cluster0.sjw9m.mongodb.net/react-todo?retryWrites=true&w=majority
ATLAS_USERS=mongodb+srv://[username]:[password]@cluster0.sjw9m.mongodb.net/react-todo-users?retryWrites=true&w=majority

Once done,
1. go to api, type 'npm start' to start the server side
2. go to client, type 'npm start' to start the front-end React web app
