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
    const nickname = 'test nickname';
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
+     const nickname = 'test nickname';
+     const room = 'test room';
+     const canEnrollRoomStub = jest.spyOn(api, 'canEnrollRoom')
+       .mockImplementation(() => Promise.resolve());
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
