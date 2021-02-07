import { LitElement, html, css } from "https://jspm.dev/lit-element@2";

export class StationCard extends LitElement {
  static get properties() {
    return {
      img: { type: String },
      title: { type: String },
    };
  }

  static get styles() {
    return css`
      .card {
        max-width: 162px;
      }

      .container {
        padding: 0.5rem;
      }

      img {
        display: block;
        width: 100%;
      }

      h4 {
        margin-top: 0;
        margin-bottom: 0.5rem;
      }

      header {
        position: relative;
      }
      .overlay img {
        transition: opacity 0.2s;
      }

      .overlay:hover img {
        background-color: #fff;
        opacity: 0.5;
        z-index: 2;
      }

      .overlay:hover .play {
        cursor: pointer;
        opacity: 1;
      }

      .play {
        bottom: 0.5rem;
        opacity: 0;
        position: absolute;
        right: 0.5rem;
        transition: opacity 0.2s;
      }
    `;
  }

  _handlePlay(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    console.log("play");
    let event = new CustomEvent("on-play", {
      detail: {
        message: "Something important happened",
      },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  _handleClick(e) {
    console.log("click");
  }
  render() {
    return html`
      <div class="card overlay-wrapper">
        <header class="overlay">
          <img src="${this.img}" />
          <svg
            width="28.5%"
            height="28.5%"
            viewBox="0 0 45 45"
            class="play"
            role="button"
            @click="${this._handlePlay}"
          >
            <path
              fill="#1c203c"
              d="M22.5 45a22.5 22.5 0 100-45 22.5 22.5 0 000 45z"
            ></path>
            <path
              d="M17.5 31.6c0 .3.2.7.5.8.3.2.7.1 1 0l11.5-9.2a.9.9 0 000-1.4L19 12.7a1 1 0 00-1-.1 1 1 0 00-.5.8v18.2z"
              fill="#FFF"
            ></path>
          </svg>
        </header>

        <div class="container">
          <h4>${this.title}</h4>
        </div>
      </div>
    `;
  }
}

customElements.define("station-card", StationCard);
