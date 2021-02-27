import { LitElement, html, css } from "https://jspm.dev/lit-element@2";

export class HomeView extends LitElement {
  static get styles() {
    return css`
      :host {
        margin: 32px 0;
        display: block;
      }
    `;
  }

  render() {
    return html`
      <page-title>Home</page-title>
      <popular-stations-horizontal-list></popular-stations-horizontal-list>
      <highest-rated-stations-horizontal-list></highest-rated-stations-horizontal-list>
    `;
  }
}

customElements.define("home-view", HomeView);
