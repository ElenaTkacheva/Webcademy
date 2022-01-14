const navMobile = document.querySelector(".nav-mobile");
const navTablet = document.querySelector(".nav-tablet-icon-wrapper");
const navTabletIcon = document.querySelector(".nav-tablet-icon");
const navMobileList = document.querySelectorAll(".nav-mobile__list a");
const overlay = document.querySelector(".overlay");

navTablet.addEventListener("click", function () {
    this.querySelector(".nav-tablet-icon").classList.toggle("active");
});

navTablet.addEventListener("click", function () {
    navMobile.classList.toggle("nav-mobile--active");
    overlay.classList.toggle("overlay--active");
});

navMobileList.forEach(function (item) {
    item.addEventListener("click", function () {
        navTabletIcon.classList.remove("active");
        navMobile.classList.remove("nav-mobile--active");
        overlay.classList.remove("overlay--active");
    });
});
