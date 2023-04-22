import { Component } from 'react';
import css from './css/loadMore.module.css';

export class LoadMore extends Component {

onLoadMore =()=>{
  const { page } =this.props
  this.props.onLoadMore(page+1)
}

  render() {
    return (
      <div className={css.btnWrapper}>
        <button  className={css.loadMoreBtn} onClick={this.onLoadMore}>
          Load More
        </button>
      </div>
    );
  }
}
