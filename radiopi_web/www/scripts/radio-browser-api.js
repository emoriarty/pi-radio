import RadioBrowser from "https://jspm.dev/radio-browser";

const CACHE = {
  country: null,
  countryCode: null,
};

export function fetchPopularStationsByCountry(country, count = 10) {
  return fetchStationsByCountry(country)
    .then((data) => {
      const stations = data.sort(byMostPopular()).slice(0, count);
      console.log(`Most popular in ${country}`);
      console.log(stations);
      return stations;
    })
    .catch((err) => console.error(err));
}

export function fetchHighestRatedStationsByCountry(country, count = 10) {
  return fetchStationsByCountry(country)
    .then((data) => {
      const stations = data.sort(byHighestRated()).slice(0, count);
      console.log(`Most voted in ${country}`);
      console.log(stations);
      return stations;
    })
    .catch((err) => console.error(err));
}

export function fetchStationsByCountry(country) {
  const filter = {
    by: "country",
    searchterm: country.toLocaleLowerCase(),
  };

  return RadioBrowser.getStations(filter).catch((err) => console.error(err));
}

export function fetchCountryFromCurrentLocation() {
  return CACHE.country
    ? Promise.resolve({
        country: CACHE.country,
        countryCode: CACHE.countryCode,
      })
    : fetch("https://ip2c.org/self").then((res) => {
        return res.text().then((data) => {
          const countryNames = data.split(";");
          const country = countryNames.pop();
          const countryCode = countryNames[1];
          console.log("CACHE.country empty");
          CACHE.country = country;
          CACHE.countryCode = countryCode;
          return {
            country,
            countryCode,
          };
        });
      });
}

export function fetchTags() {
  const filter = {
    hidebroken: true,
  };

  return RadioBrowser.getTags(filter).then((data) => {
    console.log(data);
    return data;
  });
}

// Filters
function byHighestRated() {
  return sortBy("votes", false);
}

function byMostPopular() {
  return sortBy("clicktrend", false);
}

function sortBy(prop, asc = true) {
  return function (a, b) {
    if (asc) return a[prop] > b[prop] ? 1 : b[prop] > a[prop] ? -1 : 0;
    return a[prop] < b[prop] ? 1 : b[prop] < a[prop] ? -1 : 0;
  };
}
