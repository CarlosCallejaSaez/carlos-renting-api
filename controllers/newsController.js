const axios = require('axios');

async function getBusinessNews(apiKey, country = 'us') {
  try {
    const category = 'business'; 

    const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}`);
  
    const articles = response.data.articles;
    

    return articles;
  } catch (error) {
    console.error('Error getting business news:', error);
    throw new Error('There was an error getting business news');
  }
}

module.exports = {
  getBusinessNews
};
