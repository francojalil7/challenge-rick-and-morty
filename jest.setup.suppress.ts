// Suprimir todas las advertencias relacionadas con act()
const originalError = console.error;
console.error = function(...args: any[]) {
  // Si el mensaje contiene cualquier referencia a act, lo suprimimos
  if (args[0] && typeof args[0] === 'string' && args[0].includes('act(')) {
    return;
  }
  originalError.apply(console, args);
};