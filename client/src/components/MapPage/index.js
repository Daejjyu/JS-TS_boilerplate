import './style.scss'
import Component from '@core/Component.js';
import Header from '@components/Header/index.js';
import Stays from '@components/Stays/index.js';
import MapView from '@components/MapView/index.js'
import Modal from '@components/Modal/index.js'
import templateModalContent from './ModalContent/index.js'
import { store, setModalContent } from '@src/store.js';


const templateHeader = () => `<header class='header'></header>`;
const templateStays = () => `<div class='stays'></div>`
const templateMapView = () => `<div class='map-view'></div>`
const templateSearchResults = () => `
    <section class='search-result'>
        ${templateStays()}
        ${templateMapView()}
    </section>
    `
const templateModal = () => `<div class='modal-wrapper'></div>`

export default class MapPage extends Component {

    template() {
        return `
        ${templateHeader()}
        ${templateSearchResults()}
        ${templateModal()}
        `
    }

    mounted() {
        const $header = this.$elem.querySelector('.header');
        const $stays = this.$elem.querySelector('.stays');
        const $mapView = this.$elem.querySelector('.map-view');
        const $modal = this.$elem.querySelector('.modal-wrapper');
        new Header($header);
        new Stays($stays, { openModal: this.openModal });
        new MapView($mapView, { openModal: this.openModal });
        new Modal($modal, {
            store: store,
            setModalContent: setModalContent,
            templateModalContent: templateModalContent
        });
    }

    openModal({ target }) {
        const id = Number(target.closest('[data-id]').dataset.id);
        const stay = store.getState().stays.filter(v => Number(v.id) === id)[0]
        store.dispatch(setModalContent(stay));
    }
}