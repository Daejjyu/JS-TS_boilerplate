import './style.scss'
import { localeNumber } from '@core/utils.js'
const templatePrice = (price) => localeNumber(price)

const templateModalContent = (modalContent) => {
    return `
        <div class='map-page-modal'>
            <div class='map-page-modal__header'>
                <div class='map-page-modal__header__price'>
                    ₩${templatePrice(modalContent.price)}
                </div>
                /박
                <div class='map-page-modal__header__review'>후기 127개</div>
            </div>
            <div class='map-page-modal__condition'>
                <div class='map-page-modal__condition__days'>
                    <div class='condition-box'>
                        <div class='condition-box__key'>체크인</div>
                        <div class='condition-box__value'>2021.5.17</div>
                    </div>
                    <div class='condition-box'>
                        <div class='condition-box__key'>체크아웃</div>
                        <div class='condition-box__value'>2021.6.4</div>
                    </div>
                </div>
                <div class='condition-box'>
                    <div class='condition-box__key'>인원</div>
                    <div class='condition-box__value'>게스트 3명</div>
                </div>
            </div>
            <button class="map-page-modal__reserve-btn" type='button'>예약하기</button>
            <div class='map-page-modal__message'>예약 확정 전에는 요금이 청구되지 않습니다.</div>
            <div class='map-page-modal__price-box'>
                <div class='map-page-modal__price-box__name'>₩${templatePrice(modalContent.price)} x 10/박</div>
                <div class='map-page-modal__price-box__value'>₩${templatePrice(modalContent.price * 10)}</div>
                </div>
            <div class='map-page-modal__price-box'>
                <div class='map-page-modal__price-box__name'>4% 주 단위 요금 할인</div>
                <div class='map-page-modal__price-box__value'>-₩${templatePrice(55948)}</div>                
            </div>
            <div class='map-page-modal__price-box'>
                <div class='map-page-modal__price-box__name'>청소비</div>
                <div class='map-page-modal__price-box__value'>₩${templatePrice(25996)}</div>                
            </div>
            <div class='map-page-modal__price-box'>
                <div class='map-page-modal__price-box__name'>서비스 수수료</div>
                <div class='map-page-modal__price-box__value'>₩${templatePrice(182468)}</div>                
            </div>
            <div class='map-page-modal__price-box'>
                <div class='map-page-modal__price-box__name'>숙박세와 수수료</div>
                <div class='map-page-modal__price-box__value'>₩${templatePrice(18247)}</div>                
            </div>
            <hr class="line"/>
            <div class='map-page-modal__price-box total'>
                <div class='map-page-modal__price-box__name'>총 합계</div>
                <div class='map-page-modal__price-box__value'>₩${templatePrice(modalContent.price)}</div>
            </div>
        </div>
        `
}

export default templateModalContent;