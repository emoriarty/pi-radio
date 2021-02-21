let sidebar;

function attachListeners() {
  const indexView = document.querySelector("index-view");

  console.log("attaching listeners");

  document.querySelectorAll("station-card").forEach((item) => {
    console.log(item);
    item.addEventListener("on-play", (ev) => {
      console.log(ev);
    });
  });

  document.body.addEventListener("station-nav", (ev) => {
    indexView.setAttribute("view", ev.detail.view);
    ev.detail.args && indexView.setAttribute("args", ev.detail.args);
    toggleSidebar();
  });

  document
    .querySelector("nav-bar")
    .addEventListener("click-menu", toggleSidebar);

  document
    .querySelector("nav-sidebar")
    .addEventListener("click-close", toggleSidebar);
}

function initNav() {}

function toggleSidebar() {
  let sidebar = document.querySelector("nav-sidebar");
  sidebar.classList.contains("open-sidebar")
    ? sidebar.classList.remove("open-sidebar")
    : sidebar.classList.add("open-sidebar");
}

document.addEventListener("DOMContentLoaded", () => {
  initNav();
  attachListeners();
});
