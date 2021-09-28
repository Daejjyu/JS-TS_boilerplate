import { createStore } from '@core/Store.js';
import api from '@core/api.js';

const initState = {
    map: null,
    modalContent: null,
    isFetching: false,
    stays: [],
};

export const SET_MAP = 'SET_MAP';
export const SET_MODAL_CONTENT = 'SET_MODAL_CONTENT';
export const REQUEST_STAYS = 'REQUEST_STAYS';
export const RECEIVE_STAYS = 'RECEIVE_STAYS';

const reducer = (state = initState, action = {}) => {
    switch (action.type) {
        case 'SET_MAP':
            return { ...state, map: action.payload }
        case 'SET_MODAL_CONTENT':
            return { ...state, modalContent: action.payload }
        case 'REQUEST_STAYS':
            return { ...state, isFetching: true }
        case 'RECEIVE_STAYS':
            return { ...state, isFetching: false, stays: action.payload }
        default:
            return state;
    }
}

export const store = createStore(reducer);

//actions
export const setMap = (payload) => ({ type: SET_MAP, payload });
export const setModalContent = (payload) => ({ type: SET_MODAL_CONTENT, payload });
export const requestStays = () => ({ type: REQUEST_STAYS });
export const receiveStays = (payload) => ({ type: RECEIVE_STAYS, payload });
// 비동기 로직은 원래 redux-thunk 등을 사용하여 하는 듯.. 더 알아봐야 함
export const fetchStays = async (map) => {
    console.log('@fetch stays')
    store.dispatch(requestStays());

    const obj = {
        ne_lat: map.bounds._ne._lat,
        ne_lng: map.bounds._ne._lng,
        sw_lat: map.bounds._sw._lat,
        sw_lng: map.bounds._sw._lng,
    }
    const url = api.getUrl('/stays', obj)
    const res = await api.get(url)
    const addresses = await Promise.all(res.map(v => map.coordToAddress(v.lat, v.lng)))
    const stays = res.map((v, i) => ({ ...v, location: addresses[i].jibunAddress }))
    return receiveStays(stays);
}