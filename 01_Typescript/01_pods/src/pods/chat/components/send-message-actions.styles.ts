import { createStyles, Theme } from "@material-ui/core/styles";

export default (theme: Theme) => createStyles({
  textInput: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 0,
    marginBottom: 0,
    padding: '0.5rem',
    backgroundColor: theme.palette.common.white,
    borderRadius: '5px',
  },
  textInputInner: {
    '&::after, &::before': {
      display: 'none',
    }
  },
  sendButton: {
    marginLeft: '1.5rem',
  },
  sendIcon: {
    fontSize: '2rem',
    marginLeft: '4px',
  },
});
