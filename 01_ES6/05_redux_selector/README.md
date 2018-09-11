# Intro

In this new sample, let's demonstrate the value of using `reselect` as an interface to access our redux store in a memoized fashion. With memoized selectors we can compute derived data from the store in a very efficient way as every result is cached (selectors are not recomputed unless one of its arguments changes). This means, sucessive calls to the same selector with the same arguments are served immediately. Great for expensive calls, right?

For this sample, we are going to add a new functionality to our chat: message search. For that purpose, we must create a few things first.

You can start from the previous sample: 04_redux_saga.

# Steps

- Let's create a new component to search in our chat log. You can add the following new files:

_./src/pages/chat/components/chat-search.component.jsx_
```javascript
import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { withStyles } from '@material-ui/core';
import styles from './chat-search.styles';
 
 
const ChatSearchInner = (props) =>
  <div className={props.classes.container}>
    <SearchIcon className={props.classes.searchIcon}/>
    <TextField
      className={props.classes.textInput}
      InputProps={{
        className: props.classes.textInputInner,
      }}
      id="searchMessage"
      placeholder="Enter your search term"
      value={props.searchTerm}
      onChange={handleChangeSearchTerm(props.onChangeSearchTerm)}
      margin="normal"
    />
  </div>
 
ChatSearchInner.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  onChangeSearchTerm: PropTypes.func.isRequired,
};
 
const handleChangeSearchTerm = (callback) => (e) => callback(e.target.value);
 
 
export const ChatSearch = withStyles(styles)(ChatSearchInner); 
```

_./src/pages/chat/components/chat-search.styles.js_
```javascript
export default (theme) => ({
  container: {
    display: 'flex',
    flexShrink: 0,
    padding: '0 1rem',
    borderBottom: `1px solid ${theme.palette.primary.light}4a`,
  },
  textInput: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 0,
    marginBottom: 0,
    padding: '0.5rem',
    backgroundColor: theme.palette.common.white,
    borderRadius: '5px',
  },
  textInputInner: {
    color: theme.palette.secondary.main,
    '& > input::placeholder': {
      color: theme.palette.grey['400'],
      opacity: 1,
    },
    '&::after, &::before': {
      display: 'none',
    }
  },
  searchIcon: {
    alignSelf: 'center',
    fontSize: '2rem',
    color: theme.palette.grey['400'],
  },
});
```

- Let's expose this new component in our barrel file:

_./src/pages/chat/components/index.js_
```diff
export * from './chat-header.component';
+ export * from './chat-search.component';
export * from './chat-autoscroll.component';
export * from './chat-log.component';
export * from './send-message-actions.component';
```

- Now that we have it ready, go to chat component and add it like this:

_./src/pages/chat/chat.component.jsx_

Import it:
```diff
  SendMessageActions,
  ChatHeaderComponent,
  ChatLogComponent,
- ChatAutoscrollComponent
+ ChatAutoscrollComponent,
+ ChatSearch
} from './components';
import { CardLayout } from '../../common';
import styles from './chat.styles';

```

Add it to the layout:
```diff
            nickname={this.props.sessionInfo.nickname}
            room={this.props.sessionInfo.room}
          />
+         <ChatSearch
+           searchTerm={this.props.searchTerm}
+           onChangeSearchTerm={this.props.onChangeSearchTerm}
+         />
          <CardContent
            component={ChatAutoscrollComponent}
            className={this.props.classes.cardContent}

```

And declare these 2 new properties in PropTypes:
```diff
  onFieldChange: PropTypes.func.isRequired,
  onSendMessage: PropTypes.func.isRequired,
  chatLog: PropTypes.array.isRequired,
+ searchTerm: PropTypes.string.isRequired,
+ onChangeSearchTerm: PropTypes.func.isRequired,
};

```

- We are going to store our `searchTerm` in redux. So, we will need to dispatch a new action to update this `searchTerm` whenever the user types a new term in our search component. So let's go for this new action first:

