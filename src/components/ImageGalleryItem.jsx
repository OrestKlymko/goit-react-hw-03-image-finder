import { Component } from 'react';
import css from './css/imageGallery.module.css';
// import { Modal } from './modal';

export class ImageGalleryItem extends Component {
  state={
    modal:false,
  }

  onClickImage = largeImageURL => {
    this.props.getLargeImg(largeImageURL)
    this.setState({modal:true})
  };

  render() {
    const { webformatURL, name, largeImageURL } = this.props.collection;
    return (
      <li onClick={()=>this.onClickImage(largeImageURL)}>
        <img src={webformatURL} alt={name} className={css.gallery__image} />
      </li>
    );
  }
}
