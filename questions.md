# Exam 1 Questions

* Answers should be roughly 2-5 sentences, and in your own words.  
* Some questions ask for a code sample - keep them short and to the point.
* Be sure to be clear - be careful not to use vague pronouns like "it" if I can't be completely sure what "it" is.
* I cannot assume knowledge you don't demonstrate, so be clear and explicit.

## Q: What is the difference between a dynamic asset and a static asset?
In Dynamic assest, in order to reflect changes it requires server to restart. It is used to create interactive web pages and respond to the server immediately. Dynamic websites are developed using scripting language like Java, PHP and javascript. An example of a dynamic asset is json data specific to the user requesting it. It has to be generated specifically for that user and dynamically.  

Static assest do not require server to restart and they are content heavy but not interactive as that of dynamic assest. They are written in plain HTML file. An example of a static asset is a file on disk. It's the same for each and every request. It's a file on the filesystem that doesn't require any processing.

## Q: What is the difference between a relative and absolute file path in an href?  What is the "webserver root/document root" and how do absolute/relative paths relate to this document root?
Relative path - It is a path with reference to currently loaded page. It helps to reduce load time and also helps to test website locally or on staging environment.
for example: <a href= cat.png > Loads from document root</a>
Currently loaded page - > http://example.com/foo/
Relative path would navigate to http://example.com/foo/cat.png

Absolute path - It is a path with reference to root directory. Absolute path always start with '/' which resolves to the document root. Absolute path makes harder for people to modify information on website. It helps to avoid duplicate content problem.
for example: <a href = /images/cat.png > Loads from current working directory</a>
Currently loaded page - > http://example.com/foo/
Relative path would navigate to http://example.com/images/cat.png

Webserver root/document root:  webserver root/document root is the directory/folder where the website files for a domain name are stored. Document root is a publicly accessible base folder for a website i.e when navigate to the website's domain.

Absolute path always start with '/' which resolves to the document root
    for example: <a href = /images/example.png > Loads from document root</a>
    If /var/www/myWebsite is document root, this resolves to /var/www/mywebsite/images/example.png

Relative path doesn't start with '/' and doesn't resolve to document root. It relates only to current working directory
    for example: <a href = images/example.png > Loads from current working directory</a>

## Q: What is the difference between server-side and client-side JS?
  1. Server-side JS is not visible to the user whereas client-side JS is completely visible to the user
  2. Server side javascript is javascript code running over a server and performs all the task in the server only. The user is unaware of those tasks. Clientside JS is javascript code which runs on the browser of user machine, not on the server.
  3. Server can only respond to responses and don't have access to the rendered page whereas client can change HTML and add in references to CSS or JS
  4. Server-side JS enables back-end access whereas client-side JS enables enhancement and manipulation of web pages and client browsers
  5. Server-side JS is more secure than client side scripting.
  6. Example of Server side JS is Java, Python, NodeJs, PHP and client side JS is HTML, CSS, Javascript, VBScript

## Q: What are the differences between `var`, `const`, and `let`, and when should you use each of them?
Var:-
•	var variables are function scoped  
•	var variables are hoisted
•	var variables can be assigned at declaration or later
•	var can be re-declared and updated within its scope
Const:-
•	const variables are block scope
•	does not hoist
•	prevents reassigning the variable
•	must be assigned a value at declaration 
•	Const prevents reassigning(neither be updated nor re-declared) 
•	Does not prevent mutation of an array or object

Let:-
•	let variables are block scope
•	Does not hoist
•	Used for initialization
•	Let can be updated and not re-declared within its scope

when to use:

1. if the variable has to to updated,re-declared and global or function specific, then var is used. Should not be used unless you're targeting older JS engines
2. if the variable is block specific and variable need to be updated and no need of re-declaration, then let is used
3. if the variable is block specific and variable need not to be updated or re-declared, then const is used

for example,

var a = 10;

