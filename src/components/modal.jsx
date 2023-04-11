import { Component } from 'react';

export class Modal extends Component {
  state = {
    modal: false,
  };
  componentDidMount() {
    console.log('mount');
    window.addEventListener('keydown', this.handlerKeydown);
  }
  componentWillUnmount() {
    console.log('unmount');
    window.removeEventListener('keydown', this.handlerKeydown);
  }

  handlerKeydown = e => {
    if (e.key === 'Escape') {
      this.props.children.close();
    }
  };

  render() {
    return <div>{this.props.children.show()}</div>;
  }
}
