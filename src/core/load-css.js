const loadCSS = (path) => {
  return fetch(path).then((res) => {
    if (!res.ok) throw new Error("Error al cargar el CSS");
    return res.text();
  });
};

const applyStyles = (css, shadow) => {
  const style = document.createElement("style");
  style.textContent = css;
  shadow.appendChild(style);
};

export { loadCSS, applyStyles };
