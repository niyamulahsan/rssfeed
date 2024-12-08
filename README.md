## RSS Feed

This projet is created with node js with express and seqquelize mysql and in frontend side use vue js. I use here this link for RSS Feed -> https://www.prothomalo.com/feed/.

## Backend
I create backend with a modular based approach. Our backend starts from app.js file. For database I use sequelize ORM where I add some basic command into noderss README.md file. Please follow the command for run this file.

## Frontend
I already build the frontend. So no need to run the frontend. it is connected from backend app.js file. when backend run it will run also.

**Step 1:**
- goto noderss file
```
npm install
```

**Step 2:**
- go to noderss/src/config folder and open config.json
- in development json, set the database name where we use it for mysql
- create database into mysql which is set into config.json development json file

**Step 3:**
```
npx sequelize-cli db:migrate --debug
```

**Step 4:**
```
npm start
```

**Step5:**
- goto browser and run http://localhost:8000
- If you want to go swagger api that link is : http://localhost:8000/api-docs


**Folder Structure**
- It is run from app.js file. config, migrations, models and seeders folder for database related folder. routes folder holds the route. provider folder has a swagger setup. middleware stores our errorhandling middleware and our modules folder has our module where has three file for serving the api (controller, route, validation). I also created jobs folder for schedule run. It has cron schedule which is run every 30 minute for checking new feed and insert into database if feed is new.