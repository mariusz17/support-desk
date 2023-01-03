This is project from Udemy course ReacState Front To Back 2022 by Brad Traversy: https://www.udemy.com/course/react-front-to-back-2022/

The project is originally written in JS and I am converting it to TypeScript.

## My personal tweaks:

Beside converting this project from JS to TS, I made my own below tweaks:

- save path: when user is not logged in and clicks for example "View my tickets", the app asks user to login, but also saves the original path (/tickets) and after successful login, the user is redirected to /tickets page (instead of to homepage).
- logout button: resets ALL Redux State, not just user state, so it fixes for example a serious bug, that when one user logs out and other one logs in, the old user tickets are still in the Redux State.
