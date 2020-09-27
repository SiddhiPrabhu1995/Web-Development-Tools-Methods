# Exam 3 Questions

* Answers should be roughly 2-5 sentences, and in your own words.  
* Some questions ask for a code sample - keep them short and to the point.
* Be sure to be clear - be careful not to use vague pronouns like "it" if I can't be completely sure what "it" is.
* I cannot assume knowledge you don't demonstrate, so be clear and explicit.

* NOTE: Because there is no coding portion to Exam 3, each of these questions is worth more to your grade than the questions on previous Exams!  Be sure to have answers you are confident shows your understanding!

## Q1: I have said that React JSX components are like functions and follow many of the same best practices.  Give at least 2 such best practices that are good for both JS functions and JSX Components.  (Be substantive!)
1. The JSX components and JS functions should be small, resuable and which can be easier to modify, understand and test.
2. Separation of Concern logic should be implemented to keep stateful data-loading separate from stateless rendering logic.Props are used to access the data.
3. The components should not know about the outer state. One function should have one purpose and name the component according to it's function.

## Q2: I have said that using Progressive Enhancement (supporting both MPA and SPA) is best, but many places don't do so because of the effort involved.  What is at least one major reason not to use SPA alone?
1. If SPA is used without Progressive Enhancement than the page loading is slow. The application's HTML, CSS and scripts files are not separately written due to which everything loads at once and the application looks less responsive. When the files are separately written, then on initial load the HTML and CSS files are loaded first and the scripts are accessed at the end. Hence the application is more responsive and page loading is faster.
2. If SPA is used alone than application's performance is quite low as compared to Progressive Enhancement used in Single Page Application which provides improved performance and fault tolerance. Example:- HTML loads while the referenced scripts fail to load due to an issue. Progressive Enhancement helps to load and show the basic HTML content till the scripts are loaded again.
3. preventDefault on form submissions, link navigation and button clicks to validate data before submitting and prevents to store unnecessary data in the application.

## Q3: The "proxy" setting in your package.json is required for the create-react-app dev server to call a local service, but not if you are calling a service that will always be on a different domain.  Explain what happens (in terms of network traffic) when your dev server is running on localhost port 3000 and the page makes a call to `/service` when you have "proxy" set to `http://localhost:4000` and a server running on localhost port 4000 that has the `/service` service.  hint: This should list and describe multiple request/response steps, and be clear where the request is coming from and where the response is received.
1. Browser makes a request to localhost:3000/service dev server and try to fetch the service call. The dev server does not know about the service call.
2. Since the service call does not exist the dev server proxy's the request to server-> localhost:4000/service.
3. The proxy server will fetch the data and send response to dev server (localhost:3000).The dev server will send response back to the browser.
4. The requests are now made from dev server -> localhost:3000 to service+static server ->localhost:4000 and the proxy server is set, so in this case the browser will not throw any cross origin resource sharing errors.

## Q4: Follow-up: Using the above scenario, list and describe what the network calls are like after you run `npm run build` and are only running all of your content on localhost port 4000 when your JSX makes a call to `/service`
1. After running 'npm run build' command a build directory is created with production build of an application.
2. Start the server on PORT 4000 and it will load static files from build directory as the page loads for the first time.
3. The browser requests and make a call to '/service' and the server fetch's the data and send the response back to browser and all request and response happens on PORT 4000.

## Q5: I have said that you can only pass data "down" in React, not "up".  What does that mean?  Give simple code sample if that makes it easier to describe.
1. Components can pass data "down" to descendants as props i.e from parent to child.
2. Props cannot be passed up to the parent. Descendants can communicate "up" via callbacks.
3. Components props are the state of the parent components
4. In the below code example, the score is passed from Quiz to Result component as props. The Result component then renders the html with score included in it.

```js
 const Quiz = () => {
    return (
      <Result score={score} />
    );
  };

const Result = ({score}) => (
    
    <div className="score-board">
        <div className="score">You scored {score} / 5 correct answers!</div>
    </div>
);

export default Result;
```

## Q6: Follow-up: If you can't pass data "up" the component tree, how can anything that is "down" change data?  Give simple code samples if that makes it easier to describe.
1. Descendants can communicate "up" via callbacks.
2. Class based components have state and "lifecycle methods" whereas function based components have hooks.
3. In function based components using state, data can be sent down to descendants along with a callback function which is used to update the ancestor components state.
4. In the example mentioned below, the Quiz component passes down the function as props to the Button component.
5. 'On click' event of button, the Button component calls the onClick function passed by the parent.
6. When the Quiz component recieves the callback function, it changes the state and all the components who uses the quiz state will be rendered according to the state variable.

```js
const Quiz = () => {
  const [quiz, setQuizState] = useState({
        score: 0,
        isGameOver: false
    });


  const playAgain = () => {
    setQuizState({...quiz,
            score: 0,
            isGameOver: false
            });
  };

   return (
    <div>
      <Result score={score} />
      <Button onClick={playAgain} />
    </div>
    );

};
```

```js
const Result = ({score}) => (
    
    <div className="score-board">
        <div className="score">You scored {score} / 5 correct answers!</div>
    </div>
);
```

```js
const Button = ({ onClick }) => {
  return <button onClick={onClick}>Click Me</button>;
};
```

