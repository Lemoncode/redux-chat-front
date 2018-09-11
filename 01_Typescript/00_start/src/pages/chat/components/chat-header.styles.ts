import { createStyles, Theme } from "@material-ui/core/styles";

export default (theme: Theme) => createStyles({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.palette.primary.main,
  },
  homeButton: {
    margin: '0 0.5rem',
  },
  homeIcon: {
    width: '2rem',
    height: '2rem',
    color: theme.palette.primary.contrastText,
  },
  roomTitle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0.25rem 1rem 0.5rem',
    color: theme.palette.primary.contrastText,    
  },
  roomIcon: {
    width: '2rem',
    height: '2rem',
    marginRight: '0.5rem',
    marginTop: '0.65rem',
  },
  userTitle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 1rem',
    color: theme.palette.primary.contrastText,
  },
  userIcon: {
    marginRight: '0.5rem',
  },
});