_./src/common/actionIds.js_
```diff
  MESSAGE_RECEIVED: '[5] Chat message received from socket',
  MESSAGE_LIST_RECEIVED: '[6] Chat message list received from socket',
  SEND_MESSAGE:'[7] Send message to the server',
+ UPDATE_SEARCH_TERM:'[8] Update search term in store',
}
```

_./src/actions/index.js_
```diff
    type: actionIds.SEND_MESSAGE, 
    payload: messageFactory(nickname, room, text),
  });
+
+ export const updateSearchTerm = (searchTerm) => ({
+   type: actionIds.UPDATE_SEARCH_TERM,
+   payload: searchTerm,
+ });

```

- Now, let's create a new reducer to take care of this action and update the `searchTerm` accordingly:

Create this new file:

_./src/reducers/search.js_
```javascript
import { actionIds } from '../common';

const defaultState = () => ({searchTerm: ''});

export const searchReducer = (state = defaultState(), action) => {
  switch (action.type) {
    case actionIds.UPDATE_SEARCH_TERM:
      return handleUpdateSearchTerm(state, action.payload);
  }

  return state;
}

export const handleUpdateSearchTerm = (state, searchTerm) => ({
  ...state,
  searchTerm,
})
```

and combine it with the rest:

_./src/reducers/index.js_
```diff
  import { combineReducers } from 'redux';
  import { sessionInfoReducer } from './session-info';
  import { chatLogReducer } from './chat-log';
+ import { searchReducer } from './search';

  export const reducers = combineReducers({
    sessionInfoReducer,
    chatLogReducer,
+   searchReducer,
  });
```

- Ok, so far we have a `searchTerm` stored in our state. 

- Finally, it is time for the container to provide the `searchTerm` to the chat component and the callback to update this term. But prior to this, we need one more piece. So far, we have a `searchTerm` stored in our state. We need some logic to be able to filter our chat log by this `seachTerm`. Let's implement it at the end of our container bussiness file:

_./src/pages/chat/chat.container.business.js_

```diff
    };
    
    return createSocket(socketParams);        
}
+ 
+ const findInMessage = searchTerm => {
+   const search = searchTerm.toUpperCase();
+   return msg => msg && (
+     msg.text.toUpperCase().includes(search) || 
+     msg.user.toUpperCase().includes(search));
+ }
+ 
+ export const filterChatLogBySearchTerm = (searchTerm, chatLog) => {
+   const searchTrimmed = searchTerm.trim();
+   return chatLog && searchTrimmed ?
+     chatLog.filter(findInMessage(searchTrimmed)) : chatLog;
+ };
```


Now, in `chat.container.jsx` file let's connect everything:

_./src/pages/chat/chat.container.jsx_

Import the action creator and the new filter utility function:
```diff
  import React from 'react';
  import PropTypes from 'prop-types';
  import { messageFactory } from '../../api/chat'
  import { connect } from 'react-redux';
- import { enrollRoomRequest, sendMessage, disconnectRoomRequest } from '../../actions';
+ import { enrollRoomRequest, sendMessage, disconnectRoomRequest, updateSearchTerm } from '../../actions';
  import { ChatComponent } from './chat.component';
  import {
    establishRoomSocketConnection,
    mapApiSingleMessageToViewmodel,
-   mapApiMessagesToViewmodel
+   mapApiMessagesToViewmodel,
+   filterChatLogBySearchTerm
  } from './chat.container.business'

export class ChatContainerInner extends React.Component {

```

We need the filtered chatlog and the `searchTerm` from the store, and also a callback to dispatch the action to update the `searchTerm`:

```diff
  const mapStateToProps = (state) => ({
    sessionInfo: state.sessionInfoReducer,
-   chatLog: state.chatLogReducer,
- })
+   chatLog: filterChatLogBySearchTerm(state.searchReducer.searchTerm, state.chatLogReducer),
+   searchTerm: state.searchReducer.searchTerm,
+ });

  const mapDispatchToProps = (dispatch) => ({
    enrollRoom: (nickname, room) => dispatch(enrollRoomRequest(nickname, room)),
    sendMessage: (nickname, room, message) => dispatch(sendMessage(nickname, room, message)),
    disconnect: () => dispatch(disconnectRoomRequest()),
+   updateSearchTerm: (searchTerm) => dispatch(updateSearchTerm(searchTerm)),
  });

  export const ChatContainer = connect(

```

