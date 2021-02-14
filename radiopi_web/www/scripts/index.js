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
  });
}

function initNav() {}

document.addEventListener("DOMContentLoaded", () => {
  initNav();
  attachListeners();
});
