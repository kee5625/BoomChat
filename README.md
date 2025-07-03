# Documenting the Backend Process

1. Installed these dependancies:
    - bcryptyjs - a library to securely encrypt sensitive user data
    - cloudinary - managing and delivery media such as images and videos (storage, and optimization)
    - cors - used to bridge frontend with backend (connecting different domains)
    - dotenv - manage sensitive data in a node js app
    - express - framework for NodeJs; used to handle HTTP requests and manage server-side logic; used to communicate between client and server 
    - jsonwebtoken - authentication and secure data exchange
    - mongoose - db for storing and managing data efficiently (CRUD)
    - nodemon - utility used for restarting servers when changes are detected in source file (live server)
    - socket.io - bi-directional communication between client and server

2. Setup middleware and created expressapp, http server, started server

3. Created MongoDb account, free version; setup a user; went to network access and changed ip address to allow every one

4. Added mongodb uri to .env

5. Created connect MongoDB connection function (lib/db.js) and then implemented it in server.js

6. Created a User model with a defined user schema (models/User.js)

7. Create a UserController.js file with signup, login, and checkAuth functions

8. Created utils.js file to generate token (JWT_SECRET)

9. Create auth.js file to process routes and verify user

10. Setup cloudinary env variables: CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET


# Folder structure and its definitions

1. Controllers/ - Holds the logic for what happens when a route is hit by the frontend
    - userController - handles signup, login, checkingIfAuthenticated, update profile info (profilePic, bio, name)
    - messageController - handles sending message, viewing all users in sidebar, fetch chat history, and mark as read 

2. Lib/ - Utility and Integration tools (configs)
    - cloudinary.js - configs cloudinary to env variables
    - db.js - connects to mongodb db
    - utils.js - "generateToken" function for when web tokens are required

3. Middleware/ - handles middle layer logic before controller logic runs
    - auth.js - single protection route function to verifying existing user before routing

4. Models/ - database schemas for MongoDB
    - Message.js - defines how messages are stored in MongoDB
    - User.js - defines how a user is stored in MongoDB

5. Routes/ - maps http endpoints to controllers (connecting actual routes to controller functions)
    - messageRoutes.js - all routes releated to displaying users and messages (seeing users on sidebar, fetching messages, mark as seen, send message)
    - userRoutes.js - high level routes (signup, login, update-profile, check if authenticated)

6. server.js - core file (setting up server, implementing middleware, etc...)

