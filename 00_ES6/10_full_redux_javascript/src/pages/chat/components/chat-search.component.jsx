import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { withStyles } from '@material-ui/core';
import styles from './chat-search.styles';


const ChatSearchInner = (props) =>
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
      onChange={handleChangeSearchTerm(props.onChangeSearchTerm)}
      margin="normal"
    />
  </div>

ChatSearchInner.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  onChangeSearchTerm: PropTypes.func.isRequired,
};

const handleChangeSearchTerm = (callback) => (e) => callback(e.target.value);

export const ChatSearch = withStyles(styles)(ChatSearchInner);