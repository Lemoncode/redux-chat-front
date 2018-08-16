

export const messagesToString = (messages) => {
  let content = '';
  
  messages.map((ms) => ({
    user: ms.userId,
    text: ms.text
  })).forEach((mc) => {
    content += `${mc.user}: ${mc.text}\n`;        
  });

  return content;
}