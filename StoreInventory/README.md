# REST & SPA

* start from the up-to-date master branch (`git checkout master; git pull origin master`)
* Create a feature branch named 'js-rest-spa' (`git checkout -b js-rest-spa`)

## Goals and Requirements

The storage will be managed server-side and the page (a SPA) will communicate via fetch() calls to REST services you write.  There is also a login requirement.

Despite the login requirement, there is a single inventory and all users will view/modify the same inventory.

If the user does not have a sid cookie, the page will request their username and provide an input field and submit button
- If the username field is blank, the button will be disabled
- When a username is entered and the button pressed
  - The username will be sent to a RESTful `/session` endpoint 

If the user has a sid cookie and the sid cookie contains a value NOT known to the server as a currently logged in user
  - The page will show the login page and the 'bad login' message

If the user has a sid cookie and the sid cookie contains a value that IS known to the server as a currently logged in user
- The page will display a list of inventory
- There is a "Logout" button on the page
- Each item will have a name and a quantity (shown as a text input)
- Each item will have an "Update" button to the right of the quantity
  - Pressing "Update" will send the new value to the service
- Each item name will have an "X" button next to it.
  - Pressing X will delete the item from the list
- There is a text field for name, a text field for quantity, and an "Add" button
  - If the text field is empty, the "Add" button is disabled
  - If the text field is populated, the "Add" button is enabled
  - Clicking the add button will add an item to the list with the text as the name and quantity (quantity defaults to 0)
    - The text field will be set to empty when an item is added

All updates to the inventory will make RESTful service calls
- any reference to `:itemid` below means the value of a given item id.  Example: `/items/:itemid` would be `/items/1` when talking about the item id of `1`
- If the sid in the cookie is ever missing or empty, the services will return an appropriate error and the page will display the login screen
- If the sid in the cookie is ever unknown, the services will return an appropriate error and the page will display the login screen with an error message
- Getting the initial list of items will be a call to `/items` - it should return a JSON object of objects
  - While the page list is loading the page should display "Loading..." 
- Adding an item will be a call to `/items` passing the name and quantity as a JSON body and getting a JSON object back that includes the name, quantity, and an id for the item
  - Trying to add an item with a duplicate name will return an error from the service and show an error to the user
  - Trying to add an item with an empty name will return an error from the service
- Pressing "Update" will call `/items/:itemid` to update the quantity - the new item object should be returned like when the item is added
  - You can still re-render the whole list afterward, but not you only got the updated info for a single item
  - You can use a `data-item-id` HTML attribute to associate the item id with the individual row
  - You should NOT have an event listener on every row/button.  Use event bubbling/propagation.
  - This assignment does not resolve collisions between many users.  That is fine for this assignment.
   
  - Trying to modify an item that was deleted by another page should remove the item from this page and show an error message
- Pressing "X" on an item will call `/items/:itemid`
  - The page should remove that item 
  - Trying to delete and item that doesn't exist on the server should show an error message, but still remove the item from the page
- The logout button will call `/session`
  - This call removes the `sid` cookie (Hint: `res.clearCookie('sid');` should remove the cookie
  - The page will return to the login page
  - No error message is shown
All error messages are removed from display when another action is taken

## Structure
- This page will be served by a express server you write (a single static HTML page, static CSS, static client-side JS, and REST endpoints)
- There will be no HTML on the server or generated by server-side JS except for the single static HTML page.  
- All other HTML will be built via the client-side JS.
- All service endpoints will use RESTful URLs
- All service endpoints will use RESTful HTTP methods
- All service endpoints will use HTTP Status codes in a RESTful manner
- All service endpoints that take more than a single piece of input will accept data as JSON in the body of the request
- All services will return data in JSON (if they return data outside of status code)
- All services that return JSON data should have the `content-type` header of `application/json` (hint: res.json() does this for you)
- All model logic should be in a separate file from your server file
- Manually reloading the page will refresh the page but show the current data
- Your code can be used by running `npm install`, `node server.js`, and going to `http://localhost:3000/`

