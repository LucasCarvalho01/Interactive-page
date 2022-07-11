# Crowdfunding interactive page

<img src="./design/desktop-preview.jpg">

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Useful resources](#useful-resources)


**Note: Delete this note and update the table of contents based on what sections you keep.**

## Overview

### The challenge

The challenge was to build an interactive crowdfunding page, and update ir according to user's events.

The users should be able to:

- View the optimal layout depending on their device's screen size
- Make a selection of which pledge to make
- See an updated progress bar and total money raised based on their pledge total after confirming a pledge
- See the number of total backers increment by one after confirming a pledge


### Links

- Live Site URL: [Here](https://remarkable-meerkat-a54891.netlify.app/)

## My process

### Built with

- Semantic HTML5 markup
- Responsive CSS 
- Mobile-first workflow
- Lot of Javascript
- ESlint for the first time
- Webpack

### What I learned

Got to know how webpack work, and basic configuration. Same for ESLint.
Practiced a lot of JavaScript: classes, modules...
Started to use NPM and improved Terminal usage.
Used AXIOS this time to get data from the JSON file

```javascript 
  getData() {
    axios.get(this.dataURL)
      .then((response) => {
        this.storeData(response.data);
        this.updateHTML(response.data);
      })
      .catch((error) => console.log(error));
  }
```
