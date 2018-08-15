import React from 'react';

export const SessionContext = React.createContext()

export class SessionProvider extends React.Component {
  state = {
     channel : '',
     nickname: '',
     setChatSessionInfo: (nickname, channel) => {
       this.setState({nickname, channel})
     }
   }

   render() {
    return <SessionContext.Provider value={this.state}>
            {this.props.children}
           </SessionContext.Provider>     
   }
 }