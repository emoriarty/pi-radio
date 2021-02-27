import { LitElement, html, css } from "https://jspm.dev/lit-element@2";

export class HomeView extends LitElement {
  static get styles() {
    return css`
      :host {
        margin: var(--spacing-large) 0;
        display: block;
      }

      .title-wrapper {
        margin: 0 var(--spacing-large);
      }
    `;
  }

  render() {
    return html`
      <div class="title-wrapper"><page-title>Home</page-title></div>
      <popular-stations-horizontal-list></popular-stations-horizontal-list>
      <highest-rated-stations-horizontal-list></highest-rated-stations-horizontal-list>
    `;
  }
}

customElements.define("home-view", HomeView);
