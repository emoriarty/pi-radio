import { LitElement, html, css } from "https://jspm.dev/lit-element@2";

/**
 * title: String
 * nodes: Array<{ name: String, count: Number, children: nodes}>
 */
export class TreeList extends LitElement {
  static get properties() {
    return {
      nodes: { type: Array },
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
    this.nodes = [];
    this.renderBranchOrLeafNode = this.renderBranchOrLeafNode.bind(this);
    this.renderBranch = this.renderBranch.bind(this);
    this.renderLeaf = this.renderLeaf.bind(this);
    this.renderListItemWrapper = this.renderListItemWrapper.bind(this);
  }

  // createRenderRoot() {
  //   return this;
  // }

  handleClickBranch(index) {
    let target = this.shadowRoot.querySelector(`#index-${index}`);
    target.classList.contains("hide")
      ? target.classList.remove("hide")
      : target.classList.add("hide");
  }

  handleClickLeaf(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    let event = new CustomEvent("click-tree-leaf", {
      detail: {
        id: ev.target.id,
      },
      bubbles: true,
      composed: true,
    });
    ev.target.dispatchEvent(event);
  }

  render() {
    return this.nodes.map(this.renderBranchOrLeafNode);
  }

  renderBranchOrLeafNode(node, index) {
    return node.children
      ? this.renderBranch(node, index)
      : this.renderLeaf(node);
  }

  renderBranch(node, index) {
    return html`
      <button @click="${this.handleClickBranch.bind(this, index)}">
        ${node.name} <i>(${node.children.length})</i>
      </button>

      <div id="index-${index}" class="hide">
        <ul>
          ${node.children.map(this.renderListItemWrapper)}
        </ul>
      </div>
    `;
  }

  renderListItemWrapper(node) {
    return html` <li>${this.renderLeaf(node)}</li>`;
  }

  renderLeaf(node) {
    return html`
      <a href="#" id="${node.name}" @click="${this.handleClickLeaf}"
        >${node.name} ${node.count && html`<i>(${node.count})</i>`}</a
      >
    `;
  }
}

customElements.define("tree-list", TreeList);
