import React from 'react';

export const SessionContext = React.createContext()

export class SessionProvider extends React.Component {
  state = {
     room : '',
     nickname: '',
     setChatSessionInfo: (nickname, room) => {
       this.setState({nickname, room})
     }
   }

   render() {
    return <SessionContext.Provider value={this.state}>
            {this.props.children}
           </SessionContext.Provider>     
   }
 }