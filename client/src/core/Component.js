// https://junilhwang.github.io/TIL/Javascript/Design/Vanilla-JS-Store/#reference

import { observable, observe } from '@core/observer.js';

export default class Component {
    state; props; $elem;

    constructor($elem, props) {
        this.$elem = $elem;
        this.props = props;
        this.setup();
        this.setEvent();
    }

    //observe에 의해 render가 실행되고
    //render 함수 내부 로직에서 store의 state를 사용하면 
    //observable의 get에 의해 구독자로 등록된다.
    //이후 store의 state가 바뀌면 등록되었던 render가 실행
    setup() {
        // this.state = observable(this.initState()); 각 컴포넌트에서 관리하는 대신 store에서 관리
        observe(() => {
            this.render();
        });
    }

    initState() { return {} }
    template() { return ''; }
    render() {
        // console.log(this.constructor.name, "rendered")
        this.$elem.innerHTML = this.template();
        this.mounted();
    }
    mounted() { }
    setEvent() { }
    addEvent(eventType, selector, callback) {
        const children = [...this.$elem.querySelectorAll(selector)];
        const isTarget = (target) => children.includes(target) || target.closest(selector);
        this.$elem.addEventListener(eventType, event => {
            if (!isTarget(event.target)) return false;
            callback(event);
        })
    }
}