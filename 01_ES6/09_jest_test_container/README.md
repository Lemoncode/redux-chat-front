# Testing containers

The goal of this sample is to test a container using Jest.

# Steps

- Before we start testing a container component, a bit of new configuration is needed here to make use of `enzyme` capabilities.

Let's add the following new config file:

_./config/test/setupTest.js_
```javascript
const enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

// Setup enzyme's react adapter
enzyme.configure({ adapter: new Adapter() });
```

And update Jest JSON to prepare it for snapshot testing:
_./config/test/jest.json_
```diff
  {
    "rootDir": "../../",
    "testRegex": "\\.spec\\.jsx?$",
    "setupFiles": [
-     "<rootDir>/config/test/polyfills.js"
+     "<rootDir>/config/test/polyfills.js",
+     "<rootDir>/config/test/setupTest.js"
    ],
-   "restoreMocks": true
+   "restoreMocks": true,
+   "snapshotSerializers": [
+     "enzyme-to-json/serializer"
+   ]
  }
```

- Let's test `lobby.container.jsx` container. For that purpose, create a spec file with the following content (do not forget to label it with `jsx` extension):

_./src/pages/lobby/lobby.container.spec.jsx_
```javascript
import * as React from 'react';
import { shallow } from 'enzyme';
import { LobbyContainer } from './lobby.container';

describe('pages/lobby/lobby.container.jsx tests', () => {
  it('should render as expected', () => {
    // Arrange

    // Act

    // Assert
  });
});
```

- Now, we are going to implement a snapshot test which will mount and compare the component against a serialized version of it.

_./src/pages/lobby/lobby.container.spec.jsx_
```diff
    // Arrange

    // Act
+   const component = shallow(
+     <LobbyContainer />,
+   );

    // Assert
 +  expect(component).toMatchSnapshot();
  });
```

- Run this test and see how it fails. We need to provide Redux store, which is the source of data for the container. Let's use `redux-mock-store` again:

_./src/pages/lobby/lobby.container.spec.jsx_
```diff
  import * as React from 'react';
  import { shallow } from 'enzyme';
+ import configureStore from 'redux-mock-store';
  import { LobbyContainer } from './lobby.container';
+  import * as actionCreators from '../../actions';

+ const getMockStore = configureStore();

  describe('pages/lobby/lobby.container.jsx tests', () => {
-   it('should render as expected', () => { 
+   it('should render as expected passing state', () => {
      // Arrange
+     const state = {}
+     const store = getMockStore(state);

      // Act
      const component = shallow(
        <LobbyContainer />,
+       {context: {store}}
      );

      // Assert
      expect(component).toMatchSnapshot();
    });
  });
```

- See how, in principle, state is empty cause our container does not require any specific field from the store.

- Let's also test that the correct action is dispatched when calling `fireSessionEnrollRequest` property of the container:

_./src/pages/lobby/lobby.container.spec.jsx_
```diff
    });

+   it(`should call canEnrollRequest action creator when 
+       calling fireSessionEnrollRequest prop`, () => {
+     // Arrange
+     const nickname = 'test nickname';
+     const room = 'test room';
+     const state = {};
+     const store = getMockStore(state);
+     const actionCreatorStub = jest.spyOn(actionCreators, 'canEnrollRequest')
+         .mockImplementation(() => ({
+           type: 'test action type',
+         }));
+      
+     // Act
+     const component = shallow(
+       <LobbyContainer />,
+       {context: {store}}
+     );
+     component.prop('fireSessionEnrollRequest')(nickname, room);
+
+     // Assert
+     expect(actionCreatorStub).toHaveBeenCalledWith(nickname, room);
+   });
  });
```