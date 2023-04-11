import { Component } from 'react';
import css from './css/loadMore.module.css';

export class LoadMore extends Component {
  state = {
    itemsPerPage: 12,
  };

  onLoadMore = () => {
    this.props.onClick(this.props.onCount + 12);
  };

  render() {
    return (
      <div className={css.btnWrapper}>
        <button onClick={this.onLoadMore} className={css.loadMoreBtn}>
          Load More
        </button>
      </div>
    );
  }
}
