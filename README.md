to run

- copy .env.sample to .env
    - add the mongodb URI
- yarn && yarn start


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