We have all in place to feed chat component with the 2 missing properties:

```diff
    }
  }
  
+ onChangeSearchTerm = (newSearchTerm) => {
+   this.props.updateSearchTerm(newSearchTerm);
+ }

  render() {
    const { sessionInfo } = this.props;
    return (
      <React.Fragment>
        <ChatComponent
          sessionInfo={sessionInfo}
          enrollRoom={this.enrollRoom}
          disconnectFromRoom={this.disconnectfromRoom}
          currentMessage={this.state.currentMessage}
          onFieldChange={this.onFieldChange}
          onSendMessage={this.onSendMessage}
          chatLog={this.props.chatLog}
+         searchTerm={this.props.searchTerm}
+         onChangeSearchTerm={this.onChangeSearchTerm}
        />
      </React.Fragment>
    );
```

- OK, so far so good. Please, do a quick test and make sure you have a search input box in your chat and it works correctly, cool right? 

- Next step, let's go for the selector. Install `reselect` library like this:

```
npm install --save reselect
```

- First of all, let's create a selector file and also move some logic needed by our new selector out of the chat component. The idea behind this is to avoid coupling the component with the shape of our store. Selectors will be our interface instead, and they should be located near the store (which relates to) along with its business logic.

Move chat filter functionality to a new selector business file:

_./src/pages/chat/chat.container.business.js_
```diff
    return createSocket(socketParams);        
}

- const findInMessage = searchTerm => {
-   const search = searchTerm.toUpperCase();
-   return msg => msg && (
-     msg.text.toUpperCase().includes(search) || 
-     msg.user.toUpperCase().includes(search));
- }
- 
- export const filterChatLogBySearchTerm = (searchTerm, chatLog) => {
-   const searchTrimmed = searchTerm.trim();
-   return chatLog && searchTrimmed ?
-     chatLog.filter(findInMessage(searchTrimmed)) : chatLog;
- };
```

_./src/selectors.business.js_
```javascript
const findInMessage = searchTerm => {
  const search = searchTerm.toUpperCase();
  return msg => msg && (
    msg.text.toUpperCase().includes(search) || 
    msg.user.toUpperCase().includes(search));
}

export const filterChatLogBySearchTerm = (searchTerm, chatLog) => {
  const searchTrimmed = searchTerm && searchTerm.trim();
  return chatLog && searchTrimmed ?
    chatLog.filter(findInMessage(searchTrimmed)) : chatLog;
};
```

- Let's create our selector with memoization. `createSelector` utility allows to do so by passing a list of input arguments and a transformation function. Note that the input arguments are, in turn, selectors as well.

_./src/selectors.js_
```javascript
import { createSelector } from "reselect";
import { filterChatLogBySearchTerm } from "./selectors.business";

const searchTermSelector = state => state.searchReducer.searchTerm;
const chatLogSelector = state => state.chatLogReducer;
 
export const filteredChatLogSelector = createSelector(
  [searchTermSelector, chatLogSelector],
  filterChatLogBySearchTerm,
);
```

- Finally, use this new selector in our chat component:

_./src/pages/chat/chat.container.jsx_

Import the new selector.
```diff
  import {
    establishRoomSocketConnection,
    mapApiSingleMessageToViewmodel,
    mapApiMessagesToViewmodel,
-   filterChatLogBySearchTerm,
  } from './chat.container.business'
+ import { filteredChatLogSelector } from "../../selectors";
```

```diff
  const mapStateToProps = (state) => ({
    sessionInfo: state.sessionInfoReducer,
-   chatLog: filterChatLogBySearchTerm(state.searchReducer.searchTerm, state.chatLogReducer),    
+   chatLog: filteredChatLogSelector(state),
    searchTerm: state.searchReducer.searchTerm,
  });
```