import { createStyles, Theme } from "@material-ui/core/styles";

export default (theme: Theme) => createStyles({
  container: {},
  title: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '0 1rem 0.25rem',
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
  },
  icon: {
    width: '3rem',
    height: '3rem',
    marginRight: '0.5rem',
  },
});
