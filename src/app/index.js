import App from "./app.component.js";

document.addEventListener("DOMContentLoaded", () => onInit());

const onInit = () => {
  console.log("Component: ", App.name);
};
