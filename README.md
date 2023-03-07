## to run

- run `docke-compose-up`
- copy .env.sample to .env
    - add the mongodb URI
- yarn && yarn start
- import postman collection from docs directory and start exploring


### do not add/update migration files while the yarn startdev is running


# Creation
I think of creating the project from scratch this time, because I like a minimalist approach but with a room for expantion.
- yarn init -y
to trach my steps so far
- git init
- git add .
- git commit -m "initial commit"
adding a new repo to my account using
- gh repo create

Start working on the primary server
- yarn add express nodemon cors
- will call the first route healthcheck
- adding a crude test and node-fetch 
- adding git ignore

Since the app is pretty simple it will just use mongoose to interface with a mongodb
- yarn add mongoose dotenv

I know there are differnt project structure preferences, It is always hard to choose
I will go with a DDD like structure (thou I do not think that the current app is complex enough to be disignd this way) 
I will take a few shortcuts as well.

Trying to find an easier way to handle mongoose errors 

Adding medications API
some crude tests
allowing jest to use esm

- since we need some data changes, I will use a tool for migrations `migrate-mongoose`
- it is giving me some trouble so I am searching for something eles or will implement a manual manager
- looking at this as well to change how I import files (will see what I can do) https://dev.to/mukul_singhal/write-es6-in-node-using-babel-3m7p

- I am trying to make tha project as complex as I can for the simple requirements to show up my skills 

- I find it a bit inconvenient to complicate it further :-)

- I used bable to tidy things up but it seems to need a bit more work.

- I made some tests to help me develop as it was not mandatory in this task.

