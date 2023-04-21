import { Component } from 'react';
import css from './css/imageGallery.module.css';
import { Modal } from './modal';

export class ImageGalleryItem extends Component {
  state={
    modal:false,
  }


  onClickImage = e => {
    e.preventDefault();
    this.setState({modal:true})
  };
  render() {
    const { webformatURL, name, largeImageURL } = this.props.collection;
    return (
      <>
      <a
        href={largeImageURL}
        onClick={this.onClickImage}
        className={css.gallery__link}
      >
        <img src={webformatURL} alt={name} className={css.gallery__image} />
      </a>
        {this.state.modal&&<Modal largeImg={largeImageURL} />}
      </>
    );
  }
}
