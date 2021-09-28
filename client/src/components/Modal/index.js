import './style.scss'
import Component from "@core/Component.js";
export default class Modal extends Component {

  template() {
    const { store, templateModalContent } = this.props
    const modalContent = store.getState().modalContent
    if (modalContent) {
      return `
      <div class="modal">
        <div class="modal__content">
          ${templateModalContent(modalContent)}
        </div>
      </div>`
    }
    else
      return ``
  }

  mounted() {

  }

  setEvent() {
    const { store, setModalContent } = this.props
    this.addEvent('click', '.modal', ({ target }) => {
      const isOutModal = target.closest('.modal__content') ? false : true;
      if (isOutModal) store.dispatch(setModalContent(null));
    })
  }
}