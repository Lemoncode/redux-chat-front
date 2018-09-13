# redux-chat-front
This project served as a base project for the workshop "Redux, from zero to hero" given in React Alicante 2018 by Lemoncode.

The goal of this codebase is to show a real example of Redux integration, providing a set of step by step samples and covering core concepts of Redux. Each of the samples contains a README.md file that indicates the purpose of the sample plus a step by step guide to reproduce it.

The base application used in this workshop consists in a simple chat made of a really simple backend and a front end with 2 pages:
- Lobby: landing page to select available room (channel) and your nickname.
- Chat: the chat module itself where you will see the room conversation.

# Installation

In order to launch each sample, we need to run a tiny backend in the background that will setup a communication socket. Please, download our [redux-chat-back](https://github.com/Lemoncode/redux-chat-back) repository and run it by doing:

```
npm install
```
and then
```
npm start
```

Once backend is up and running, just navigate to the desired sample source folder, for example, start from the beginning:
```
.\redux-chat-front\01_ES6\00_start\
```
and run:
```
npm install
```
once we have all the dependencies downloaded, just launch it:
```
npm start
```

# Contents


## 00_Basics

Introductory readme covering important and useful ES6 concepts that will be used throughout the project.

## 01_ES6

Set of samples of a redux integration in our chat application from zero.

Please refer to this folder and check its sub-folders containing a detailed readme of the purpose for each sample and its implementation.

## 02_Typescript

Migration of the last ES6 sample to a full typescript solution. Also contains a refactor of the code towards an advanced architecture based on pods.

## 03_Further_Reading

Recommended reading about several redux ecosystem tools and libraries that may be interesting for the attendees.


# About Lemoncode
We are a team of long-term experienced freelance developers, established as a group in 2010. We specialize in Front End technologies and .NET. Click here to get more info about us.

For the LATAM/Spanish audience we are running an Online Front End Master degree, more info: http://lemoncode.net/master-frontend