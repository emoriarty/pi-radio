import { LitElement, html } from "https://jspm.dev/lit-element@2";

export class RadioCountriesView extends LitElement {
  render() {
    return html`
        <h2>Radio Countries</h2>
    `;
  }
}

customElements.define("radio-countries-view", RadioCountriesView);
