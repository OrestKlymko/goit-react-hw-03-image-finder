import { Component } from 'react';
import css from './css/modal.module.css'
export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown',this.onClickEsc)
    window.addEventListener('click',this.onClickModal)
  }
  componentWillUnmount() {
    window.removeEventListener('keydown',this.onClickEsc)
    window.removeEventListener('click',this.onClickModal)  }

  onClickEsc = (e)=> {
    if (e.key === 'Escape') {
      this.props.modal({ showModal: false })
    }
  }
  onClickModal = (e)=>{
    const modal = document.querySelector('#modal');
      if(e.target===modal){
        modal.style.display='none'
        this.props.modal({showModal:false })
      }
    }




  render() {
const {getLargeImg} = this.props


 return <div className={css.overlay} id="modal">
   <div className={css.modal}>
     <img src={getLargeImg} alt="" />
   </div>
 </div>

}}
