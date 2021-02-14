import { LitElement, html, css } from "https://jspm.dev/lit-element@2";
import { fetchTags } from "../../radio-browser-api.js";

export class RadioTagsView extends LitElement {
  static get properties() {
    return {
      tagsByInitial: { type: Object },
      initials: { type: Array },
      tags: { type: Array },
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

      ul {
        list-style-type: none;
        padding: 0;
        margin: 0;
      }

      li a {
        padding: 8px 16px 8px 32px;
        display: inline-block;
        width: 100%;
        text-decoration: none;
        color: var(--color-primary);
      }

      li a:hover {
        text-decoration: underline;
      }

      li:last-child {
        border-bottom: none;
      }

      .hide {
        display: none;
      }

      .show {
        display: block;
      }

      button {
        font-size: 20px;
        border: 0;
        padding: 8px 16px;
        vertical-align: middle;
        overflow: hidden;
        text-decoration: none;
        color: inherit;
        background-color: inherit;
        text-align: center;
        cursor: pointer;
        white-space: nowrap;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        display: block;
        width: 100%;
        text-align: left;
        background-color: transparent;
        color: var(--color-primary);
      }

      button i {
        font-size: 0.8rem;
      }
    `;
  }

  constructor() {
    super();
    this.tagsByInitial = {};
    this.initials = [];
    this.handleClickAccordion = this.handleClickAccordion.bind(this);
    this.renderAccordion = this.renderAccordion.bind(this);
    this.renderTag = this.renderTag.bind(this);
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

  handleClickAccordion(index) {
    let target = this.shadowRoot.querySelector(`#index-${index}`);
    target.classList.contains("hide")
      ? target.classList.remove("hide")
      : target.classList.add("hide");
  }

  handleClickTag(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    let event = new CustomEvent("station-nav", {
      detail: {
        view: "radio-tag",
        args: JSON.stringify({ tag: ev.target.id }),
      },
      bubbles: true,
      composed: true,
    });
    ev.target.dispatchEvent(event);
  }

  render() {
    return html`
      <h2>Radio Tags</h2>
      ${this.initials.map(this.renderAccordion)}
    `;
  }

  renderAccordion(initial, index) {
    return html`
      <button @click="${this.handleClickAccordion.bind(this, index)}">
        ${initial} <i>(${this.tagsByInitial[initial].length})</i>
      </button>

      <div id="index-${index}" class="hide">
        <ul>
          ${this.tagsByInitial[initial].map(this.renderTag)}
        </ul>
      </div>
    `;
  }

  renderTag(tag) {
    return html`<li>
      <a href="#" id="${tag.name}" @click="${this.handleClickTag}"
        >${tag.name}</a
      >
    </li>`;
  }
}

customElements.define("radio-tags-view", RadioTagsView);
