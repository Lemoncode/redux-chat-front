# Basic ES6 Concepts

# Arrow functions

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


Full sample can be found:

Things to take into consideration, _key_ 

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

