# Banano Tavern

## Description

Banano Tavern is a single-page web app built with React. Its purpose is to be a 
provably fair cryptocurrency casino based on a variety of dice games. The provably 
fair algorithm is based off of this [MIT paper](https://courses.csail.mit.edu/6.857/2019/project/2-Cen-Fang-Jaba.pdf). User accounts and user data is tracked using Firebase's [authentication](https://firebase.google.com/docs/auth) 
and [RealTime Database](https://firebase.google.com/docs/database). The UI components are from the [react material-ui library](https://material-ui.com/).

[View the website.](https://banano-tavern.web.app)

## Why did I make this?

This project started out as a simple exercise to prove to myself that I could implement a provably fair algorithm. Around the same time, I had found this meme cryptocurrency, banano, that sparked my interest. Provably fair algorithms are fairly standard practice (or should be) in online cryptocurrency casinos. The instant and feeless transactions and overall desire to delve into cryptocurrency made it a match made in heaven for experimenting with both the algorithm and the currency. I wasn't worried about making a big mistake that might cost me a lot of money.

## How would I improve this?

More games! As of now, there's only 1 game, and I've got a couple other game ideas written down. I'm just trying to get the project to a deployed state first.

From a technical perspective, I have a list of features I'd like to change or add:

* Unit tests -- I need more practice writing unit tests in javascript, especially tests for the front-end.
* Limiting account creation -- With the possibility of free money comes the opportunity for it to be abused. There are ways to limit account creation. For example, store the IP address of an account and don't allow more than a number of accounts associated with an IP address.
* Design -- My design skills have always needed extra work over my code writing. The design of this app is simplistic and maybe a bit childish. It would be an interesting experience and a bit more realistic to hire a designer and implement their design.
* Components -- There are a couple places in the code where logic can be off-loaded to a smaller component. This is mostly organizational.
* Reset password -- The site is missing a reset password option.
