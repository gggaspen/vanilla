const loadHTML = (path) => {
  return fetch(path).then((res) => {
    if (!res.ok) throw new Error("Error al cargar el HTML");
    return res.text();
  });
};

const applyHTML = (html, shadow) => {
  shadow.innerHTML += html;
};

export { loadHTML, applyHTML };
