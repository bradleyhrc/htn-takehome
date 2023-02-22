# Hack the North 2023 Frontend Developer Challenge

Built as part of my submission for frontend developer application at HTN. Visit the app here: [https://htn-takehome.vercel.app/](https://htn-takehome.vercel.app/). 

To login without signing up for an account, you can use the following test account:

```
Username: bradleyhrct@gmail.com
Password: TestUser0$
```

Note: Environment variables are hidden from this repo and are used to protect sensitive information related to user authentication.

### Features
- Login and create a new account
- Display event information, with pop-up modals when you click an event card
- Search events by name/title
- Search events by ID (Note: Searching by ID will return the event as well as any of its related events)
- View related events^
- Display private events only when logged in
- Loading screen

## Written Response

1. Walk us through your development process as you worked on this project. How did you plan out the structure and design of it? How did decide on the tools you've used? Did you encounter any problems? And if so, how did you solve them? Are there any areas of your code that you're particularly proud of or want to point out?

### Libraries Used

### React

In truth, I have prior experience using React and chose to leverage this in my submission. I created several dynamic components for the different features of the app which make the code more friendly to work with and easily maintained. Since React is so popular, it has a wide range of support and compatible libraries that helped me implement the functionality I was looking for more efficiently.

### Auth0

After evaluating alternative libraries, I chose to use Auth0 because it was easy to implement with React and provided the user information that I was looking for to make the display responsive to user logins. 

### Semantic UI (React)

This was my first time using Semantic UI, however I really enjoyed the library for its simplicity and beautiful components. This helped me efficiently create a fully responsive and beautiful app under such a tight deadline.

### Dotenv

Environment variables were used to hide sensitive information relating to my Auth0 account. Dotenv simply allowed me to call these environment variables within my app.

### Design Walkthrough

As I started building the app, I aimed to keep the code easily readable, easily maintained/updated, and logically organized through React components. Additionally, I leveraged React states and hooks to specifically re-render items whenever a change or event occurred. This was essential as the app dynamically displays different information depending on the value of different states, namel user authentication, search queries, and modal pop-ups.

`App.js` is a high-level component which displays a loading screen while user authentication data is being retrieved. Otherwise, it simply wraps the 2 sub-components: `Profile` and `Events`. 

`Profile` is a component which displays a custom welcome message for logged in users. If not logged in, it simply displays a generic message. This is the top-most component on the screen, and also allows the user to login/logout.

`Events` is where the main data is displayed. Several states were used to enable search filter, data retrieval, and user info. Here, I learned the application of the `React.useCallback()` function, which allowed me to reduce the number of re-renders of constant functions (to filter data) by having React remember them across renders. The `SearchBar` component filters through the event data whenever the search query changes. This filtered dataset is then what gets displayed on the screen. Below the search bar, the events are then dynamically casted on the screen, while also hiding private events from users that are not logged in. Lastly, the `EventCard` component is one instance of an event that gets displayed on the screen. It processes the time data to make it human-friendly, and also displays different colour labels depending on the data. This is where the pop-up modal is also implemented, where the user can see the full range of event information and click on a button for related events.

### Problems Encountered
- When implementing event search, I first had trouble getting the `SearchBar` component to communicate with its parent component, `Events`. This had to be done because `Events` has a copy of the current search query, but `SearchBar` needs to update this as a child whenever it changes. After some research, I discovered a solution that involved passing the `matchKey` function, which filters the data based on the search query, directly to the `SearchBar` component so it can call it (which then updates the corresponding value) whenever there is a change.
- Another issue I encountered involved the different expected behaviour between search queries that were strings vs. integers. On one hand, my previous search functionality only matched based on the title of an event. However, I also wanted the ability to search by event ID using integers, and also view related events when searching by event ID. This was a case I did not anticipate, but simply checking the search query to see if it was an integer. If so, I was able to create another function which implemented the different expected behaviour.

### Parts I'm Proud of
- `getData(url)` inside of the `Events` component is the function which retrieves the hackathon data from the API using a fetch request. I'm proud of my implementation because it proactively displays an error whenever there is an issue with the API data. Otherwise, it also sorts the data by `start_time` and updates the state of the app. This function would also be really easy to transfer for further projects that involve API requests.
- I particularly like the Loading screen that I made. I noticed that whenever I logged in/out, the screen had a bit of delay in changing the data. This is because of cache/loading time. Thus, I thought of showing a loading screen to hide these changes from the user.

2. Given additional time, how would you extend your application to become a fully functional product that thousands of hackers and the general public would use at Hackathon Global Inc.™'s next event? Would you add more features and performance metrics? If so, what would they be?

To extend my app to a fully functional product for this use case, I would look into adding additional functionality that hackers would appreciate. For example, having a user profile page where hackers can customize their profile would help them feel more in control of their account. Also, it would be useful to add an option to 'RSVP' to an event, which would allow organizers to estimate the demand and popularity of specific events and plan accordingly. Moreover, I'd like to display and facilitate the resources that hackers have at the event, such as a list of mentors (being able to chat with them, etc.) and technical resources like vouchers or promotional codes. 

Further, I believe it would be beneficial to add the ability to collect data and user responses within the app. Since hackathons have lots of moving parts and try to improve every year, the ability to gather user responses within the app would be helpful to collect insight and sugestions for future events, as well as document any issues that ever happen. 

### Areas of Improvement
- I recognize that some of the logic in my code to process the dataset was simplified, such as only displaying one speaker (if they exist) or assuming only 3 'types' of events (teal, pink, olive). My code would not stop working if the data was expanded in these categories, however does require more detail in a full-scale project.
- I believe that my method of filtering the event data given a query string is effective, but not completely efficient as it iterates over the full list of event data at every change in search query. Given the limited number of events a hackathon can host in one weekend (in this case, 15), I was satisfied with this initial solution. However, I would look into optimizing this piece code for larger datasets, perhaps by pre-processing the data to be able to search it more efficiently or by leveraging hashing techniques.

Thank you for reading all the way here!

## Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
