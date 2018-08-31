# Testing actions

The goal of this sample is to test an action using Jest.

# Steps

- Let's test `storeSessionInfo` action. This is a synchronous action so the test is simple. Just check that the action creator returns the correct action.

Create a spec file in action folder with the following content:

_./src/actions/index.spec.js_
```javascript
import { actionIds } from '../common';
import { storeSessionInfo } from './index';

describe('actions/index storeSessionInfo tests', () => {
  it('should create an action with proper type and payload', () => {
    // Arrange
    const nickname = 'test nickname A';
    const room = 'test room';
    const expectedAction = {
      type: actionIds.SETUP_SESSION_INFO,
      payload: { nickname, room },
    }
   
    // Act
    const createdAction = storeSessionInfo(nickname, room);

    // Assert
    expect(createdAction).toEqual(expectedAction);
  });
});
```

- Let's deal with an asynchronous action this time: `canEnrollRequest`. It involves an API call and also dispatching another actions. First of all let's test that the API function `canEnrollRoom` is called from within `canEnrollRequest` with the proper arguments:

_./src/actions/index.spec.js_
```diff
+ import configureStore from 'redux-mock-store';
+ import reduxThunk from 'redux-thunk';
  import { actionIds } from '../common';
  import { storeSessionInfo, canEnrollRequest } from './index';
+ import * as api from '../api/rooms';

+ const middlewares = [reduxThunk];
+ const getMockStore = configureStore(middlewares);

...

+ describe('actions/index canEnrollRequest tests', () => {
+   it('should call to canEnrollRoom with room and nickname', () => {
+     // Arrange
+     const nickname = 'test nickname B';
+     const room = 'test room';
+     const canEnrollRoomStub = jest.spyOn(api, 'canEnrollRoom')
+       .mockImplementation(() => Promise.resolve(true));
+      
+     // Act
+     const store = getMockStore();
+     store.dispatch(canEnrollRequest(nickname, room));
+
+     // Assert
+     expect(canEnrollRoomStub).toHaveBeenCalledWith(room, nickname);
+   });
+ });
```

- Also, when API is called within `canEnrollRequest` and response is positive, an action should be dispatched to store the session info. Let's make sure it is dispatching it:

_./src/actions/index.spec.js_
```diff
  });

+ it('should dispatch a storeSessionInfo action if response from API is positive', () => {
+   // Arrange
+   const nickname = 'test nickname C';
+   const room = 'test room';
+   jest.spyOn(api, 'canEnrollRoom').mockImplementation(() => ({
+     then: function(callback) {
+       callback(true);
+       return this;
+     },
+   }));
+    
+   // Act
+   const store = getMockStore();
+   store.dispatch(canEnrollRequest(nickname, room));
+
+   // Assert
+   const expectedAction = store.getActions()[0];
+   expect(expectedAction).toBeTruthy();
+   expect(expectedAction.type).toEqual(actionIds.SETUP_SESSION_INFO);
+   expect(expectedAction.payload).toEqual({nickname, room});
+ });
});
```

- However, the previous test is completely synchronous as we have mocked our API call in a synchronous way. But API calls use to be asynchronous right? So let's be more realistic by simulating an intentional delay like this:

_./src/actions/index.spec.js_
```diff
    jest.spyOn(api, 'canEnrollRoom').mockImplementation(() => ({
      then: function(callback) {
-       callback(true);
+       setTimeout(() => callback(true), 2000);
        return this;
      },
    }));
```

- Now run the tests and see what happens. It fails! The test ends before anything interesting happens (as it has been delayed by 2 seconds). So, we have to make our tests also asynchronous. 

For that purpose, let's make a simple modification in our `canEnrollRequest` asynchronous action: to return the API promise so that the test can track it.

_./src/actions/index.js_
```diff
export const canEnrollRequest = (nickname, room) => (dispatch) => {
- canEnrollRoom(room, nickname).then((succeeded) => {
+ return canEnrollRoom(room, nickname).then((succeeded) => {
    if (succeeded === true) {
```

Finally, let's adapt our test to become asynchronous (this is, to be able to wait for an asynchronous action to happen):

_./src/actions/index.spec.js_
```diff
-   it('should dispatch a storeSessionInfo action if response from API is positive', () => {
+   it('should dispatch a storeSessionInfo action if response from API is positive', async () => {
      // Arrange
      const nickname = 'test nickname C';
      const room = 'test room';
      jest.spyOn(api, 'canEnrollRoom').mockImplementation(() => ({
        then: function(callback) {
          setTimeout(() => callback(true), 2000);
          return this;
        },
      }));
      
      // Act
      const store = getMockStore();
-     store.dispatch(canEnrollRequest(nickname, room));
+     await store.dispatch(canEnrollRequest(nickname, room));

      // Assert
      const expectedAction = store.getActions()[0];
      expect(expectedAction).toBeTruthy();
      expect(expectedAction.type).toEqual(actionIds.SETUP_SESSION_INFO);
      expect(expectedAction.payload).toEqual({nickname, room});
    });
``` 

- Try now to run the test. Everything is working again!

- Another similar test is to check whether navigation is redirected to the chat page:

_./src/actions/index.spec.js_
```diff
  });

+ it('should navigate to chat if response from API is positive', () => {
+   // Arrange
+   const nickname = 'test nickname D';
+   const room = 'test room';
+   jest.spyOn(api, 'canEnrollRoom').mockImplementation(() => ({
+     then: function(callback) {
+       callback(true);
+       return this;
+     },
+   }));
+   const routerPushStub = jest.spyOn(router, 'push');
+    
+   // Act
+   const store = getMockStore();
+   store.dispatch(canEnrollRequest(nickname, room));
+
+   // Assert
+   expect(routerPushStub).toHaveBeenCalledWith('/chat');
+ });
});
```

- Finally, let's ensure there is a log message in case the API denied the enrollment:

_./src/actions/index.spec.js_
```diff
 });

+ it('should call console log if response from API is negative', () => {
+   // Arrange
+   const nickname = 'test nickname D';
+   const room = 'test room';
+   jest.spyOn(api, 'canEnrollRoom').mockImplementation(() => ({
+     then: function(callback) {
+       callback(false);
+       return this;
+     },
+   }));
+   const logStub = jest.spyOn(console, 'log');
+    
+   // Act
+   const store = getMockStore();
+   store.dispatch(canEnrollRequest(nickname, room));
+
+   // Assert
+   expect(logStub).toHaveBeenCalled();
+ });
});
```