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

const loadComponentResources = (shadow, resources, hooks = {}) => {
  const { onBeforeRender, onAfterRender, onError } = hooks;

  loadResources(resources)
    .then(([css, html]) => {
      if (onBeforeRender) onBeforeRender(); // Hook antes del renderizado, opcional

      // Renderizar el contenido común
      shadow.innerHTML = "";
      applyStyles(css, shadow);
      applyHTML(html, shadow);

      if (onAfterRender) onAfterRender(); // Hook después del renderizado, opcional
    })
    .catch((error) => {
      console.error("Error al cargar recursos:", error);
      if (onError) onError(error); // Hook para gestionar errores, opcional
    });
};

/**
 * Función para inicializar un componente con recursos y hooks
 * @param {HTMLElement} component - La instancia del componente (this)
 * @param {Object} config - La configuración con paths a CSS y HTML
 * @param {Object} hooks - Hooks opcionales para personalizar el comportamiento del componente
 */
const initializeComponent = (component, config, hooks = {}) => {
  const { style, template } = config;

  // Inicializar el componente usando los hooks proporcionados
  loadComponentResources(component.shadowRoot, [style, template], {
    onBeforeRender: hooks.onBeforeRender || (() => {}),
    onAfterRender: hooks.onAfterRender || (() => {}),
    onError:
      hooks.onError ||
      (() => {
        component.shadowRoot.innerHTML = "<p>Error loading component</p>";
      }),
  });
};

export { loadComponentResources, loadResources, initializeComponent };
