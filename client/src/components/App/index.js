import './style.scss'
import Component from '@core/Component.js';
import MapPage from '@components/MapPage/index.js'

export default class App extends Component {

    mounted() {
        new MapPage(this.$elem)
    }
}