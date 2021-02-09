import { LitElement, html, css } from "https://jspm.dev/lit-element@2";
import {
  fetchPopularStationsByCountry,
  fetchCountryFromCurrentLocation,
} from "../../radio-browser-api.js";

export class PopularStationsHorizontalList extends LitElement {
  static get properties() {
    return {
      country: { type: String },
      countryCode: { type: String },
      stations: { type: Array },
    };
  }

  static get styles() {
    return css`
      station-card {
        width: 16.6667%;
      }
    `;
  }

  constructor() {
    super();
    this.stations = [];
    this.renderStation = this.renderStation.bind(this);
    this.addEventListener("on-station-play", function (ev) {
      this.stations.find((station) => station.changeuuid == ev.target.id);
    });
  }

  connectedCallback() {
    super.connectedCallback();
    fetchCountryFromCurrentLocation().then(({ countryCode, country }) => {
      this.country = country;
      this.countryCode = countryCode;
    });
  }

  handlePlay(ev) {
    console.log(ev);
  }

  render() {
    return html`
      <h2 @click="${this.handlePlay}">
        Popular Stations in your Area: ${this.country}
      </h2>
      <horizontal-list>
        ${this.stations.map(this.renderStation)}
      </horizontal-list>
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

  updated(changedProperties) {
    changedProperties.forEach((_, propName) => {
      if (propName == "countryCode") {
        fetchPopularStationsByCountry(this.country).then((data) => {
          this.stations = data;
        });
      }
    });
  }
}

customElements.define(
  "popular-stations-horizontal-list",
  PopularStationsHorizontalList
);
