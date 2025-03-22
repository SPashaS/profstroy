// Подключение функционала "Чертогов Фрилансера"
// import { log } from 'gulp-util';
// import { lightGalleryCoreSettings } from 'lightgallery/lg-settings.js';
import {
  isMobile,
  menuClose,
  menuOpen,
  _slideUp,
  _slideDown,
  closeAllSubMenus,
  bodyLock,
  bodyUnlock,
  bodyLockToggle,
  bodyLockStatus,
} from './functions.js';
// Подключение списка активных модулей
import { flsModules } from './modules.js';
// import { log } from 'gulp-util';

document.addEventListener('DOMContentLoaded', function () {
  const track = document.querySelector('.carousel__track');
  const slides = document.querySelectorAll('.carousel__slide');
  const prevBtn = document.querySelector('.carousel__btn_prev');
  const nextBtn = document.querySelector('.carousel__btn_next');

  if (track) {
    let index = 0;
    let slidesToShow = getSlidesToShow();
    let startX = 0;
    let isDragging = false;
    let slideWidth = 0;
    let gap = 30;

    updateSlideWidth();

    function getSlidesToShow() {
      if (window.innerWidth <= 768) return 1;
      if (window.innerWidth <= 1280) return 2;
      return 4;
    }

    function updateSlideWidth() {
      slidesToShow = getSlidesToShow();

      const slider = document.querySelector('.carousel__slider');
      const trackPadding = parseFloat(getComputedStyle(slider).paddingLeft) * 2;
      gap = slidesToShow === 1 ? 0 : 30;
      const trackWidth = slider.offsetWidth - trackPadding;

      slideWidth = (trackWidth - (slidesToShow - 1) * gap) / slidesToShow;

      slides.forEach((slide) => {
        slide.style.flex = `0 0 ${slideWidth}px`;
      });

      updateSlider();
    }

    function updateSlider() {
      const fullSlideWidth = slideWidth + gap;
      track.style.transform = `translateX(-${index * fullSlideWidth}px)`;
    }

    function moveSlider(dir) {
      index += dir;
      const maxIndex = Math.max(0, slides.length - slidesToShow); // Безопасный расчет

      if (index < 0) index = maxIndex;
      if (index > maxIndex) index = 0; // Бесконечная карусель

      updateSlider();
    }

    // === Свайп на мобильных ===
    function touchStart(event) {
      startX = event.touches[0].clientX;
      isDragging = true;
    }

    function touchMove(event) {
      if (!isDragging) return;
      let moveX = event.touches[0].clientX;
      let diff = startX - moveX;

      if (diff > 50) {
        moveSlider(1);
        isDragging = false;
      } else if (diff < -50) {
        moveSlider(-1);
        isDragging = false;
      }
    }

    function touchEnd() {
      isDragging = false;
    }

    prevBtn.addEventListener('click', () => moveSlider(-1));
    nextBtn.addEventListener('click', () => moveSlider(1));

    track.addEventListener('touchstart', touchStart);
    track.addEventListener('touchmove', touchMove);
    track.addEventListener('touchend', touchEnd);

    window.addEventListener('resize', updateSlideWidth);

    updateSlideWidth();
  }
});
