# Basic ES6 Concepts

# Arrow functions

Let's check [MDN definition](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions): An arrow function expression has a shorter syntax than a function expression and does not have its own this, arguments, super, or new.target. These function expressions are best suited for non-method functions, and they cannot be used as constructors.

Where do we use arrow functions (aka fat arrow):
  - When we invoke a function as a callback and we don't want to loose our reference to 'this'.
  - When we want a shorter way to define a function.

Let's compare sintax writing a function

_ES5 style:_

```javascript
function sum(a, b) {
  return a + b;
}

const result = sum(a,b);
console.log(result);
```

_Using arrow functions_

```javascript
const sum = (a, b) => a + b;

const result = sum(a,b);
console.log(result);
```

Where are the return statement and curly braces? That's another shorthand but can become tricky:

- If we have several lines of code we have to use return.

```javascript
const displaySomeLines = (a, b) => {
  console.log('Hello from line one');
  const result = a + b;
  console.log(result);

  return result;
}
```

- If we just want to return something we don't need to use return.

```javascript
// Same as return a+b
const sum = (a, b) => a + b;
```

- BUT if we are in the previous case but we want to return an object we MUST enclose it in parenthesis (to let )

```javascript
const createEmptyClient() => ({
  id: 1,
  name: 'John',
  lastname: 'Doe',
})
```

The code above does exactly the same as:

```javascript
const createEmptyClient() => {
  return {
    id: 1,
    name: 'John',
    lastname: 'Doe',
  }
}
```

Real usage:

- When we want to create a function that will be consumen by a given event and we want to avoid loosing 'this'
on a component class when you want to keep _this_ (yes, using fat arrow on a class method, thanks to Babel).

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

This work in the same way as using _bind_

Old school code:

```javascript
class MyPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { nickname: ''};

    this.onNickNameChange = this.onNickNameChange.bind(this);
  }

  onNickNameChange(e) => {
    this.setState({ nickname: e.target.value })
  }


  render() {
    return (
  		<input value={this.state.nickname} onChange={this.props.onNickNameChange}/>    
		);
  }
}
``` 

- On Redux, when you create action creators to write less code.

This 'cool code'

```javascript
const fetchMembersCompleted = (members: MemberEntity[]) => ({
  type: actionTypes.FETCH_MEMBERS_COMPLETED,
  payload: members,
});
```

Is equivalent to old school version:

```javascript
function fetchMembersCompleted(members: MemberEntity[]) {
  return {
    type: actionTypes.FETCH_MEMBERS_COMPLETED,
    payload: members,
  };
}
```


- On Redux, when you use mapDispatchToProps to write less code.

This 'cool code'

```javascript
const mapDispatchToProps = (dispatch) => ({
  fetchMembers: () => dispatch(fetchMembersAction()),
});
```

Is equivalent to this verbose implementation (prone to errors):

```javascript
const mapDispatchToProps = (dispatch) => {
  return {
    fetchMembers: () => {
      dispatch(fetchMembersAction()),
    }
  }  
});
```

# Object Literal Propery Value Shorthand

When we construct an object we use to assign key-value pairs, but if the name
of the property to assign corresponds with the name of the variable that holds the value
we can take a short hand.

## Example

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

## Real usage

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

# map

Some times we need to iterate over an array of values and return a new array with exactly the same amount of items and
some transformations applied.

## Example

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

## Real usage

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

# Destructuring

Destructuring on object lets you bind variables to different properties of an object (you can apply destrucring on arrays as well, but we will focus on objects).

## Example

How this works

_Using the old way_

```
const clientA = {
  id: 23,
  name: 'John',
  lastname: 'Doe',
  country: 'United States'  
}

const displayName(client) {
  console.log(client.name);
}

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

const displayName({name}) {
  console.log(name);
}

displayName(clientA);
```
So you get like a variable called 'name' (client's property) including the
value of _clientA.name_

Why this? It helps simplifying your code, and add _documentation_ e.g. imagine
you are passing _Window_object but you only want to use one or two properties
of this object, you can use destructuring, the next developer that will read your
code can quickly check which properties of _Window_ are being used without 
having to traverse through all the functin code.

## Real usage

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

_using destructuring_

Stateless components:

_old way_

Stackblitz:

_using destructuring_

Stackblitz:

Another sample of real usage applies when using import, when you just want
to import a function or entry of a given module you can apply destructuring_

_old way_

_using destructuring_

By using this approach you avoid introducing typos when replicating name of
modules or functions.

# Spread operator

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
## Real usage

You will see this a lot in reducers:

** Sample

Another interesting usage of spread operator is assigning props from a parent component to a child component.

Let's say we have a parent component with 5 properties, and we want to pass down that five properties to a child component.

We could go the tedious way:

Or we could use spread operator:

> Remark, this can be dangerous because you end up passing props that maybe could not match (no control over that), this
is used whenever you create an Hoc.


# Currying

There is a way to reduce functions of more than one argument to functions of one argument, a way called currying after Haskell B. Curry.

Currying is a process to reduce functions of more than one argument to functions of one argument with the help of lambda calculus.

Let's see a dumb sample, compare a normal sum function and convert it to a currified function:

Ok, so now we can create things like...

This doesn't look quite useful, but on real scenarios it starts to make sense.

Let's think about a color picker, where we have red, green and blue components, and let's say we want to handle and assign this value,
in a non currified way we could do something like:

*** Three handlers


But we have three callbacks that are doing near the same thing, wouldn't it be nice to pass the name of the colorpicker component?
BUUUT the input handler has it's own params and we cannot change them, we could just currify this: create a function where you inform
the color key name, and return another function that contains the standar event signature, this code could just remain like:

*** New code

