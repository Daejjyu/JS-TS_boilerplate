import "./style.scss";
import Component from "@core/Component";
import Modal from "@components/Modal/index";
import LandingModal from "./LandingModal/index";
import { store, setModalState } from "@src/store";

const templateModal = () => `<div class='modal-wrapper'></div>`;

export default class LandingPage extends Component {
  template() {
    return `
        ${templateModal()}
        `;
  }

  mounted() {
    const $modal = this.$elem.querySelector(".modal-wrapper");
    new Modal($modal, {
      store: store,
      setModalState: setModalState,
      templateModal: LandingModal,
    });
    this.addEvent("click", ".modal-wrapper", this.openModal);
  }

  openModal() {
    const newModalState = "Hello World!";
    store.dispatch(setModalState(newModalState));
  }
}
