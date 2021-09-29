import "./style.scss";
import Component from "@core/Component";
export default class Modal extends Component {
  template() {
    const { store, templateModal } = this.props;
    const modalState = store.getState().modalState;
    if (modalState) {
      return `
      <div class="modal">
        <div class="modal__content">
          ${templateModal(modalState)}
        </div>
      </div>`;
    } else return ``;
  }

  mounted() {}

  setEvent() {
    const { store, setModalState } = this.props;
    this.addEvent("click", ".modal", ({ target }) => {
      const isOutModal = target.closest(".modal__content") ? false : true;
      if (isOutModal) store.dispatch(setModalState(null));
    });
  }
}
