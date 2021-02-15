import { LitElement, html, css } from "https://jspm.dev/lit-element@2";

export class RadioCountryView extends LitElement {
  static get properties() {
    return {
      country: { type: String },
    };
  }

  static get styles() {
    return css`
      :host {
        padding: 0 32px;
        display: block;
      }

      h2 {
        margin: 10px 0;
        font-family: var(--font-family-secondary);
        font-weight: var(--font-weight-bolder);
        font-size: 30px;
        text-transform: uppercase;
      }
    `;
  }

  // createRenderRoot() {
  //   return this;
  // }

  render() {
    return html` <h2>Radio Countries &gt; ${this.country}</h2> `;
  }
}

customElements.define("radio-country-view", RadioCountryView);
