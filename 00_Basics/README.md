# Basic ES6 Concepts

## Arrow functions

Let's check [MDN definition](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions): An arrow function expression has a shorter syntax than a function expression and does not have its own this, arguments, super, or new.target. These function expressions are best suited for non-method functions, and they cannot be used as constructors.

Where do we use arrow functions (aka fat arrow):
  - When we invoke a function as a callback and we don't want to loose our reference to 'this'.
  - When we want a shorter way to define a function.

### Real usage

Let's compare sintax writing a function

_ES5 style:_

```javascript
function sum(a, b) {
  return a + b;
}

const result = sum(2,3);
console.log(result);
```

_Using arrow functions_

```javascript
const sum = (a, b) => a + b;

const result = sum(2,3);
console.log(result);
```

Where have gone the return statement and curly braces? That's another shorthand but can become tricky:

- If we have several lines of code we have to use return.

```javascript
const displaySomeLines = (a, b) => {
  console.log('Hello from line one');
  const result = a + b;
  console.log(result);

  return result;
}

displaySomeLines(3,2);
```

- If we just want to return something we don't need to use return.

```javascript
// Same as return a+b
const sum = (a, b) => a + b;
```

- BUT if we are in the previous case but we want to return an object we MUST enclose it in parenthesis(to distinguish between start of functions and returning object).

- Let's take a look to this "old school" code:

```javascript
function createEmptyClient() {
  return {
    id: 1,
    name: 'John',
    lastname: 'Doe',
  }
}

console.log(createEmptyClient());
```


- And how it will work if we just wat to remove the _return_ statement.

> Let's port this step by step

```javascript
const createEmptyClient() => ({
  id: 1,
  name: 'John',
  lastname: 'Doe',
});

console.log(createEmptyClient());
```

- When we want to create a function that will be consumed by a given event and we want to avoid loosing 'this'
on a component class when you want to keep _this_ (yes, using fat arrow on a class method, thanks to Babel).

_Old school code:_

```javascript
class MyPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { nickname: ''};

    this.onNickNameChange = this.onNickNameChange.bind(this);
  }

  onNickNameChange(e) {
    this.setState({ nickname: e.target.value })
  }


  render() {
    return (
  		<input value={this.state.nickname} onChange={this.props.onNickNameChange}/>    
		);
  }
}
``` 

_Using fat arrow:_

```javascript
class MyPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { nickname: ''};
  }

  onNickNameChange = (e) => {
    this.setState({ nickname: e.target.value })
  }


  render() {
    return (
		  <input value={this.state.nickname} onChange={this.props.onNickNameChange}/>    
		);
  }
}
``` 

This works in the same way as using _bind_.


- On Redux, when you create action creators to write less code.

Old school version:

```javascript
function fetchMembersCompleted(members: MemberEntity[]) {
  return {
    type: actionTypes.FETCH_MEMBERS_COMPLETED,
    payload: members,
  };
}
```


Using fat arrow

```javascript
const fetchMembersCompleted = (members: MemberEntity[]) => ({
  type: actionTypes.FETCH_MEMBERS_COMPLETED,
  payload: members,
});
```

- On Redux, when you use mapDispatchToProps to write less code.

Old school, verbose implementation (prone to errors):

```javascript
const mapDispatchToProps = (dispatch) => {
  return {
    fetchMembers: () => {
      dispatch(fetchMembersAction()),
    }
  }  
});
```

Using fat arrow:

```javascript
const mapDispatchToProps = (dispatch) => ({
  fetchMembers: () => dispatch(fetchMembersAction()),
});
```


## Object Literal Property Value Shorthand

When we construct an object we use to assign key-value pairs, but if the name
of the property to assign corresponds with the name of the variable that holds the value
we can take a short hand.

### Example

ES5 style:

```javascript
const id = '2';
const name = 'John';
const lastname = 'Doe';
const cty = 'United States';

// Let's create an object (e.g. we have to setup this object, compile all the info and send it in a post)
const clientEntity = {
  id: id,
  name: name,
  lastname: lastname,
  country: cty  
}
```

ES6 style

```javascript
const id = '2';
const name = 'John';
const lastname = 'Doe';
const cty = 'United States';

// Let's create an object (e.g. we have to setup this object, compile all the info and send it in a post)
const clientEntity = {
  id,
  name,
  lastname,
  country: cty  
}
```

