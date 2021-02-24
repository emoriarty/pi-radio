import { LitElement, html } from "https://jspm.dev/lit-element@2";
import { fetchTags } from "../../radio-browser-api.js";

export class RadioTagsView extends LitElement {
  static get properties() {
    return {
      tagsByInitial: { type: Array },
    };
  }

  constructor() {
    super();
    this.tagsByInitial = [];
  }

  connectedCallback() {
    super.connectedCallback();
    fetchTags(this.country).then((data) => {
      let initials = Array.from(
        new Set(data.map((item) => item.name.charAt(0)))
      );

      this.tagsByInitial = initials.reduce((memo, initial) => {
        memo.push({
          name: initial,
          children: data
            .filter((tag) => tag.name.startsWith(initial))
            .map((tag) => ({
              name: tag.name,
              count: tag.stationcount,
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
        view: "radio-tag",
        args: { id: ev.detail.id },
      },
      bubbles: true,
      composed: true,
    });
    ev.target.dispatchEvent(event);
  }

  render() {
    return html`
      <tree-view title="Radio Tags">
        <tree-list
          .nodes="${this.tagsByInitial}"
          @click-tree-leaf=${this.handleClickLeaf}
        ></tree-list>
      </tree-view>
    `;
  }
}

customElements.define("radio-tags-view", RadioTagsView);
