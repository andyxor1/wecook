# Starting Guide

## Checklist
- node installed?
** check with node -v
- npm installed (should be installed with node)
** check with npm -v

## File/Folder explained:
### app.js File
think of this file as the entry point of the web application.

### views Folder
this is where all your mark up files (i.e. HTML/EJS) are going to be held

  #### includes
  think of this subfolder as different components of HTML, usually includes reusable components, such as       header, footer, nav

  #### pages
  think of this subfolder as different pages of your website

  #### index.ejs
  this is the entry point of your home page (different from app.js, which is for server side entry)

### public Folder
this is where all the stylesheets, js, bootstrap should be held

### routes Folder
this folder holds different routes in the app; done for modularity

### model Folder
this is where all the data schemas are held. Example: user has the schema of "email, password, username, etc"

### package.json
this is the app configuration files -- usually don't touch it; although you can specify what type of scripts to run
```
npm start
```
can be run because of the script


## Packages
* express
* mongoose
* path
* body-parser
* ejs
* passport
* passport-local-mongoose


## Installing/Running app
1. Download Robo 3T https://robomongo.org/
* this is for connection to mongodb

2. Install node packages
```
run "npm install"
```
3. Launch server
```
run "npm start"
```
