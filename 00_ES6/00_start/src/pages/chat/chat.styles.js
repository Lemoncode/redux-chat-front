export default (theme) => ({
  card: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
  },
  cardContent: {
    flex: 1,
    overflowX: 'auto',
  },
  cardActions: {
    padding: '1rem 1.5rem',
    backgroundColor: `${theme.palette.primary.light}4a`,
  }
});
