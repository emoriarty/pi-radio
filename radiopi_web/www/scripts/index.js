import Navigo from "https://jspm.dev/navigo";

const router = new Navigo("/", { hash: true });

function attachListeners() {
  console.log("attaching listeners");

  document.querySelectorAll("station-card").forEach((item) => {
    console.log(item);
    item.addEventListener("on-play", (ev) => {
      console.log(ev);
    });
  });

  document.body.addEventListener("station-nav", (ev) => {
    console.log(ev.detail);
    ev.detail.args
      ? router.navigate(`${ev.detail.view}/${ev.detail.args.id}`)
      : router.navigate(ev.detail.view);
    toggleSidebar();
  });

  document
    .querySelector("nav-bar")
    .addEventListener("click-menu", toggleSidebar);

  document
    .querySelector("nav-sidebar")
    .addEventListener("click-close", toggleSidebar);
}

function initNav() {
  router
    .on("/radio-languages", navigate)
    .on("/radio-language/:id", navigate)
    .on("/radio-tags", navigate)
    .on("/radio-tag/:id", navigate)
    .on("/radio-countries", navigate)
    .on("/radio-country/:id", navigate)
    .on("/", navigate);
}

function onloadNav() {
  const hash = document.location.hash.slice(2);
  router.navigate(hash);
}

function navigate(ev) {
  console.log(ev, ev.route.name.slice(0, ev.route.name.indexOf("/")));
  let indexView = document.querySelector("index-view");
  let sliceIndex = ev.route.name.indexOf("/");
  indexView.setAttribute(
    "view",
    ev.route.name.slice(0, sliceIndex > 0 ? sliceIndex : undefined)
  );
  ev.data && indexView.setAttribute("args", JSON.stringify(ev.data));
}

function toggleSidebar() {
  let sidebar = document.querySelector("nav-sidebar");
  sidebar.classList.contains("open-sidebar")
    ? sidebar.classList.remove("open-sidebar")
    : sidebar.classList.add("open-sidebar");
}

document.addEventListener("DOMContentLoaded", () => {
  initNav();
  onloadNav();
  attachListeners();
});
