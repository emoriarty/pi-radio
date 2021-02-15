import { LitElement, html } from "https://jspm.dev/lit-element@2";
import { fetchCountries } from "../../radio-browser-api.js";

export class RadioCountriesView extends LitElement {
  static get properties() {
    return {
      countries: { type: Array },
    };
  }

  constructor() {
    super();
    this.countries = [];
  }

  connectedCallback() {
    super.connectedCallback();
    fetchCountries().then((data) => {
      let initials = Array.from(
        new Set(data.map((item) => item.name.charAt(0)))
      );

      this.countries = initials.reduce((memo, initial) => {
        memo.push({
          name: initial,
          children: data
            .filter((item) => item.name.startsWith(initial))
            .map((item) => ({
              name: item.name,
              count: item.stationcount,
            })),
        });
        return memo;
      }, []);
    });
  }

  handleClickLeaf(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    let event = new CustomEvent("station-nav", {
      detail: {
        view: "radio-country",
        args: JSON.stringify({ tag: ev.detail.id }),
      },
      bubbles: true,
      composed: true,
    });
    ev.target.dispatchEvent(event);
  }

  render() {
    return html`
      <tree-view title="Radio Countries">
        <tree-list
          .nodes="${this.countries}"
          @click-tree-leaf=${this.handleClickLeaf}
        ></tree-list>
      </tree-view>
    `;
  }
}

customElements.define("radio-countries-view", RadioCountriesView);
