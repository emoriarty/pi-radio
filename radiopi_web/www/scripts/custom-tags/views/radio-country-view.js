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
      <page-title>Radio Countries &gt; ${this.country}</page-title>
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
