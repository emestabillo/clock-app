# Frontend Mentor - Clock app

![Design preview for the Clock app coding challenge](./assets/preview.jpg)

Frontendmentor.io submission page: https://www.frontendmentor.io/solutions/clock-app-npTvDit9h

## The challenge

The challenge is to build out this clock application and get it looking as close to the design as possible using following APIs to retrieve the necessary data:

- [World Time API](http://worldtimeapi.org/) to set the time based on the visitor's IP adress. This API will also be used for additional data, like the day of the year shown in the expanded state.
- [IP Geolocation API](https://freegeoip.app/) to set the city and country underneath the time
- [Quotes API](https://api.quotable.io/random/) to generate random quotes.

## User stories

Users should be able to:

- View the optimal layout for the site depending on their device's screen size
- See hover states for all interactive elements on the page
- View the current time and location information based on their IP address
- View additional information about the date and time in the expanded state
- Be shown the correct greeting and background image based on the time of day they're visiting the site
- Generate random programming quotes by clicking the refresh icon near the quote

### Expected Behavior

- The greeting changes depending on the time of day. It should say:
  - "Good morning" between 5am and 12pm
  - "Good afternoon" between 12pm and 6pm
  - "Good evening" between 6pm and 5am
- The greeting icon and background image also changes depending on the time of day. They should show:
  - The sun icon and the daytime background image between 5am and 6pm
  - The moon icon and the nighttime background image between 6pm and 5am
- Generate a new random quote whenever the refresh icon is clicked

### Features I added

- Time automatically updates
- 12-hour format

## Technologies I used

- APIs, Axios, SCSS, BEM, Figma for the design files
