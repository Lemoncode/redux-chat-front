export default (theme) => ({
  '@global': {
    'body, html, #root': {
      margin: 0,
      padding: 0,
      width: '100%',
    }
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100vw',
    height: '100vh',
    boxSizing: 'border-box',
    minWidth: '34rem',
    padding: '2rem',
    overflow: 'auto',
    backgroundColor: theme.palette.grey['200'],
  }
});
