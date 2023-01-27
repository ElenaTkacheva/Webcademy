// элементы на странице
const form = document.querySelector('.form');
const input = document.querySelector('.input');
const header = document.querySelector('.header');

/* Слушаем отправку формы */
form.onsubmit = (e) => {


    // отменяем отправку формы
    e.preventDefault();

    // берем значение из инпута, обрезаем пробелы
    let city = input.value.trim();

    // делаем запрос на сервер
    const apiKey = "b9d67965296f46a6883203111232501";
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // проверка на ошибку
        if (data.error) {
          // если есть ошибка - выводим ее

          // удаляем предыдущую карточку
          const prevCard = document.querySelector(".card");
          if (prevCard) prevCard.remove();

          const html = `
                <div class="card">${data.error.message}</div>
            `;
          // отображаем карточку с ошибкой
          header.insertAdjacentHTML("afterend", html);
        } else {
            // удаляем предыдущую карточку
            const prevCard = document.querySelector(".card");
            if (prevCard) prevCard.remove();

            // отображаем полученные данные в карточке
            // разметка для карточки
            const html = `
                <div class="card">
                    <h2 class="card-city">${data.location.name} <span>${data.location.country}</span></h2>

                    <div class="card-weather">
                        <div class="card-value">${data.current.temp_c}<sup>°c</sup></div>
                        <img class="card-img" src="./img/example.png" alt="Weather">
                    </div>

                    <div class="card-description">${data.current.condition.text}</div>
                </div>
            `;

            // отображаем карточку на странице
            header.insertAdjacentHTML("afterend", html);
        }       
    });
};