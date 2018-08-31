# Testing reducers

The goal of this sample is to test a reducer using Jest.

# Steps

- Let's test `session-info` reducer. Start creating a simple spec file besides it and add a basic test just to make sure it is working:

_./src/reducers/session-info.spec.js_
```diff
+ import { sessionInfoReducer } from './session-info';
+
+ describe('reducers/session-info tests', () => {
+   it('should pass ok', () => {
+     // Arrange
+ 
+     // Act
+ 
+     // Assert
+     expect(true).toBeTruthy();
+   });
+ });
```

Run:
```
npm run test
```

- First test, let's make sure that reducer returns initial state:

_./src/reducers/session-info.spec.js_
```diff
  import { sessionInfoReducer } from './session-info';

  describe('reducers/session-info tests', () => {
-   it('should pass ok', () => {
+   it('should return initial state when passing undefined state and some action type', () => {
      // Arrange
+     const state = undefined;
+     const action = { type: 'some type' };

      // Act
+     const nextState = sessionInfoReducer(state, action);

      // Assert
-     expect(true).toBeTruthy();
+     expect(nextState.nickname).toEqual('');
+     expect(nextState.room).toEqual('');
    });
  });
```

- Secondly, upon an unhandled action, it should return the same state without mutate it:

_./src/reducers/session-info.spec.js_
```diff
  import { sessionInfoReducer } from './session-info';
+ import * as deepFreeze from 'deep-freeze';

...

});

+ it('should return same state without mutate it when passing state and some action type', () => {
+   // Arrange
+   const state = {
+     nickname: 'test nickname',
+     room: 'test room',
+   };
+   const action = { type: 'some type' };
+   deepFreeze(state);
+
+   // Act
+   const nextState = sessionInfoReducer(state, action);
+
+   // Assert
+   expect(nextState.nickname).toEqual('test nickname');
+   expect(nextState.room).toEqual('test room');
+ });
+});
```

_./src/reducers/session-info.spec.js_
```diff

```