import React from 'react';

export const SessionContext = React.createContext()

export class SessionProvider extends React.Component {
  state = {
    sessionInfo: {nickname: '', room: ''},
    setChatSessionInfo: (nickname, room) => {
       this.setState({sessionInfo: {nickname, room}})
     }
   }

  render() {
    return (
      <SessionContext.Provider value={this.state}>
        {this.props.children}
      </SessionContext.Provider>     
  )};
 };

export const withSessionContext = (Component) => (props) => (
  <SessionContext.Consumer>
    {
      ({ sessionInfo, setChatSessionInfo }) => (
        <Component
          {...props}
          sessionInfo={sessionInfo}
          setChatSessionInfo={setChatSessionInfo}
        />
      )
    }
  </SessionContext.Consumer>
);