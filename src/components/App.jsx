import { Component } from 'react';
import { ImageGallery } from './ImageGallery';
import { Searchbar } from './Searchbar';
import css from './css/app.module.css';

export class App extends Component {
  state = {
    searchQuery: '',
    itemsPerPage: 12,

  };

  onSearch = searchQuery => {
    this.setState({ searchQuery });
  };



  render() {
    return (
      <div className={css.wrapper}>
        <Searchbar onSearch={this.onSearch} />
        <ImageGallery onSubmit={this.state}  />
      </div>
    );
  }
}
