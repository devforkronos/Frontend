import App from "./App.vue";
import { createApp } from "vue";
import Index from "./assets/index";
import ScrollBar from "./assets/scrollbar";
import Settings from "./settings";

if (
  !localStorage.color ||
  localStorage.color == "undefined" ||
  localStorage.color == ""
) {
  localStorage.color = "brew";
}

window.$BackendURL =
  window.location.hostname == "localhost"
    ? (window.$BackendURL = Settings.$developmentURL)
    : (window.$BackendURL = Settings.$productionURL);

createApp(App).mount("#app");

let tag = document.createElement("script");
tag.innerHTML = `
function setThemeColor(color) {
  localStorage.color = color;
  window.location.reload();
}
`;
document.head.appendChild(tag);

ScrollBar();
Index();

// var scripts = ["/src/assets/taildown.js", "/src/assets/index.js"];
// for (let i = 0; i < scripts.length; i++) {
//   setTimeout(() => {
//     const script = scripts[i];
//     let tag = document.createElement("script");
//     tag.setAttribute("src", script);
//     document.head.appendChild(tag);
//   }, i * 100);
// }
