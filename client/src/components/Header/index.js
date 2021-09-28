import './style.scss'
import Component from "@core/Component.js";

const templateLogo = () => `<div class="header__logo"></div>`
const templateSearchBar = () => `<div class="header__search-bar">searchbar</div>`
const templateAccountMenu = () => `<div class="header__account-menu"></div>`

export default class Header extends Component {

    template() {
        return `
        ${templateLogo()}
        ${templateSearchBar()}
        ${templateAccountMenu()}
        `
    }

    mounted() {

    }
}