import { Component } from 'react';
import css from './css/imageGallery.module.css';

export class ImageGalleryItem extends Component {
  onClickImage = e => {
    e.preventDefault();
  };
  render() {
    const { webformatURL, name, largeImageURL } = this.props.collection;
    return (
      <a
        href={largeImageURL}
        onClick={this.onClickImage}
        className={css.gallery__link}
      >
        <img src={webformatURL} alt={name} className={css.gallery__image} />
      </a>
    );
  }
}
