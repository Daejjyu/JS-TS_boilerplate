import './style.scss'
import Component from "@core/Component.js";

const templateSpinner = () => `
  <div class='spinner-wrapper'>
    <div class="sk-chase">
      <div class="sk-chase-dot"></div>
      <div class="sk-chase-dot"></div>
      <div class="sk-chase-dot"></div>
      <div class="sk-chase-dot"></div>
      <div class="sk-chase-dot"></div>
      <div class="sk-chase-dot"></div>
    </div>
  </div>
`

export default class LoadingSpinner extends Component {

  template() {
    const { store } = this.props
    const isLoading = store.getState().isFetching
    if (isLoading)
      return `
        ${templateSpinner()}
        `
    else
      return ``
  }

  mounted() {
  }
}