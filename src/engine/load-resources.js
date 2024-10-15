import { applyStyles } from "./load-css.js";
import { applyHTML } from "./load-html.js";

const loadResources = (resources) => {
  return Promise.all(
    resources.map((resource) =>
      fetch(resource).then((response) => {
        if (!response.ok) {
          throw new Error(`Error loading resource: ${resource}`);
        }
        return response.text();
      })
    )
  );
};

const renderContent = (css, html, shadow) => {
  shadow.innerHTML = "";
  applyStyles(css, shadow);
  applyHTML(html, shadow);
};

export { loadResources, renderContent };
