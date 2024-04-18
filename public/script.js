function changeLanguage() {
    const selectElement = document.getElementById('language-select');
    const selectedLanguage = selectElement.value;

    // Obtiene los elementos de texto que deben cambiarse
    const pageTitleElement = document.getElementById('page-title');
    const pageTextElement = document.getElementById('page-text');

    // Cambia el texto según el idioma seleccionado
    if (selectedLanguage === 'en') {
      pageTitleElement.textContent = 'Page Not Found';
      pageTextElement.textContent = 'Sorry, the page you are looking for could not be found on the server. Please go to "/api-docs" to see the documentation.';
      console.log("en")
    } else if (selectedLanguage === 'es') {
      pageTitleElement.textContent = 'Página no encontrada';
      pageTextElement.textContent = 'Lo siento, la página que estás buscando no se pudo encontrar en el servidor. Por favor, ve a "/api-docs" para ver la documentación.';
    }
  }
  module.exports=changeLanguage