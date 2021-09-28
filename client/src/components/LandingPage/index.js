import './style.scss'
import Component from '@core/Component.js';
import Modal from '@components/Modal/index.js'
import LandingModal from './LandingModal/index.js'
import { store, setModalState } from '@src/store.js';

const templateModal = () => `<div class='modal-wrapper'></div>`

export default class MapPage extends Component {

    template() {
        return `
        ${templateModal()}
        `
    }

    mounted() {
        const $modal = this.$elem.querySelector('.modal-wrapper');
        new Modal($modal, {
            store: store,
            setModalState: setModalState,
            templateModal: LandingModal
        });
        this.addEvent('click', '.modal-wrapper', this.openModal)
    }

    openModal() {
        const newModalState = 'Hello World!'
        store.dispatch(setModalState(newModalState));
    }
}