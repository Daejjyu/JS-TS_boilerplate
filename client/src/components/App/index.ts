import "./style.scss";
import Component from "@core/Component";
import LandingPage from "@components/LandingPage/index";

export default class App extends Component {
  mounted() {
    new LandingPage(this.$elem, null);
  }
}