function sample(){
    let b = 20;
    const c = 30;
    console.log(b);  //20
    console.log(c);  //30
    b = 40;
    console.log(b);  //40
    c = 50;
    console.log(c);  //TypeError: Assignment to constant variable. --> because c is const which neither be updated nor re-declared
}

console.log(a);   // 10  --> because a is globally scoped
sample();
console.log(b);   // ReferenceError: b is not defined  --> because b is block scoped
console.log(c);   // ReferenceError: c is not defined  --> because c is block scoped


## Q: What are the 4 ways to create inheritance in JS? (no examples needed, just a sentence describing each)
1. Constructor function - constructor is a function that happens to be called with the new opearator. 'new' opeartor is used to create objects who wants to inherit from parent. So that, prototype property is assigned as the prototype of the new object

2. Object.create  - objects are created by using 'Object.create()' method. The prototype of this object is set to passed object. No constructor.

3. ES6 classes  - 'new' opeartor is used to create objects. Instance properties must be defined inside of class method. Basically, here class method contains the properties. object created inherits all the property of the class just like other OOP language.

4. Brute Force Prototype Assignment - we have to set protype for the objects who wants to inherit from parent prototype-> Object.setPrototypeOf(newObject, object)

## Q: Give a short code demonstration of 1 way to create JS inheritance to __inherit__ a method named "purr".
Used Object.create() inheritance method

const sound = {
    purr: function(){
        console.log(`${this.name} says purr`);
    }
};
const cat = Object.create(sound);
cat.name = 'JoJo';
cat.purr();


Used Constructor function inheritance method

const Sound = function(name){
    this.name = name;
};
Sound.prototype.purr = function(){
    console.log(`${this.name} says purr`);
};
const cat = new Sound('JoJo');
cat.purr();

## Q: Give a short code demonstration of a different way to create JS inheritance to __inherit__ a method named "hiss".

Used ES6 classes inheritance method

class Sound{
    constructor(name){
        this.name = name;
    }
    hiss(){
        console.log(`${this.name} says hiss`);
    }
}
const snake = new Sound('cobra');
snake.hiss();

Used Brute Force Prototype Assignment inheritance method

const sound = {
    hiss: function(){
        console.log(`${this.name} says hiss`);
    }
};
const snake = { name: 'Cobra'};
Object.setPrototypeOf(snake,sound);
snake.hiss();


## Q: Explain what a callback is, and give an example.
A Function passed as an argument/parameter to another function is called callback function.  Function which receives callback function as an argument has control over when and how many times to call the callback and what to pass to the callback. Callback helps in reducing complexity by allowing the minimum information code to be written. Thus, callback also helps to make changes easier.

example:

function createRemainder(message, callback){
  var myRem = "Remind me to " + message;
  callback(myRem);
}

function logRemainder(message){
  console.log(message);
}

createRemainder("eat vegetables!", logRemainder);


## Q: What are the words that would correctly fill in the space in this sentence:

"If a function using `this` is `passed to another function(callback)`, then `this` will not have the expected implicit value"

## Q: In CSS, what does it mean "You shouldn't name your classes after what they look like"?   Why?  Give an example of a class that is well named and a class that is poorly named.
The phrase "You shouldn't name your classes after what they look like" means naming a class based on what that object visually appears like to the user. The appearance of the object could be color, shape, size, animation or any visually effect.Naming a class based on appearance would create ambiguity for future references and make the read-ability of the code very hard.

For example, if the button is named based on the size like 'small' button and if there are multiple buttons on the web page, it can create confusion when a new developer looks at this code.
Another bad example would be naming based on color. If 2 classes are named after color 'dark-red' and 'maroon', it can create confusion too.

We should name classes based on their functionality. Thus Naming classes correctly in CSS will make our code easier to read and maintain and also this will become easier to see the relationship between our design components/blocks just by looking at the markup

Example for poorly named:-

.dark-red-button{
  color:dark-red;
}

.maroon-button{
   color:maroon;
}

.button{
  
}

Example for well named:-

.submit-button{
   color:red;
}

.user-display-panel{
  
  height: 300px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-self: start;
}
