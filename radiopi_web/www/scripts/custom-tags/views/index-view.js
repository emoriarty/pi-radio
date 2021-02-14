import { LitElement, html } from "https://jspm.dev/lit-element@2";

export class IndexView extends LitElement {
  static get properties() {
    return {
      view: { type: String },
      args: { type: Object },
    };
  }

  render() {
    console.log(this.view);
    switch (this.view) {
      case "radio-languages":
        return this.renderRadioLanguages();
      case "radio-tags":
        return this.renderRadioTags();
      case "radio-tag":
        return this.renderRadioTag();
      case "radio-countries":
        return this.renderRadioCountries();
      case "home":
      default:
        return this.renderHome();
    }
  }

  renderHome() {
    return html`<home-view></home-view>`;
  }

  renderRadioLanguages() {
    return html`<radio-languages-view></radio-languages-view>`;
  }

  renderRadioCountries() {
    return html`<radio-countries-view></radio-countries-view>`;
  }

  renderRadioTags() {
    return html`<radio-tags-view></radio-tags-view>`;
  }

  renderRadioTag() {
    return html`<radio-tag-view tag="${this.args.tag}"></radio-tag-view>`;
  }
}

customElements.define("index-view", IndexView);
