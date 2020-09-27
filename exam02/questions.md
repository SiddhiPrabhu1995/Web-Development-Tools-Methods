# Exam 2 Questions

* Answers should be roughly 2-5 sentences, and in your own words.  
* Some questions ask for a code sample - keep them short and to the point.
* Be sure to be clear - be careful not to use vague pronouns like "it" if I can't be completely sure what "it" is.
* I cannot assume knowledge you don't demonstrate, so be clear and explicit.

## Q1: The first rule I've given about REST services is that the URL should represent a resource.  What does that mean?  Give an example where a url DOES not represent a resource, then describe how to modify it so that it does.
The URL of a REST service should represent a resource to interact with. The URL should be a noun and not a verb. It should be semantically meaningful and should represent the data being fetched from the server.
 -For ex- http://api.example.com/AddStudent-ToTable.html
        In the above example, the URL has many flaws
        -The URL "AddStudent-ToTable" shows actions instead the resource name should be nouns 
        -URL should have lower case letters as they are convenient and consistent among the url
        -It should not include file extension as it does not add any value and removing it will decrease the length of URL
        The modified URL - http://api.example.com/student is precise and understandable. 

## Q2: If the service returns the username as a plain text string, what is wrong with the below and what would fix it? (Assume the service works without error)
```
  const username = fetch('/username');
  console.log(`user is named ${username}`);
```  
 - In the given example, the fetch returns a promise but the body is not parsed hence it will not print the name. console.log() is called during initial load and username is not resolved yet.
 - fetch returns a promise which is then resolved to a response object. To get the data, we need body and parse it. 
 - To get text from response, it can be done using response.text().
 - The following changes would fix it:-
  In this example, the fetch returns a promise which is resolved to a reponse object and further parsed to text type and then prints the name.
  
 ```
    fetch('/username')
    .then(response => response.text())
    .then((username) => {
        console.log(`user is named ${username}`);
    })

```  

## Q3: What does it mean to "store your state in the DOM"?  Why shouldn't you do this?
Store state in the DOM means storing the state (summary of the current value for all the things that can change) in the DOM instead of storing in variables/object and use those to update the screen as needed.

We should not do this because of the following reasons:-

1. It doesn't follow MVC model(common best-practice pattern for man situations) where something manages the data(Model), something manages the flow of the application(Controller) and something translates the data to output(view)
2. It also leads to memory leakage
3. If you alter your display, you change how to get list as a input from visual output which makes your display and state interactions complicated
4. It also causes security issues because the screen is visual output. Therefore anyone can alter the data stored in the DOM from the browser
5. Consider a form with input fields username and password and a submit button. When user enters any value and hit submit button, the values from the form are processed which means form fields are used as storage allowing one handler per event. This situation is considerable for small application but for large applications having multiple forms, it will become difficult to maintain state, introduce complexity and refactoring web pages.

## Q4: Explain the differences between a multiple-page-web application and single-page-web application.  Be sure to fully demonstrate your understanding.
Single-page-web application:

1. Single-page-web application is a more modern way
2. Single-page application (SPA) is a web application or website that interacts with the web browser by dynamically rewriting the current web page with new data from the web server, instead of the default method of the browser loading entire new pages.
3. Back-end and a front-end are separated and they don’t interfere in each other’s concerns. 
4. Single-page application works inside a browser and does not require page reloading during use and no extra wait time.
5. Data updates are handled by service and REST api calls where data is send back and forth the server
6. SPA requests the markup and data independently and renders pages straight in the browser
7. It requires JavaScript to be present and enabled. If any user disables JavaScript in his or her browser, it won’t be possible to present application and its actions in a correct way.
8. SPA is less secure due to Cross-Site Scripting (XSS), it enables attackers to inject client-side scripts into web application by other users
9. Memory leak in JavaScript can even cause powerful system to slow down
8. Examples : facebook, twitter,  Gmail, Google maps etc

Multiple-page-web application:

1. Multiple-page-web application is a more traditional way
2. Multi-page application consists of several pages with static information (text, images, etc) and links to the other pages with the same content. During a jump to another page, a browser reloads the content of a page completely and downloads all resources again, even the components which are repeated throughout all pages which makes it slower comparatively
3. Front-end and back-end development are tightly coupled
4. Page reload is required to display the changes from server to front end
5. Multi page application is more secure 
6. Multi page applications are large and bigger than SPA due to many levels to UI
7. Multi page Applications are not too prone to memory leaks
8. MPA are tight coupled and difficult to develop than SPA
9. Examples : NEU website etc


