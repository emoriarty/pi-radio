import { LitElement, html } from "https://jspm.dev/lit-element@2";

export class HomeView extends LitElement {
  render() {
    return html`
      <popular-stations-horizontal-list></popular-stations-horizontal-list>
      <highest-rated-stations-horizontal-list></highest-rated-stations-horizontal-list>
    `;
  }
}

customElements.define("home-view", HomeView);
