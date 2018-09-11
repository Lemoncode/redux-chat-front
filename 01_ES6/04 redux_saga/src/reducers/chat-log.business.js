export const mapApiSingleMessageToStateModel = (message) => ({
  user: message.user,
  text: message.text,
});

export const mapApiMessagesToStateModel = (messages) => 
  messages.map((msg) => ({
    user: msg.userId,
    text: msg.text,
  }));