import { LitElement, html, css } from "https://jspm.dev/lit-element@2";
import { fetchTags } from "../../radio-browser-api.js";

export class RadioTagView extends LitElement {
  static get properties() {
    return {
      tag: { type: String },
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

  connectedCallback() {
    super.connectedCallback();
    fetchTags(this.country).then((data) => {
      this.tags = data;
      this.initials = Array.from(
        new Set(this.tags.map((item) => item.name.charAt(0)))
      );
      this.initials.forEach((initial) => {
        this.tagsByInitial[initial] = this.tags.filter((tag) =>
          tag.name.startsWith(initial)
        );
      });
    });
  }

  render() {
    return html` <h2>Radio Tags &gt; ${this.tag}</h2> `;
  }
}

customElements.define("radio-tag-view", RadioTagView);
