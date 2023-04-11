# Movies Application
For this project, we will build a single-page movie application (SPA). It will allow users to add, edit, and delete movies and rate them.

## Specification
Your application should:

On page load:
- Display a "loading..." message
- Make an AJAX request to get a listing of all the movies
- When the initial AJAX request comes back, remove the "loading..." message and replace it with HTML generated from the JSON response your code receives

Allow users to add new movies
- Create a form for adding a new movie that has fields for the movie's title and rating
- When the form is submitted, the page should not reload/refresh, instead, your javascript should make a POST request to /movies with the information the user put into the form

Allow users to edit existing movies
- Give users the option to edit an existing movie
- A form should be pre-populated with the selected movie's details
- Like creating a movie, this should not involve any page reloads, instead, your javascript code should make a fetch request when the form is submitted.

Delete movies
- Each movie should have a "delete" button
- When this button is clicked, your javascript should send a DELETE request

### Bonuses
- Add a disabled attribute to buttons while their corresponding ajax request is still pending.
- Show a loading animation instead of just text that says "loading...".
- Use modals for creating and editing movie forms.
- Add a genre property to every movie.
- Allow users to sort the movies by rating, title, or genre (if you have it).
- Allow users to search through the movies by rating, title, or genre (if you have it).
- Use a free movie API like [OMDB](http://www.omdbapi.com/) to include extra info or render movie posters.

### Helpful Hints
- The id property of every movie should not be edited by hand. The purpose of this property is to uniquely identify that particular movie. That is, if we want to delete or modify an existing movie, we can specify what movie we want to change by referencing it's id. When a new movie is created (i.e. when you send a POST request to /movies with a title and a rating), the server will respond with the created movie object, including a generated id.
- Take a look at the other branches in this repository, as they have configuration/setup for common scenarios, such as including Bootstrap in your application.

## Setup

1. Create a new organization (`lastName-lastName-movies-app`) and invite your partner to the organization. 
2. Create a new repository named `movies-application`.
3. Create a new JavaScript Project in IntelliJ named `movies-application`.
4. Create a new `.gitignore` and add the following:
```
.idea
.DS_Store
node_modules
```
5. Follow the instructions on GitHub to initialize the repository. Instead of using the README.md as the first commit, use your .gitignore file.
6. Create a new directory in the root of the project named data.
	- Inside the data directory, create a new file named db.json and enter the following contents:
		```js
		{
			"movies": [
				{
					"id": 1,
					"title": "Shrek",
					"rating": 5
				}
			]
		}
		```
	- This file will be used to store our JSON data for our movie objects.
7. In the IntelliJ command line, install json-server using npm.
	- `npm install -g json-server`
8. Once the package has been installed, open the package.json file and add a new json property:
	- ```js
		“scripts”: {
			“db”: “json-server -d1200 --watch data/db.json”
		}
	  ```
		- The `-d1200` flag adds a 1.2 second delay to the response time.
		- The `--watch` flag gives the location of the json file in which we are making requests to.
	- The scripts property allows us to create a custom script that we can run using npm in our project. To execute the script we created above, we can simply run:
		- npm run db
	- This script will run our json-server for us, allowing us to now make fetch requests to `"http://localhost:3000/movies"`!

