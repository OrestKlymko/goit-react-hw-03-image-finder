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
    page: 1,
    showModal:false,
    largeImageURL:null,
  itemsPerPage: 12
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.onSubmit.searchQuery!==this.props.onSubmit.searchQuery
    ) {
      const { searchQuery } = this.props.onSubmit;
      const {itemsPerPage} = this.state;
      this.setState({page:1})
      if (searchQuery.trim().length > 0) {
        this.setState({ loader: true, loadMore: false });
        const URL = `https://pixabay.com/api/?q=${searchQuery}&page=1&key=34338189-e9bdbbc7a13128854f573f779&image_type=photo&orientation=horizontal&per_page=${itemsPerPage}`;

        fetch(URL)
          .then(r =>r.json())
          .then(({totalHits, hits}) => {
            if (totalHits > 0) {
              this.setState({ collection: hits, loadMore: hits.length >= itemsPerPage });
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
  onLoadMore = (page) => {
    this.setState({ page })
    const { searchQuery } = this.props.onSubmit;
    const {itemsPerPage} = this.state;
    const URL = `https://pixabay.com/api/?q=${searchQuery}&page=${page}&key=34338189-e9bdbbc7a13128854f573f779&image_type=photo&orientation=horizontal&per_page=${itemsPerPage}`;

    fetch(URL)
      .then(r =>r.json())
      .then(({ hits }) => {
        if (hits.length >= itemsPerPage) {
          this.setState(prevState => ({
            collection: [ ...prevState.collection, ...hits ],
            loadMore: true
          }));
        }
        else {
          this.setState(prevState => ({
            collection: [ ...prevState.collection, ...hits ],
            loadMore: false
          }));
        }
      })
      .finally(() => {
        this.setState({ loader: false });
      });
  }


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
            onLoadMore={this.onLoadMore}
            page={this.state.page}
          />
        )}
        {this.state.showModal && <Modal getLargeImg={this.state.largeImageURL} modal={this.closeModal}/>}
      </div>
    );
  }
}
