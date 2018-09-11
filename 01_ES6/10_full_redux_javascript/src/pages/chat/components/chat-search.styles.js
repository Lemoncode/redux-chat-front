export default (theme) => ({
  container: {
    display: 'flex',
    flexShrink: 0,
    padding: '0 1rem',
    borderBottom: `1px solid ${theme.palette.primary.light}4a`,
  },
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
    color: theme.palette.secondary.main,
    '& > input::placeholder': {
      color: theme.palette.grey['400'],
      opacity: 1,
    },
    '&::after, &::before': {
      display: 'none',
    }
  },
  searchIcon: {
    alignSelf: 'center',
    fontSize: '2rem',
    color: theme.palette.grey['400'],
  },
});