## Q7: Imagine you have a collection of student records, with each having a student id, a name, and an address. (an example of one item in the collection would be: { id: "654321", name: "Bao", address: "123 Main Street" })  Imagine you also have collection of steps to create a pizza, with each step having an ingredient, a quantity, and an instruction. (an example of one item in the collection would be the object { qty: "1 cup", ingredient: "shredded cheese", instructions: "sprinkle over pizza" })

Give a code sample where each collection is shown with at least one more element (2+ students for the first collection, 2+ pizza-making steps).  Make sure you make proper use of arrays and objects.  Explain why you've chosen each way of making a collection (e.g. Why you use an array for one or both, or why you use an object for one or both)

Student Record:-
1. Objects are arrays list of key-value pair.
2. Here, student information is stored in the form of object of objects.
3. Student record can be retrieved by using the key value easily.
4. For example:- If I want student data with '654321' I can easily compare with the key value and get the student data.

```js
const students = {
  '884321': {
    id: '884321',
    name: 'Sid',
    address: '567 Park Drive',
  },
  '786543': {
    id: '786543',
    name: 'Clinton',
    address: '156 Parker Hill',
  },
  '545467': {
    id: '545467',
    name: 'James',
    address: '996 Bolyston Street',
  },
};
```

Pizza Making:-

1. Array list of objects is used to store pizza making steps. 
2. For this collection, it is required to retrieve data in order.
3. For example, In order to make pizza proper steps should be followed in order and thus array list of objects is used. We cannot add oregano first and last cheese. Cheese should be added first, than sauce followed by Oregano.
```js
const pizza = [
  {
    quantity: '1 cup',
    ingredients: 'shreded cheese',
    steps: ['sprinkle over pizza'],
  },
  {
    quantity: '4 cup',
    ingredients: 'sauce',
    steps: ['spread over pizza'],
  },
  {
    quantity: '3 table spoon',
    ingredients: 'oregano',
    steps: ['spread over pizza before baking', 'garnish after baking'],
  },
];
```

## Q8: How does inheritance in JS relate to a prototype?  Give a simple code sample if it helps explain.
1. Javascript is a prototype-based language wherein object properties and methods can be shared through objects. 
2. Objects can have inheritance where they access properties of another object.
3. If we are trying to access a property of an object but the property is not defined for the object then it will check the prototype of the object, the prototype of prototype, this will continue till the end of prototype chain. 
4. In below example, name and type are not inherited while the call function is inherited.
5. When 'zebra.call()' gets executed, it will look for call property inside zebra object. There is no such property in Zebra object and then it will search in the parent's prototype. There it finds the property and calls with a `this` which gives output as 'Zebra is Herbivorous animal!!'.

```js
function Animal(name, type){
    this.name = name,
    this.type = type,
}
```
```js
const zebra = new Animal('Zebra', 'Herbivorous');

Animal.prototype.call = function () {
  console.log(`${this.name} is ${this.type} animal!!`);
};

zebra.call(); 
```
## Q9: What is wrong about this code sample? `if( !username || username == undefined) { ` be sure to explain why that is wrong.
1. Javascript provides truthy/falsy to compare values which can be used to compare username instead of using undefined.
2. Strict comparison should be used to compare values.
3. In the mentioned example, !username condition has handled all the falsy values like undefined, NaN and null. So 'username == undefined' condition can be avoided.
4. The equality operator compares value even the data type is different.
5. In strict comparison,
a. If operand are of same type and value is same than true  
b. If operands are different type but value is same than false. 

  For example: 
  
  Equality operator:-
  8 == 8 is true 
  '8' == 1 will also give true

  Strict Comparison:-
  8 === 8 is true 
  '8' === 8 will give false
  
## Q10: In your own words, what is decoupling?  What is an example of decoupling in a React app?  Why is this beneficial?
1. In decoupling components are separated.
2. Tightly coupled code is the one where component executes server call, performs business logic on it and performs rendering.
3. If such a tightly coupled code needs to be modified, it is difficult and confusing to make a change. Also, the HTML which renders has no relation with calling the service and executing business logic. Hence, it needs to be separated.
4. In case of decoupled code, it's easier to modify the code.
5. Different code logic will be in different components and one component won't know the business logic used in another compnent.
6. In the below example, we have App, Feedback and Result components.
7. The Feedback component's work is to display whether the answer is correct or no.
8. The Result component's work is to display score and playAgain button after compelting 5 questions.
9. The Feedback component does not know about the other components and it renders the page according to the props that it receives.
10. The Result component also doesnot know about other components it just renders result page which displays score and playagain button.

Example of decoupling in react app:-

```js
function App (props) {
        return (
            <div className= "container">
                <div className= "title">Quiz</div>
                {quiz.responses<5?( 
                <Feedback isCorrect={quiz.isCorrectAnswer}/>): null}
                {quiz.responses === 5 ? (
                <Result score={quiz.score} playAgain={playAgain} />
                ) : null}      
          </div>  
        );}
```

Feedback Component ->
```js
function Feedback(props) {
    if (props.isCorrect === true) {
      return <p className="correctAnswer">Answer is Correct</p>;
    } else if (props.isCorrect === false) {
      return <p className="incorrectAnswer">Answer Is Incorrect</p>;
    } 
    return <div />;
  }
```

Result Component ->
```js
const Result = ({score, playAgain}) => (
    <div className="score-board">
        <div className="score">You scored {score} / 5 correct answers!</div>
        <button className="play-button" onClick={playAgain}>
            Play Again!
        </button>
    </div>
);
```

