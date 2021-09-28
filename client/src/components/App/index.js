import './style.scss'
import Component from '@core/Component.js';
import LandingPage from '@components/LandingPage/index.js'

export default class App extends Component {

    mounted() {
        new LandingPage(this.$elem)
    }
}