import './style.scss'
import Component from '@core/Component.js';
import { store } from '@src/store.js'
import { fixedFloat, localeNumber } from '@core/utils.js'
import LoadingSpinner from '@components/LoadingSpinner/index.js';

const OPTION_NAME = { 'guest': '인원', 'bed': '침대', 'bath': '욕실' }
const UNIT_NAME = { 'guest': '명', 'bed': '개', 'bath': '개' }
const templateOption = (guest, bed, bath) => Object.entries({ guest: guest, bed: bed, bath: bath })
    .map(([k, v]) => `${OPTION_NAME[k]} ${v}${UNIT_NAME[k]}`)
    .join(' · ')

const templateRating = (rating) => fixedFloat(rating, 2)
const templatePrice = (price) => localeNumber(price)

const templateSearchInfo = () => `<h4 class='stays__search-info'>300개 이상의 숙소</h4>`
const templateTitle = () => `
    <h3 class='stays__title'>
        지도에서 선택한 지역의 숙소
        <div class='stays__title__loading'></div>
    </h3>
`
const templateStaysList = () => {
    const stays = store.getState().stays
    if (stays.length)
        return `<ul class='stays__list'>${templateStayItems(stays)}</ul>`
    else
        return `
            <ul class='stays__list'>
                검색 결과 없음<br/><br/>
                더 많은 검색 결과를 보려면 날짜/지역을 변경하여 검색해보세요<br/><br/>
                <hr>
            </ul>
            `
}
const templateStayItems = (stays) => stays
    .reduce((acc, item) => acc += templateStayItem(item), '')
const templateStayItem = (item) => `
<li class='stays__item' data-id=${item.id}>
    <div class='info_wrapper'>
        <div class='info_wrapper__img-box'>
            <img class='info_wrapper__img-box__img' src='${item.img}'>
        </div>
        <div class='info_wrapper__info'>
            <div class='top-wrapper'>
                <div class='top-wrapper__text'>
                <div class='top-wrapper__text__type'>${item.location}의 ${item.type}</div>
                <div class='top-wrapper__text__title'>${item.title}</div>
                </div>
                <div class='top-wrapper__wishlist-icon'>🤍</div>
                </div>
                <div class='options'>${templateOption(item.guest, item.bed, item.bath)}</div>
                <div class='bottom-wrapper'>
                <div class='bottom-wrapper__rating'>
                    <div class='icon-star'></div>
                    ${templateRating(item.rating)}
                </div>
                <div class='bottom-wrapper__text'>
                    <div class='bottom-wrapper__text__price-per'>₩${templatePrice(item.price)} / 박</div>
                    <div class='bottom-wrapper__text__price-total'>총액 ₩${templatePrice(item.price)}</div>
                </div>
            </div>
        </div>
    </div>
</li>
`

export default class Stays extends Component {
    template() {
        return `
        ${templateSearchInfo()}
        ${templateTitle()}
        ${templateStaysList()}
        `
    }

    mounted() {
        const $loading = this.$elem.querySelector('.stays__title__loading')
        new LoadingSpinner($loading, { store: store })
    }

    setEvent() {
        const { openModal } = this.props
        this.addEvent('click', '.stays__item', openModal)
        this.addEvent('mouseover', '.stays__item', this.toggleMarker)
        this.addEvent('mouseout', '.stays__item', this.toggleMarker)
    }

    toggleMarker({ target }) {
        const id = Number(target.closest('[data-id]').dataset.id);
        const $marker = [...document.querySelectorAll(`.map-view__marker`)].filter(v => Number(v.dataset.id) === id)[0]
        $marker.classList.toggle('selected')
    }
}