## Get Started Guide:
- To start using this repo there is a small amount of preliminary setup required.

### Enviornment Variables:
- Open the file `sample.env` in the root directory and set values for the following enviornment variables.
  - PORT = Set this to any open port on your computer
  - DB_URI = If you have a local MongoDB Server running on your computer you can set this to `mongodb://localhost:27017/<collection>` by default. If you are running via docker you can exclude this as it is covered by the docker-compose.
  - JWT_SECRET = This can be any random string involving letters, numbers and symbols. It is used to hash and salt passwords and JWT tokens.

### Running the development server:
- First run `npm install` to install project dependencies.
- Next run `npm run dev` to start the nodemon server.
- Nodemon will now reload the server every time you save a change to a file.

### Running through Docker:
- Make sure docker is installed correctly on your machine. This was tested using linux containers, I would imagine there would be no issue running it on windows containers but I cannot be certain.
- Run `docker-compose up --build` to build and run the mongodb database and the express-server.

### Routes:
- Now that your server is running you can access it by making a POST request to `https://localhost:8080/signup` with a request body containing an email and a password key.
- Once you have signed up you can access the `/login` route with the same body to recieve a JWT Token used for accessing protected routes.
- To access all protected routes you must have a header key of `Authorization` with the value of `Bearer <token>`