// Esta es una prueba de ejemplo 
test('Prueba de Hola Mundo', () => {
    const saludo = 'Hola Mundo';
    expect(saludo).toBe('Hola Mundo');
});

// Añadi un ejemplo como  prueba 
test('Suma 1 + 2 para que sea igual a 3', () => {
    expect(1 + 2).toBe(3);
});