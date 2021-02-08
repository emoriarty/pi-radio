import { LitElement, html, css } from "https://jspm.dev/lit-element@2";

export class StationCard extends LitElement {
  static get properties() {
    return {
      img: { type: String },
      title: { type: String },
      src: { type: String },
      playing: { type: Boolean },
    };
  }

  static get styles() {
    return css`
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

      .overlay:hover .play,
      .overlay:hover .stop {
        cursor: pointer;
        opacity: 1;
      }

      .play,
      .stop {
        bottom: 5%;
        opacity: 0;
        position: absolute;
        right: 5%;
        transition: opacity 0.2s;
        height: 28.5%;
        width: 28.5%;
      }
    `;
  }

  constructor() {
    super();
    this.playing = false;
  }

  handlePlay(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    console.log("play");
    let event = new CustomEvent("on-station-play", {
      detail: {
        radio: "Something important happened",
      },
      bubbles: true,
      composed: true,
    });
    ev.target.dispatchEvent(event);
  }

  render() {
    return html`
      <div class="card overlay-wrapper">
        <header class="overlay">
          <img
            src="${this.img ||
            "https://play-lh.googleusercontent.com/aK5fbCH6BSJJCh--y6ZGnQ8uRFmb8B0Z8QxaLGERjOljHJ0S-bTw0k9SQ2eHy9jSzPA"}"
          />
          ${this.playing
            ? html` <stop-icon class="stop" /> `
            : html` <play-icon class="play" /> `}
        </header>

        <div class="container">
          <h4>${this.title}</h4>
        </div>
      </div>
    `;
  }
}

customElements.define("station-card", StationCard);
