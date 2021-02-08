import { LitElement, html, css } from "https://jspm.dev/lit-element@2";

export class StationsHorizontalList extends LitElement {
  static get styles() {
    return css`
      station-card {
        width: 16.6667%;
      }
    `;
  }

  render() {
    return html`
      <horizontal-list>
        <station-card
          img="https://cdn.radiofrance.fr/s3/cruiser-production/2017/06/d1d4a0e0-282f-434a-879d-9075905e12f9/200x200_fmwebradiosnormalplus.jpg"
          title="Radio France Musique"
          onclick="console.log('jola 0');"
        ></station-card>
        <station-card
          img="http://db.radioline.fr/pictures/radio_98bf4bff08df55fe5c5a0b77b616f415/logo200.jpg?size=200"
          title="Jazz Music Only Women"
          onclick="console.log('jola 1');"
        ></station-card>
        <station-card
          img="http://static.radio.fr/images/broadcasts/b1/97/1441/1/c300.png"
          title="BFM Business"
          onclick="console.log('jola 2');"
        ></station-card>
        <station-card
          img="https://cdn.radiofrance.fr/s3/cruiser-production/2017/06/d1d4a0e0-282f-434a-879d-9075905e12f9/200x200_fmwebradiosnormalplus.jpg"
          title="Radio France Musique"
          onplay="console.log('jola 0');"
        ></station-card>
        <station-card
          img="http://db.radioline.fr/pictures/radio_98bf4bff08df55fe5c5a0b77b616f415/logo200.jpg?size=200"
          title="Jazz Music Only Women"
          onclick="console.log('jola 1');"
        ></station-card>
        <station-card
          img="http://static.radio.fr/images/broadcasts/b1/97/1441/1/c300.png"
          title="BFM Business"
          onclick="console.log('jola 2');"
        ></station-card>
        <station-card
          img="https://cdn.radiofrance.fr/s3/cruiser-production/2017/06/d1d4a0e0-282f-434a-879d-9075905e12f9/200x200_fmwebradiosnormalplus.jpg"
          title="Radio France Musique"
          onplay="console.log('jola 0');"
        ></station-card>
        <station-card
          img="http://db.radioline.fr/pictures/radio_98bf4bff08df55fe5c5a0b77b616f415/logo200.jpg?size=200"
          title="Jazz Music Only Women"
          onclick="console.log('jola 1');"
        ></station-card>
        <station-card
          img="http://static.radio.fr/images/broadcasts/b1/97/1441/1/c300.png"
          title="BFM Business"
          onclick="console.log('jola 2');"
        ></station-card>
      </horizontal-list>
    `;
  }
}

customElements.define("stations-horizontal-list", StationsHorizontalList);
