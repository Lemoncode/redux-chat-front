import { css } from 'emotion';
import { Theme } from '@material-ui/core/styles';

export const container = (theme: Theme) => css`
  flex: 1;
  background-color: ${theme.palette.background.default};
`;
