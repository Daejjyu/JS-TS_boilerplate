import './style.scss'
import Component from "@core/Component.js";
import { store, setMap, fetchStays } from '@src/store.js'
import { getDiffSet, localeNumber, delay } from '@core/utils.js'

const templateMap = () => `<div class="map-view__map" id="map"></div>`

export default class MapView extends Component {

    setup() {
        super.setup();
        this.loadMap();
    }

    template() {
        return `
        ${templateMap()}
        `
    }

    mounted() {
    }

    setEvent() {
        const { openModal } = this.props
        this.addEvent('click', '.map-view__marker', openModal)
    }

    loadMap() {
        const body = document.querySelector('body')
        const script = document.createElement('script')
        script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NAVER_MAP_ID}&submodules=geocoder`
        body.appendChild(script)
        script.onload = () => {
            const map = new naver.maps.Map("map", {
                center: new naver.maps.LatLng(37.3595316, 127.1052133),
                zoom: 15,
                mapTypeControl: true
            });

            map.state = {
                prevBounds: null,
                markers: new Map(),
            }

            map.coordToAddress = (lat, lng) => new Promise(res => {
                const coords = new naver.maps.LatLng(lat, lng)
                naver.maps.Service.reverseGeocode({ coords }, (status, response) => {
                    if (status !== naver.maps.Service.Status.OK) {
                        return alert('Something wrong!');
                    }
                    res(response.v2.address);
                });
            })

            const eraseMarkers = (markersDelete) => [...map.state.markers]
                .filter(([id, _]) => markersDelete.has(id))
                .forEach(([id, _]) => {
                    map.state.markers.get(id).setMap(null)
                    map.state.markers.delete(id)
                })

            const drawMarkers = (stays, markersDraw) => stays
                .filter(v => markersDraw.has(v.id))
                .forEach(v => map.state.markers.set(v.id, new naver.maps.Marker({
                    position: new naver.maps.LatLng(v.lat, v.lng),
                    map: map,
                    icon: {
                        content: `<div class='map-view__marker' data-id=${v.id}>₩${localeNumber(v.price)}</div>`,
                    }
                })));

            const manageMarkers = () => {
                //두 set의 id의 차집합을 찾아 한쪽은 지우고 한쪽은 그린다.
                //어차피 DOM이 바뀌면서 다시 그리는데 이럴 필요 있었나.. 
                //VDOM이 있는 상황이었다면 key를 사용해서 용이할 것 같다.
                const stays = store.getState().stays;
                const oldMarkerIds = new Set([...map.state.markers].map(([id, _]) => id))
                const newMarkerIds = new Set(stays.map(v => v.id))
                const [markersDraw, markersDelete] = [getDiffSet(newMarkerIds, oldMarkerIds), getDiffSet(oldMarkerIds, newMarkerIds)]
                eraseMarkers(markersDelete)
                drawMarkers(stays, markersDraw);
            }

            const waitMapBoundsChange = () => {
                return delay(1);
            }

            const updateMarker = async () => {
                map.state.prevBounds = map.bounds
                await store.dispatch(fetchStays(map));
                manageMarkers();
            }

            const findStaysInBounds = async (e) => {
                const isZoomChanged = e.type !== 'mouseup'
                if (isZoomChanged) await waitMapBoundsChange()// wait map bounds change
                if (map.state.prevBounds !== map.bounds) {
                    await updateMarker();
                }
            }

            const initGeocoder = async () => {
                store.dispatch(setMap(map));
                await updateMarker();
                //maps.bounds의 change 이벤트를 받는 것으로 개선 필요
                naver.maps.Event.addListener(map, 'mouseup', findStaysInBounds);
                naver.maps.Event.addListener(map, 'zoom_changed', findStaysInBounds);
            }
            naver.maps.onJSContentLoaded = initGeocoder;
        }
    }
}

//nextStep :
// 5. router & page마다 store,reducer,action을 어떻게 처리해야하는지 고민
// 6. slidebar 구현
// 7. 배포

// -> css를 toggle등으로 처리했는데 역시 상태로 가져야하나?