### Real usage

Why is this used? You write less code, avoid introducing typos when typing prop / value, better readiblity.


_Using the old way_

```javascript
const updateClient(value) {
  this.setState({client: value});
}
```

_Using Short hand_

```javascript
const updateClient(client) {
  this.setState({client});
}
```

## map

Some times we need to iterate over an array of values and return a new array with exactly the same amount of items and
some transformations applied.

### Example

A dummy sample, apply a discount to every item in a given array.

_Using the old way_

```javascript
const sales = [340, 434, 23, 100];
// let's apply a 10% discount to each sale

const salesDiscountApplied = [];

for(i = 0;i < sales.length;i++) {
  salesDiscountApplied.push(sales[i]*0.9);
}

console.log("Original array does not mutate", sales)
console.log("New array discount applied", salesDiscountApplied)
```

_Using map_

```javascript
const sales = [340, 434, 23, 100];

// let's apply a 10% discount to each sale
const salesDiscountApplied = sales.map(sale => sale*0.9);

console.log("Original array does not mutate", sales)
console.log("New array discount applied", salesDiscountApplied)
```

Maps loops over each item, applies a funcion to each item and returns a new array including the new results (the original input 
array does not change, we say map is an immutable method the input params do not change and a new array is created with the new
results)

### Real usage

A common usage in React is to transform a set of data in components, for example:
- You get an array containing one shopping item per entry and you want to display
it in a grid.
- You get an array of movies and you want to display a list of cards.

Let's check how to transform a list including movies data into components.

```javascript
import React, { Component } from 'react';
import { render } from 'react-dom';

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: 'React',
      movies: [
        {
          id: 1,
          poster: 'https://m.media-amazon.com/images/M/MV5BNzVlY2MwMjktM2E4OS00Y2Y3LWE3ZjctYzhkZGM3YzA1ZWM2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UX182_CR0,0,182,268_AL_.jpg',          
          name: 'Star Wars'
        },
        {
          id: 2,
          poster: 'https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_UX182_CR0,0,182,268_AL_.jpg',
          name: 'Interstellar'
        },
        {
          id: 3,
          poster: 'https://m.media-amazon.com/images/M/MV5BMmNlYzRiNDctZWNhMi00MzI4LThkZTctMTUzMmZkMmFmNThmXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_UX182_CR0,0,182,268_AL_.jpg',          
          name: '2001: A Space Odyssey'
        },
        
      ]
    };
  }

  render() {
    return (
      <div>
        {
          this.state.movies.map(
            (movie) => 
              <div key={movie.id}>
                <img src={movie.poster}/>
                <h5>{movie.name}</h5>
              </div>
          )
        }
        
      </div>
    );
  }
}

render(<App />, document.getElementById('root'));
```

Full sample can be found: https://stackblitz.com/edit/react-k7kksh

