import { createStyles, Theme } from "@material-ui/core/styles";

export default (theme: Theme) => createStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  messageContainer: {
    maxWidth: '75%',
    padding: '0.25rem 2rem 0.25rem 0.75rem',
    margin: '0.25rem 0',
    borderRadius: '5px',
    backgroundColor: theme.palette.grey['100'],
  },
  highlight: {
    alignSelf: 'flex-end',
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.light,
  },
  messageUser: {
    color: 'inherit',
  },
  messageText: {
    color: 'inherit',
  }
});
