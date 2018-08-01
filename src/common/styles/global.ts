import { injectGlobal } from 'emotion';

// Custom fonts from Google api. Just add an import like the one above to inject global.
// @import url("https://fonts.googleapis.com/css?family=Montserrat:300,400,600");

// tslint:disable-next-line:no-unused-expression
injectGlobal`
  html, body, #root {
    margin: 0;
    padding: 0;
    height: 100%;
  }
`;
