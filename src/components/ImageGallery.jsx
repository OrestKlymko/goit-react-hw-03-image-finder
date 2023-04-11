import { Component } from 'react';
import { ImageGalleryItem } from './ImageGalleryItem.jsx';
import { Loader } from './Loader';
import { Modal } from './modal.jsx';
import { LoadMore } from './LoadMore.jsx';
import css from './css/imageGallery.module.css';
import * as basicLightbox from 'basiclightbox';

export class ImageGallery extends Component {
  state = {
    collection: [],
    loader: false,
    loadMore: false,
    itemsPerPage: 12,
  };
  openImg = largeImageURL => {
    this.setState({ largeImg: largeImageURL.target.src });
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.onSubmit !== this.props.onSubmit ||
      prevState.itemsPerPage !== this.state.itemsPerPage
    ) {
      const { searchQuery } = this.props.onSubmit;
      if (searchQuery.trim().length > 0) {
        this.setState({ loader: true, loadMore: false });
        const URL = `https://pixabay.com/api/?q=${searchQuery}&page=1&key=34338189-e9bdbbc7a13128854f573f779&image_type=photo&orientation=horizontal&per_page=${this.state.itemsPerPage}`;

        fetch(URL)
          .then(r => {
            return r.json();
          })
          .then(data => {
            console.log();
            if (data.total > 0) {
              this.setState({ collection: data.hits, loadMore: true });
            }
          })
          .finally(() => {
            this.setState({ loader: false });
          });
      } else {
        alert('Please, write your text');
      }
    }
  }
  onLoadMore = itemsPerPage => {
    this.setState({ itemsPerPage });
  };

  render() {
    return (
      <div>
        <ul className={css.gallery} onClick={this.openImg}>
          {this.state.collection.map(element => (
            <li className={css.gallery__item} key={element.id}>
              <ImageGalleryItem collection={element} />
            </li>
          ))}
        </ul>
        {this.state.loader && <Loader />}
        {this.state.loadMore && (
          <LoadMore
            onClick={this.onLoadMore}
            onCount={this.state.itemsPerPage}
          />
        )}
        {this.state.largeImg && (
          <Modal>
            {basicLightbox.create(
              `
            <img src="${this.state.largeImg}" width="800" height="600" />`
            )}
          </Modal>
        )}
      </div>
    );
  }
}
