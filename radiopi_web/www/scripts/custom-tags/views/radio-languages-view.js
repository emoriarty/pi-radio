import { LitElement, html } from "https://jspm.dev/lit-element@2";
import { fetchLanguages } from "../../radio-browser-api.js";

export class RadioLanguagesView extends LitElement {
  static get properties() {
    return {
      languages: { type: Array },
    };
  }

  constructor() {
    super();
    this.languages = [];
  }

  connectedCallback() {
    super.connectedCallback();
    fetchLanguages().then((data) => {
      let initials = Array.from(
        new Set(data.map((item) => item.name.charAt(0)))
      );

      this.languages = initials.reduce((memo, initial) => {
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
        view: "radio-language",
        args: JSON.stringify({ tag: ev.detail.id }),
      },
      bubbles: true,
      composed: true,
    });
    ev.target.dispatchEvent(event);
  }

  render() {
    return html`
      <tree-view title="Radio Languages">
        <tree-list
          .nodes="${this.languages}"
          @click-tree-leaf=${this.handleClickLeaf}
        ></tree-list>
      </tree-view>
    `;
  }
}

customElements.define("radio-languages-view", RadioLanguagesView);
