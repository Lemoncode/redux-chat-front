import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export class ChatComponent extends React.Component {
  componentWillMount() {
  }

  onChangeTextField = (fieldId) => (e) => {
    this.props.onFieldChange(fieldId)(e.target.value);
  }

  render() {
    return (
      <div>
        <Typography variant="display4" gutterBottom>
          Chat Room
        </Typography>

        <div style={{height:'10rem', overflowY: 'auto'}}>
        {
          this.props.chatLog.map((entry) =>
            <p key={entry.id}>{entry.message}</p> 
          )
        }
        </div>

        <TextField
          id="currentMessage"
          label="Enter your message"
          multiline
          rows="4"
          value={this.props.currentMessage}
          onChange={this.onChangeTextField('currentMessage')}
          margin="normal"
        />
        <Button 
          variant="contained" 
          size="large" 
          color="primary"
          >
          Send
        </Button>

      </div>
    )
  }
}

ChatComponent.propTypes = {
  onFieldChange : PropTypes.func.isRequired,
  chatLog : PropTypes.array.isRequired,
  currentMessage : PropTypes.string.isRequired,
  nickname : PropTypes.string.isRequired,
};