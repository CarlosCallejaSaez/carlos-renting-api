function changeLanguage() {
    const selectElement = document.getElementById('language-select');
    const selectedLanguage = selectElement.value;

    // Obtiene los elementos de texto que deben cambiarse
    const pageTitleElement = document.getElementById('page-title');
    const pageTextElement = document.getElementById('page-text');

    // Cambia el texto según el idioma seleccionado
    if (selectedLanguage === 'en') {
      pageTitleElement.textContent = 'Page Not Found';
      pageTextElement.textContent = 'Please go to "/api-docs" ';
      console.log("en")
    } else if (selectedLanguage === 'es') {
      pageTitleElement.textContent = 'Página no encontrada';
      pageTextElement.textContent = 'Por favor, ve a "/api-docs" ';
    }
  }
  module.exports=changeLanguage