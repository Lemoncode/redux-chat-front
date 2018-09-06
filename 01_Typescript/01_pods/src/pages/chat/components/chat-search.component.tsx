import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import styles from './chat-search.styles';

interface ChatSearchProps extends WithStyles<typeof styles>{
  searchTerm: string;
  onSearchTermChange: (searchTerm: string) => void;
};

const ChatSearchInner: React.StatelessComponent<ChatSearchProps> = (props) =>
  <div className={props.classes.container}>
    <SearchIcon className={props.classes.searchIcon}/>
    <TextField
      className={props.classes.textInput}
      InputProps={{
        className: props.classes.textInputInner,
      }}
      id="searchMessage"
      placeholder="Enter your search term"
      value={props.searchTerm}
      onChange={handleChangeSearchTerm(props.onSearchTermChange)}
      margin="normal"
    />
  </div>

const handleChangeSearchTerm = (callback) =>
  (e: React.ChangeEvent<HTMLInputElement>) => callback(e.target.value);

export const ChatSearch = withStyles(styles)<ChatSearchProps>(ChatSearchInner);
