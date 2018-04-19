# nodejs-master
This is my personal code for the course "The Node.js Master Class - No Frameworks, No NPM | Node v8.x" in Udemy


# First Section - REST-API

- Listens on a PORT that uses the GET, POST, PUT, DELETE and HEAD http methods.
- Allows a clinet to connect, then create a new user and allow to edit or delete it.
-  Users to sign in and give them back a token that they can use for subsequent requests
- Sign out which invalidates their token
- Signed in user to use their token to create a new 'check'(task to see if the server is up or down)
- Signed in to be able to edit or delete any of their checks
- In the background, workers perform all the checks atthe appropriate times, send alerts to the users when a check changes its state from 'up' to 'down' or visa versa.

