const renderTemplate = (templateString, data) => {
  // Reemplaza todas las ocurrencias de las variables en el formato ${key} por el valor correspondiente en el objeto data
  return templateString.replace(/\${(.*?)}/g, (match, key) => {
    const value = data[key.trim()];
    return value !== undefined ? value : match;
  });
};

export default renderTemplate;
