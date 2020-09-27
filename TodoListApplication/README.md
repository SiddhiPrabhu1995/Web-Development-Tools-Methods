# React TODO

* start from the up-to-date master branch (`git checkout master; git pull origin master`)
* Create a feature branch named 'react-chat' (`git checkout -b react-todo`)
* Add files as required
* add, commit, and push the branch to github
* Create a PR to merge to master
* Be sure to include the reviewer(s)
* Due by 11:59pm (PT) Sun Apr 12

## Goal and Requirements

This assignment is a little different: 
- You will interact with an existing service that you can't change
- And whoever wrote it has weird ideas about what is convenient to use
- You will need to read the server code to figure out what it is doing, but not change the server code

The dev-server can run with `npm start` (You will need to run `npm install` first).

The services server is run with `npm run server`

You will need to build your react and ensure it all works with only the services server running (no dev-server)

The goal is to:
* Write a React-based front end that uses the provided services
  - Without changing the services
* Using the services, the front end will:
  - Require login
  - Show the current todo list
    - Each task has a name and a "done" boolean
  - All the addition and removal of items from the todo list
  - Allow marking a task as done or not done
  - Allow editing of a task text
  - Be attractive, usable, and understandable
  - Allow modification of the theme preference
* In addition to the base service options, the front end (not based on any services) will:
  - Allow the user to toggle from having "done" tasks as visible or not (filtering)
  - Allow the user to sort the tasks by task name (alphabetically, both ascending and descending)
  - Allow the user to sort tasks by done/not done (both with done first or with not done first)
  - The filtering and sorting options will be attractive and understandable
  - Have a "refresh" button that does NOT reload the page, but DOES reload the list of tasks
    - Be sure your filter/sort options match the results (e.g. don't show that you are filtering out "done" tasks if after a refresh if you are no longer doing so.  There is no requirement on the behavior after a refresh, only that your UI and behavior match)
  - Only allow the modification of "theme" to one of three options: 'dark', 'light', and 'colorful'
    - The service has no such restriction, but the front end will do only allow you to select one of those three
  - Depending on the stored theme, the application will have some sort of matching styling
    - if the service has an invalid theme stored, the front end will instead default to one of the three
  - You do NOT have to show every message from the server, but you must show messages the user needs to see
    - You must convert the server-provided messages to friendlier messages

### Code
* You are NOT required to any specific hooks (e.g. useReducer is not required)
* Your code (client-side) should show good separation of concerns
* Your CSS should not use names to describe the appearance 
  - theme name is okay, as it isn't too specific
* Your JSX should be in small, targeted components and follow the best practices from class.
* Non-presentation logic (such as service calls) should be in pure JS files without JSX with functions imported into components as needed

## Allowances
* You may create your generated HTML as you see fit, but it must be fundamentally semantically valid and other best practices from class
* You may create the CSS as you see fit but you must follow the best practices given in class
* You may add icons and background images but there is no requirement to do so

## Restrictions
* You must not modify the server-side files at ALL (this includes formatting!)
* You must commit your build files (`npm run build`)
* All JSX files should have the .jsx extension, all vanilla JS files should have the .js extension
* Do not read from the DOM directly
* Do not modify the DOM except via React
* Do not use external JS outside of express, cookie-parser, uuid, nodemon, and what create-react-app installs
* Do not use external CSS libraries (except for icon libraries if desired - no JS!)
* You may not use floats to do more than manage flowing text with images
* You may not use HTML tables or CSS table layouts
* Do not have any files in your PR except for the assignment (no files in other assignment directories, for example)
* Do not use var
* Do not use alert
* Do not use terrible variable names
* Do not have console.log debugging messages or commented out code
* Do not use localStorage/sessionStorage/IndexedDB
* Do not use redirects or page reloads
* Do not use document.cookie
* You may not use CSS preprocessors, minifiers, or other tools to modify your CSS
