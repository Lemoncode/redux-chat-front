import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom'
import {ChatComponent} from './chat.component';

class ChatContainerInner extends React.Component {
  constructor(props) {
    super(props);
    // Temporary data meanwhile we get the sockets up and running
    this.state = { nickname: '', 
                   chatLog: [
                     {
                       id: '0',
                       nickname: 'John',
                       message: 'Howdy !'
                     },
                     {
                      id: '1',
                      nickname: 'Peter',
                      message: 'Hi !'
                     },
                     {
                      id: '2',
                      nickname: 'Peter',
                      message: 'As much of that as can happen is good, because eventually it will help build a regional economy. '
                     },
                     {
                      id: '3',
                      nickname: 'John',
                      message: `At just 32, Mr. Kavanaugh had wrapped up a three-year stint working for his mentor, Ken Starr, on the sprawling Whitewater investigation of President Bill Clinton. The inquiry was finally winding down, and Mr. Kavanaugh believed it was in some ways deeply flawed, telling an audience at Georgetown University Law Center, “It makes no sense at all to have an independent counsel looking at the conduct of the president.`
                    },
                    {
                      id: '4',
                      nickname: 'Peter',
                      message: `For nearly seven months, Mr. Kavanaugh, now President Trump’s nominee to replace Justice Kennedy on the Supreme Court, worked for Mr. Starr once again, despite his objections, helping to assemble the case that the president had an affair with Monica Lewinsky and obstructed justice by trying to cover it up. It was Mr. Kavanaugh who pressed Mr. Starr to aggressively question Mr. Clinton on the details of his sexual relationship with Ms. Lewinsky and who drafted the section of Mr. Starr’s report to the House that laid out 11 possible grounds for Mr. Clinton’s impeachment.`
                    }
                  ], 
                   currentMessage: '' };
  }

  onFieldChange = (id) => (value) => {
    this.setState({ [id]: value })
  }

  render() {
    return (
      <ChatComponent
        nickname={this.state.nickname}
        chatLog={this.state.chatLog}
        currentMessage={this.state.currentMessage}
        onFieldChange={this.onFieldChange}
      />
    );
  }
}

export const ChatContainer = withRouter(ChatContainerInner);

ChatContainer.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  })
}

