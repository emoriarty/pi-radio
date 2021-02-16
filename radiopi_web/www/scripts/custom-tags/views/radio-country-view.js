import { LitElement, html, css } from "https://jspm.dev/lit-element@2";
import { fetchStationsByCountry } from "../../radio-browser-api.js";

export class RadioCountryView extends LitElement {
  static get properties() {
    return {
      country: { type: String },
      stations: { type: Array },
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

  constructor() {
    super();
    this.stations = [];
    this.renderStation = this.renderStation.bind(this);
  }

  updated(changedProperties) {
    changedProperties.forEach((_, propName) => {
      if (propName == "country" && this.country) {
        fetchStationsByCountry(this.country).then((data) => {
          this.stations = data;
        });
      }
    });
  }

  render() {
    console.log(this.country);
    return html`
      <h2>Radio Countries &gt; ${this.country}</h2>
      <stations-grid-list>
        ${this.stations.map(this.renderStation)}
      </stations-grid-list>
    `;
  }

  renderStation(station) {
    return html`
      <station-card
        img="${station.favicon}"
        title="${station.name}"
        id="${station.changeuuid}"
      ></station-card>
    `;
  }
}

customElements.define("radio-country-view", RadioCountryView);
