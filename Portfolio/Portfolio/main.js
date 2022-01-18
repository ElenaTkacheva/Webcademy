$(document).ready(function() {
  const navMobile = document.querySelector(".nav-mobile");
  const navTablet = document.querySelector(".nav-tablet-icon-wrapper");
  const navTabletIcon = document.querySelector(".nav-tablet-icon");
  const navMobileList = document.querySelectorAll(".nav-mobile__list a");
  const overlay = document.querySelector(".overlay");
  const bodyNoScroll = document.body;

  navTablet.addEventListener("click", function () {
    this.querySelector(".nav-tablet-icon").classList.toggle("active");
  });

  navTablet.addEventListener("click", function () {
    navMobile.classList.toggle("nav-mobile--active");
    overlay.classList.toggle("overlay--active");
    bodyNoScroll.classList.toggle("noscroll");
  });

  navMobileList.forEach(function (item) {
    item.addEventListener("click", function () {
      navTabletIcon.classList.remove("active");
      navMobile.classList.remove("nav-mobile--active");
      overlay.classList.remove("overlay--active");
      bodyNoScroll.classList.remove("noscroll");
    });
  });

  // Close the mobile menu when resizing the screen
  window.addEventListener("resize", function () {
    navTabletIcon.classList.remove("nav-tablet-icon--active");
    overlay.classList.remove("overlay--active");
    navMobile.classList.remove("nav-mobile--active");
    bodyNoScroll.classList.remove("noscroll");
  });

  // Arrow up
  const backtopButton = document.querySelector("#backtop");

  backtopButton.style.opacity = 0;

  document.addEventListener("scroll", function () {
    if (window.pageYOffset > 500) {
      backtopButton.style.opacity = 1;
    } else {
      backtopButton.style.opacity = 0;
    }
  });

  // MixItUp
  let containerEl = document.querySelector("#mix-cards");

  let mixer = mixitup(containerEl, {
    classNames: {
      block: "",
    },
  });

  // Сброс настроек и показ всех карточек при размере экране меньше 768
  window.addEventListener("resize", function () {
    if (document.documentElement.clientWidth < 768) {
      mixer.show().then(function (state) {
        console.log(state.totalShow === state.totalTargets);
      });
    }
  });

  // plagin pageNav
  $("#nav-menu").onePageNav({
    currentClass: "active",
    changeHash: false,
    scrollSpeed: 750,
    scrollThreshold: 0.5,
    filter: "",
    easing: "swing",
  });

  // перемещение фейкплейсхолдера в contact form (находим все поля ввода данных)
  const formItems = document.querySelectorAll(".form-input");

  // обходим все найденные поля
  formItems.forEach(function (item) {
    // родительский див для каждого элемента
    const thisParent = item.closest(".form-item");
    // в родителе находим фейкплейсхолдер
    const thisPlaceholder = thisParent.querySelector(".fake-placeholder");

    // проверяем input в фокусе - добавляем класс active
    item.addEventListener("focus", function () {
      thisPlaceholder.classList.add("active");
      this.classList.add("active");
    });

    // input теряет фокус, проверяем пустой ли input (пустой - active убираем, нет - оставляем)
    item.addEventListener("blur", function () {
      if (item.value.length > 0) {
        thisPlaceholder.classList.add("active");
        this.classList.add("active");
      } else {
        thisPlaceholder.classList.remove("active");
        this.classList.remove("active");
      }
    });
  });

  // проверяем правильность заполнения формы
  $(".contact-form").validate({
    rules: {
      email: {
        required: true, // обязательство заполнения этого поля ввода
        email: true, // правильность синтаксиса email
      },
      message: {
        required: true,
      },
    },
    messages: {
      email: {
        required: "Введите email",
        email: "Некорректный email",
      },
      message: {
        required: "Введите текст сообщения",
      },
    },
    // если все корректно, выполнится функция:
    submitHandler: function (form) {
      ajaxFormSubmit();
    },
  });

  // AJAX запрос на сервер
  function ajaxFormSubmit() {
    let string = $(".contact-form").serialize(); // сохранение данных, введенных в форму

    // формирование AJAX запроса
    $.ajax({
      type: "POST", // тип запроса
      url: "php/mail.php", // куда отправляем запрос
      data: string, // данные, которые отправляем

      // если отправка прошла успешно:
      success: function (html) {
        $(".contact-form").slideUp(800);
        $("#answer").html(html);
      },
    });
    // чтобы по submit ничего больше не выполнялось - возвращаем false, чтобы прервать цепочку срабатывания остальных функций
    return false;
  }

  // Параллакс
  const paralaxScene = document.querySelector(".contacts");
  const paralaxImg = document.querySelectorAll(".paralax");
  paralaxScene.addEventListener("mousemove", function (e) {
    let x = e.clientX / window.innerWidth;
    let y = e.clientY / window.innerHeight;
    for (let item of paralaxImg) {
      item.style.transform = "translate(-" + x * 150 + "px, -" + y * 150 + "px)";
    }
  });
})