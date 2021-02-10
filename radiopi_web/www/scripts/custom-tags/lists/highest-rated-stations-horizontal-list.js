import { AbstractStationsHorizontalList } from "./abstract-stations-horizontal-list.js";
import { fetchHighestRatedStationsByCountry } from "../../radio-browser-api.js";

export class HighestRatedStationsHorizontalList extends AbstractStationsHorizontalList {
  constructor() {
    super();
    this.title = "Highest rated stations in your country";
    this.fetchStations = fetchHighestRatedStationsByCountry;
  }
}

customElements.define(
  "highest-rated-stations-horizontal-list",
  HighestRatedStationsHorizontalList
);
