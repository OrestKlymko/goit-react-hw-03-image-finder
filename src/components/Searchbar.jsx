import { Component } from 'react';
import css from './css/searchbar.module.css';

export class Searchbar extends Component {
  state = {
    searchName: '',
  };
  onSubmitChange = e => {
    e.preventDefault();
    this.props.onSearch(this.state.searchName);
  };

  onInputChange = e => {
    this.setState({ [e.currentTarget.name]: e.currentTarget.value });
  };
  render() {
    return (
      <header className={css.searchbar}>
        <form onSubmit={this.onSubmitChange}>
          <button type="submit" className={css.sbmButton}>
            <span>Search</span>
          </button>

          <input
            name="searchName"
            className={css.input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.onInputChange}
          />
        </form>
      </header>
    );
  }
}
