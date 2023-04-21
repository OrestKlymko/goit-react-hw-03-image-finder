import { Component } from 'react';
import * as basicLightbox from 'basiclightbox';

export class Modal extends Component {

  // componentDidMount() {
  //   console.log('mount');
  //   window.addEventListener('keydown', this.handlerKeydown);
  // }


  componentWillUnmount() {
    console.log('unmount');
    window.removeEventListener('keydown', this.handlerKeydown);
  }

  handlerKeydown = e => {
    if (e.key === 'Escape') {
      console.log('ss')
      // basicLightbox.create(
      //   `
      //       <img src="" width="800" height="600" />`
      // ).close()
    }
  };

  render() {
    const {largeImg} = this.props

 return  basicLightbox.create(
      `
            <img src="${largeImg}" width="800" height="600" />`
    ).show()}

}