Things to take into consideration, _key_, each react component that we create inside the map statements needs an unique key
(more info: https://stackoverflow.com/questions/28329382/understanding-unique-keys-for-array-children-in-react-js).

## Destructuring

Destructuring on object lets you bind variables to different properties of an object (you can apply destrucring on arrays as well, but we will focus on objects).

### Example

How this works

_Using the ES5 way_

```
const clientA = {
  id: 23,
  name: 'John',
  lastname: 'Doe',
  country: 'United States'  
}

const displayName = (client) => console.log(client.name);


displayName(clientA);
```

_Using destructuring_

```
const clientA = {
  id: 23,
  name: 'John',
  lastname: 'Doe',
  country: 'United States'  
}

const displayName = ({name}) => console.log(name);


displayName(clientA);
```
So you get like a variable called 'name' (client's property) including the
value of _clientA.name_

Why this? It helps simplifying your code, and add _documentation_ e.g. imagine
you are passing _Window_object but you only want to use one or two properties
of this object, you can use destructuring, the next developer that will read your
code can quickly check which properties of _Window_ are being used without 
having to traverse through all the functin code.

### Real usage

A common usage in react is to apply destructuring on render props, instead
of placing everywhere _this.props._ (class component) or _props._ (stateless)
you can apply destructuring, this will allow you _(*)_:
  - Make your code less verbose.
  - Introduce less typos.
  - Swap a component easily from class to function component.

_(*) There's no silver bullet, this solution may noy apply to every scenario_

Code that you will find in real projects

Class components

_old way_

```javascript
export class MyComponent extends React.Component {

  render() {
    return (
      <h1>Hello {this.props.name} {this.props.lastname}!</h1>
    )
  }
}
```

_using destructuring_

```javascript
export class MyComponent extends React.Component {

  render() {
    const {name, lastname} = this.props;
    return (
      <h1>Hello {props.name} {props.lastname}!</h1>
    )
  }
}
```

Stateless components:

_old way_

```javascript
export const = MyComponent({name, lastname}) =>
  <h1>Hello {props.name} {props.lastname}!</h1>
}
```

_using destructuring_

```javascript
export const = MyComponent({name, lastname}) =>
  <h1>Hello {name} {lastname}!</h1>
}
```

Another sample of real usage applies when using import, when you just want
to import a function or entry of a given module you can apply destructuring_

_old way_

```javascript
import React from 'react';

class App extends React.Component {
```


_using destructuring_

```javascript
import React, { Component } from 'react';

class App extends Component {
```

## Spread operator

What MDN says about spread operator: Spread syntax allows an iterable such as an array expression or string to be expanded in places where zero or more arguments (for function calls) or elements (for array literals) are expected, or an object expression to be expanded in places where zero or more key-value pairs (for object literals) are expected.

What common usage can we found: create new objects copying values from a former object.

What's the usage of this approach? If we use immutable structures, whenever a property of a given object gets modified we must
create a new object, Why the hell I want to do this? It's easier to check plus adds rocket performance if an object has changed by checking it's main pointer,than going property by property comparing if any field has changed (including iterating over nested objects).

Let's start with a simple sample.

We want to create a new object based on a default template(let's say by default almost all our clients comes from USA).

_old code_

```javascript
const defaultClient = {
  id: 0,
  name: '',
  lastname: '',
  country: 'United States'
}

const createNewClient() {
  return {
    id: defaultClient.id,
    name: defaultClient.name,
    lastname: defaultClient.lastname,
    country: defaultClient.country
  }  
}
```

_using spreadoperator_

```javascript
const defaultClient = {
  id: 0,
  name: '',
  lastname: '',
  country: 'United States'
}

const createNewClient() {
  return {
    ...defaultClient
  }  
}
```

Let's go one step further, let's say we want to update the field Country:

_old code_

```javascript
const defaultClient = {
  id: 0,
  name: '',
  lastname: '',
  country: 'United States'
}

const createNewClient(country) {
  return {
    id: defaultClient.id,
    name: defaultClient.name,
    lastname: defaultClient.lastname,
    country
  }  
}
```

_using spreadoperator_

```javascript
const defaultClient = {
  id: 0,
  name: '',
  lastname: '',
  country: 'United States'
}

const createNewClient(country) {
  return {
    ...defaultClient,
    country
  }  
}
```

Let's go one step further, what if we want to update any pair of key/value (any property, maybe city, name or lastname)

_old code_

```javascript
const defaultClient = {
  id: 0,
  name: '',
  lastname: '',
  country: 'United States'
}

const createNewClient(propertyName, value) {
  return {
    id: defaultClient.id,
    name: defaultClient.name,
    lastname: defaultClient.lastname,
    country: defaultClient.country,
    [propertyName]: value
  }  
}
```

_using spreadoperator_

```javascript
const defaultClient = {
  id: 0,
  name: '',
  lastname: '',
  country: 'United States'
}

const createNewClient(country) {
  return {
    ...defaultClient,
    [propertyName]: value
  }  
}
```
### Real usage

You will see this a lot in reducers:

```javascript
const myReducer = (state, action) => {
  switch (action.type) {
    case actionsEnums.UPDATE_NICKNAME:
      return {
        ...state,
        nickname: action.payload
      }
    default:
  }
  return state;
};
```

Another interesting usage of spread operator is assigning props from a parent component to a child component.

Let's say we have a parent component with Z properties, and we want to pass down that exact five properties to a child component.

We could go the tedious way:

```javascript
class App extends Component {
  render() {
    return (
      <div>
        <HelloContainer name="John" lastname="Doe" />
      </div>
    );
  }
}

const HelloContainer = (props) =>
  <HelloComponent name={props.name} lastname={props.lastname}/>

const HelloComponent = (props) => 
  <h1>Hello {props.name} {props.lastname} !</h1>
```

Or we could use spread operator:

```javascript
class App extends Component {
  render() {
    return (
      <div>
        <HelloContainer name="John" lastname="Doe" />
      </div>
    );
  }
}

const HelloContainer = (props) =>
  <HelloComponent {...props}/>

const HelloComponent = (props) => 
  <h1>Hello {props.name} {props.lastname} !</h1>
```

Sample: https://stackblitz.com/edit/react-dgxyx5

> Remark, this can be dangerous because you end up passing props that maybe could not match (no control over that), this
is used whenever you create an Hoc.

> Note down you will see this a lot in action when implement High order components.

## Currying

There is a way to reduce functions of more than one argument to functions of one argument, a way called currying after Haskell B. Curry.

Currying is a process to reduce functions of more than one argument to functions of one argument with the help of lambda calculus.

Let's see a dumb sample, compare a normal sum function and convert it to a currified function:

### Sample

A normal sum two number functions

```javascript
const sum = (a, b) => a + b;

console.log(sum(3,2)); // 5
```

Let's currify this function

```javascript
const sum = (a) =>  (b) => a + b;

console.log(sum(3,2)); // Function, does not invoke a + b
console.log(sum(3)(2)); // 5

const incrementByTwo(2);

incrementByTwo(3); // 5
incrementByTwo(6); // 8
```


### Real Usage

This doesn't look quite useful, but on real scenarios it starts to make sense.

Let's think about a color picker, where we have red, green and blue components, and let's say we want to handle and assign this value,
in a non currified way we could do something like:

```javascript
class ColorPicker extends Component {

  constructor() {
    super();
    this.state = {
      red: 10,
      green: 80,
      blue: 20
    };
  }

  onChangeRed = (event) => {
    this.setState({red: event.target.value})
  }

  onChangeGreen = (event) => {
    this.setState({green: event.target.value})
  }

  onChangeBlue = (event) => {
    this.setState({blue: event.target.value})
  }


  render() {
    const divStyle = {
      width: '11rem',
      height: '7rem',
      backgroundColor: `rgb(${this.state.red},${this.state.green}, ${this.state.blue})`
    };    
    
    const {red,green,blue} = this.state;

    return(
      <div>
          <div style={divStyle}>
          </div>            
          <div>
            <input type="range"
              min="0"
              max="255"
              value={red}
              onChange={this.onChangeRed}
            />
            {red}      
          </div>
          <div>
            <input type="range"
              min="0"
              max="255"
              value={green}
              onChange={this.onChangeGreen}
            />
            {green}
          </div>
          <div>        
            <input type="range"
              min="0"
              max="255"
              value={blue}
              onChange={this.onChangeBlue}
            />
            {blue}      
          </div>
      </div>
    );
  }
} 
```
Demo: https://stackblitz.com/edit/react-aevzed

But we have three callbacks that are doing near the same thing, wouldn't it be nice to pass the name of the colorpicker component?
BUUUT the input handler has it's own params and we cannot change them, we could just currify this: create a function where you inform
the color key name, and return another function that contains the standar event signature, this code could just remain like:

```javascript
class ColorPicker extends Component {

  constructor() {
    super();
    this.state = {
      red: 10,
      green: 80,
      blue: 20
    };
  }

  // curry
  onChangeColor = (colorId) => (event) => {
    this.setState({[colorId]: event.target.value})
  }

  
  render() {
    const divStyle = {
      width: '11rem',
      height: '7rem',
      backgroundColor: `rgb(${this.state.red},${this.state.green}, ${this.state.blue})`
    };    
    
    const {red,green,blue} = this.state;

    return(
      <div>
          <div style={divStyle}>
          </div>            
          <div>
            <input type="range"
              min="0"
              max="255"
              value={red}
              onChange={this.onChangeColor('red')}
            />
            {red}      
          </div>
          <div>
            <input type="range"
              min="0"
              max="255"
              value={green}
              onChange={this.onChangeColor('green')}
            />
            {green}
          </div>
          <div>        
            <input type="range"
              min="0"
              max="255"
              value={blue}
              onChange={this.onChangeColor('blue')}
            />
            {blue}      
          </div>
      </div>
    );
  }
} 
```

Demo: https://stackblitz.com/edit/react-lc7ytj?file=index.js 

