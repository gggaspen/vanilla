export function Signal(initialValue) {
  let value = initialValue;
  const listeners = new Set();

  function get() {
    return value;
  }

  function set(newValue) {
    value = newValue;
    listeners.forEach((listener) => listener(value));
  }

  function subscribe(listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  }

  return { get, set, subscribe };
}
