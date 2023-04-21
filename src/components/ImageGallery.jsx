import { Component } from 'react';
import { ImageGalleryItem } from './ImageGalleryItem.jsx';
import { Loader } from './Loader';
import { LoadMore } from './LoadMore.jsx';
import css from './css/imageGallery.module.css';
import { Modal } from './modal';


export class ImageGallery extends Component {
  state = {
    collection: [],
    loader: false,
    loadMore: false,
    itemsPerPage: 12,
    showModal:false,
    largeImageURL:null,

  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.onSubmit.searchQuery!==this.props.onSubmit.searchQuery||prevState.itemsPerPage!==this.state.itemsPerPage
    ) {
      const { searchQuery } = this.props.onSubmit;
      if (searchQuery.trim().length > 0) {
        this.setState({ loader: true, loadMore: false });
        const URL = `https://pixabay.com/api/?q=${searchQuery}&page=1&key=34338189-e9bdbbc7a13128854f573f779&image_type=photo&orientation=horizontal&per_page=${this.state.itemsPerPage}`;

        fetch(URL)
          .then(r =>r.json())
          .then(data => {
            if (data.total > 0) {
              this.setState({ collection: data.hits, loadMore: true });
            }
            else alert('I can not find image')
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

  getLargeImg=(largeImageURL)=>{
    this.setState({largeImageURL})
    this.setState({showModal:true})
  }

  closeModal=(data)=>{
    this.setState(data)
  }


  render() {
    return (
      <div>
        {this.state.collection&&<ul className={css.gallery} >
          {this.state.collection.map(element => (
              <ImageGalleryItem collection={element} key={element.id} getLargeImg={this.getLargeImg} />
          ))}
        </ul>}
        {this.state.loader && <Loader />}
        {this.state.loadMore && (
          <LoadMore
            onClick={this.onLoadMore}
            onCount={this.state.itemsPerPage}
          />
        )}
        {this.state.showModal && <Modal getLargeImg={this.state.largeImageURL} modal={this.closeModal}/>}
      </div>
    );
  }
}
