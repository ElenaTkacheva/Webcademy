import conditions from "./conditions.js";

// элементы на странице
const form = document.querySelector('.form');
const input = document.querySelector('.input');
const header = document.querySelector('.header');

function removeCard() {
    const prevCard = document.querySelector(".card");
    if (prevCard) prevCard.remove();
}

function showError(errorMessage) {
    const html = `
        <div class="card">${errorMessage}</div>
        `;
    // отображаем карточку с ошибкой
    header.insertAdjacentHTML("afterend", html);
}

function showCard({ name, country, temp, condition, imgPath }) {
  // отображаем полученные данные в карточке
    const html = `
                        <div class="card">
                            <h2 class="card-city">${name} <span>${country}</span></h2>

                            <div class="card-weather">
                                <div class="card-value">${temp}<sup>°c</sup></div>
                                <img class="card-img" src="${imgPath}" alt="Weather">
                            </div>

                            <div class="card-description">${condition}</div>
                        </div>
                    `;

    // отображаем карточку на странице
    header.insertAdjacentHTML("afterend", html);
} 

async function getWeather(city) {
    // делаем запрос на сервер
    const apiKey = "b9d67965296f46a6883203111232501";
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}


/* Слушаем отправку формы */
form.onsubmit = async (e) => {
  // отменяем отправку формы
  e.preventDefault();

  // берем значение из инпута, обрезаем пробелы
  let city = input.value.trim();

  // получаем данные с сервера
  const data = await getWeather(city);

  // проверка на ошибку
  if (data.error) {
    // если есть ошибка - выводим ее
    removeCard();
    showError(data.error.message);
  } else {
    removeCard();
    // Get conditions
    const info = conditions.find((obj) => obj.code === data.current.condition.code);
    const filePath = './img/' + (data.current.is_day ? 'day' : 'night') + '/';
    const fileName = (data.current.is_day ? info.day : info.night) + '.png';
    const imgPath = filePath + fileName;
    const condition = data.current.is_day
        ? info.languages[23]["day_text"]
        : info.languages[23]["night_text"];
    const weatherData = {
      name: data.location.name,
      country: data.location.country,
      temp: data.current.temp_c,
      condition: condition,
      imgPath,
    };
    showCard(weatherData);
  }
};