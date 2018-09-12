export default (theme) => ({
  card: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    maxWidth: '40rem',
    minWidth: '20rem',
  },
  cardActions: {
    padding: '1rem 1.5rem',
    backgroundColor: `${theme.palette.primary.light}4a`,
  }
});