## Q5: What is Progressive Enhancement?  What is the difference in an SPA that uses Progressive Enhancement compared to an SPA that doesn't use Progressive Enhancement?
Progressive enhancement is a design philosophy that centers around providing a baseline of essential content and functionality to as many users as possible, while at the same time going further and delivering the best possible experience only to users of the most modern browsers that can run all the required code.

Process of taking a non-client JS web app and augmenting it with JS is progressive enhancement. It remains working if no JS(no client side JS). Its great for search engines, accessibility and various devices. And also its great for ensuring backend is secure.

-SPA that uses progressive enhancement gives fallback advantage providing fault tolerance and improved performance. Consider a scenario where HTML loads while referenced scripts fail to load due to network issue, in such case PE helps to show basic essential content till the scripts are loaded again.
-In SPA not using PE, considers that an application is running on supporting browser and does not provide fallback functionality and which is difficult for user to understand.

## Q6: Explain how a REST service is or is not similar to a dynamic asset.
Rest service is similar to dynamic asset due to the following reasons.

1. REST services are web service calls that follows REST protocols.
2. Representational state transfer protocol(REST) is a software architectural style that defines a set of constraints to be used for creating Web services.
3. REST uses HTTP methods such as GET, PUT, POST, DELETE, PATCH etc to perform various CRUD operations.
4. REST service provides a URL as a resource to interact, a HTTP method is a interaction with the resource and HTTP Status code is the result of the interaction. 
5. REST services are async which runs in the background and creates responses to request.
6. By definiton, dynamic assets doesn't exist as a file and is generated in response to request. They are constructed either immediate or for a short span. 
7. An example of a dynamic asset is json data specific to the user requesting it. It has to be generated specifically for that user and dynamically.
8. Dynamic asset triggers are also async in nature.

## Q7: Give an example of a piece of information you should not store in a cookie, and why you should not store it that way.
1. An information that should not be stored in a cookie is 'Password'.
2. The data stored in cookies are available as plain text. 
3. If we store passwords, users can easily get our passwords which can cause security issues. 
4. Therefore cookies are never a good option to store critical or sensitive information.

## Q8: Explain why it is useful to separate a function that fetches data from what you do with that data
It's useful for the following reasons

1. A good separation of concerns where each module in an application is responsible for only thing and is does not deal with other module.
2. Makes code loosely coupled which benefits it reusibility of code and reducing extra, duplicate code and ensuring that if state changes it is reflected correctly rather than missing data or showing incorrect data
3. It would make the code easy to understand and readable
4. Change or extend with minimal effort(should not mean to change code everywhere)
5. HTML should have nothing to do with calling a service
6. Does not change if the HTML Changed
7. Know what functions do without looking at the code
8. Caller can decide how to react to this data

## Q9: Explain why try/catch is useless when dealing with asynchronous errors (assume you aren't using async/await)
1. "Try/catch" is useless because try/catch is synchronous and if error is thrown in asynchronous code we have already completed the try/catch.
2.  Execution doesn't remember that its inside the try/catch because it already ran and came out before the async call back is executed. This means code in catch will never be executed.
3. Example:- When page loads the function is initalized and when the events occurs the call back is called.
If we are using a try/catch, function is loaded earlier without any errors and when an error occurs nothing will be caught.        

try {
  Promise.resolve()
  .then( () => {
    console.log("-----inside then-----");
    throw new Error("error");
  });
} catch( err ){
  //doesn't happen
  console.log(`caught ${err}`);
}
console.log("-----outside try catch-----");

output is
  -----outside try catch-----
  -----inside then-----

In this example, console.log("-----outside try catch-----") gets executed before the promise is resolved.
Error never be caught.

## Q10: Is separation of concerns a front end issue, a server-side issue, or both?  Describe an example the demonstrates your answer.
- Separation of concerns is applicable to both front end and server side. 
- For ex- Client-side                                             Server-side
        const list = document.querySelector('ul');              app.get('/home', (req, res) => {
                                                                    res.sendStatus(200).json(data);    
        function updateList(data){                              });        
          list.innerHTML = data;
        }                                                       app.post('/home', (req, res) => {
                                                                    const uid = users.nextID();
        fetch('/home')                                              users[uid] = req.params.body;  
        .then((data) => {                                           res.json(users);
            updateList(data);                                   });
        })
        .catch((err) =>{
            updateStatus(err);
        })

- In client-side, fetch function calls the api and its works is to get data and has nothing to do with rendering HTML. While the work of updateList function is to updates the HTML and it can be used in other function too. All the functions are loosely coupled, easy to modify, easy to understand and can be reused.
- In server-side, in post method the users object is accessed from other js file. The users file only maintains the user data and nothing else.