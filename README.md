## API TOKEN AUTHORIZATION

So you have built your shiny new API and now you want to release it in the wild. But wait you don't want unknown people to just make a request and access all that precious data that your API has to offer. You want an authentication layer over your API so that you can securely give your clients a unique token and whenever they want to access your API, they have to provide the token also.

Well, this project does just that by using stateless JWTs and mailing them to your clients.


## How it Works?

* Client generates a token by sending POST request to /api/token with their email.
* The token is generated and mailed to the email address.
* The Client accesses the token from their email and saves it for future use.
* The Client makes a GET request to /api/jobs along with the token and get the jobs listed.


## How to run locally?

* Clone repo and `cd` into it.
* Run `npm i` to install dependencies.
* Run `npm run dev` to run development server with watch mode (:heart: nodemon)

This project uses the very awesome low level and fast [Polka](https://github.com/lukeed/polka) web framework.
