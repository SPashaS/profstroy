/*
Документация по работе в шаблоне: 
Документация слайдера: https://swiperjs.com/
Сниппет(HTML): swiper
*/

// Подключаем слайдер Swiper из node_modules
// При необходимости подключаем дополнительные модули слайдера, указывая их в {} через запятую
// Пример: { Navigation, Autoplay }
import Swiper from 'swiper';
import { Pagination, Navigation } from 'swiper/modules';
/*
Основниые модули слайдера:
Navigation, Pagination, Autoplay, 
EffectFade, Lazy, Manipulation
Подробнее смотри https://swiperjs.com/
*/

// Стили Swiper
// Базовые стили
// import "../../scss/base/swiper.scss";
// Полный набор стилей из scss/libs/swiper.scss
// import "../../scss/libs/swiper.scss";
// Полный набор стилей из node_modules
// import 'swiper/css';

// Добавление классов слайдерам
// swiper главному блоку, swiper-wrapper оболочке, swiper-slide для слайдов
function bildSliders() {
  //BildSlider
  let sliders = document.querySelectorAll(
    '[class*="__swiper"]:not(.swiper-wrapper)'
  );
  if (sliders) {
    sliders.forEach((slider) => {
      slider.parentElement.classList.add('swiper');
      slider.classList.add('swiper-wrapper');
      for (const slide of slider.children) {
        slide.classList.add('swiper-slide');
      }
    });
  }
}

const resizableSwiper = (breakpoint, swiperClass, swiperSettings, callback) => {
  let swiper;

  breakpoint = window.matchMedia(breakpoint);

  const enableSwiper = function (className, settings) {
    swiper = new Swiper(className, settings);

    if (callback) {
      callback(swiper);
    }
  };

  const checker = function () {
    // console.log('CHANGE');
    if (breakpoint.matches) {
      console.log('da');
      return enableSwiper(swiperClass, swiperSettings);
    } else {
      if (swiper !== undefined) {
        console.log('net');
        swiper.destroy(true, true);
        return;
      }
    }
  };

  breakpoint.addEventListener('change', checker);
  checker();
};

const someFunc = (instance) => {
  if (instance) {
    instance.on('slideChange', function (e) {
      console.log('*** mySwiper.activeIndex', instance.activeIndex);
    });
  }
};

// Инициализация слайдеров
function initSliders() {
  // Добавление классов слайдера
  // при необходимости отключить

  bildSliders();

  // Перечень слайдеров

  // if (document.querySelector('.promo__slider')) {

  // 	new Swiper('.promo__slider', {
  // 			// Подключаем модули слайдера
  // 			// для конкретного случая
  // 			//modules: [Navigation, Pagination],
  // 			modules: [Navigation],

  // 			// effect: 'fade',
  // 			// autoplay: {
  // 			//   delay: 2500,
  // 			//   disableOnInteraction: false,
  // 			// },

  // 			// observer: true,
  // 			// observeParents: true,
  // 			slidesPerView: 1,
  // 			spaceBetween: 0,
  // 			// autoHeight: true,
  // 			speed: 800,
  // 			// touchRatio: 0,
  // 			//simulateTouch: false,
  // 			loop: true,
  // 			//preloadImages: false,
  // 			//lazy: true,
  // 			// Dotts
  // 			// pagination: {
  // 			// 	el: '.service__pagination',
  // 			// 	clickable: true,
  // 			// },
  // 			// Arrows
  // 			navigation: {
  // 				prevEl: '.promo__slider-nav .slider-nav-n__btn_prev',
  // 				nextEl: '.promo__slider-nav .slider-nav-n__btn_next',
  // 			},
  // 			// breakpoints: {
  // 			// 	0: {
  // 			// 		slidesPerView: 1,
  // 			// 		spaceBetween: 30,
  // 			// 	},
  // 			// 	// 320: {
  // 			// 	// 	slidesPerView: "auto",
  // 			// 	// 	spaceBetween: 28,
  // 			// 	// },
  // 			// 	// 768: {
  // 			// 	// 	slidesPerView: 2,
  // 			// 	// 	spaceBetween: 30,
  // 			// 	// },
  // 			// 	// 992: {
  // 			// 	// },
  // 			// 	// 1268: {
  // 			// 	// 	slidesPerView: 1,
  // 			// 	// 	spaceBetween: 44,
  // 			// 	// },
  // 			// },

  // 			on: {

  // 			}
  // 		}
  // 	)
  // }

  // if (document.querySelector('.reviews__slider')) {
  // 	resizableSwiper (
  // 		'(max-width: 992px)',
  // 		'.reviews__slider', {
  // 			// Подключаем модули слайдера
  // 			// для конкретного случая
  // 			modules: [Navigation, Pagination],
  // 			// modules: [Navigation],

  // 			// effect: 'fade',
  // 			// autoplay: {
  // 			//   delay: 2500,
  // 			//   disableOnInteraction: false,
  // 			// },

  // 			// observer: true,
  // 			// observeParents: true,
  // 			slidesPerView: 1,
  // 			spaceBetween: 20,
  // 			// autoHeight: true,
  // 			speed: 800,
  // 			// touchRatio: 0,
  // 			//simulateTouch: false,
  // 			//loop: true,
  // 			//preloadImages: false,
  // 			//lazy: true,
  // 			// Dotts
  // 			pagination: {
  // 				el: '.reviews__pagination',
  // 				clickable: true,
  // 			},
  // 			// Arrows
  // 			// navigation: {
  // 			// 	nextEl: `.promotion__slider .slider-nav-n .slider-nav-n__btn_next`,
  // 			// 	prevEl: `.promotion__slider .slider-nav-n .slider-nav-n__btn_prev`,
  // 			// },
  // 			// breakpoints: {
  // 			// 	0: {
  // 			// 		slidesPerView: 1,
  // 			// 		spaceBetween: 30,
  // 			// 	},
  // 			// 	// 320: {
  // 			// 	// 	slidesPerView: "auto",
  // 			// 	// 	spaceBetween: 28,
  // 			// 	// },
  // 			// 	// 768: {
  // 			// 	// 	slidesPerView: 2,
  // 			// 	// 	spaceBetween: 30,
  // 			// 	// },
  // 			// 	// 992: {
  // 			// 	// },
  // 			// 	// 1268: {
  // 			// 	// 	slidesPerView: 1,
  // 			// 	// 	spaceBetween: 44,
  // 			// 	// },
  // 			// },

  // 			on: {

  // 			}
  // 		}
  // 	)
  // }

  if (document.querySelector('.portfolio__slider')) {
    new Swiper('.portfolio__slider', {
      // Подключаем модули слайдера
      // для конкретного случая
      //modules: [Navigation, Pagination],
      modules: [Navigation],

      // effect: 'fade',
      // autoplay: {
      //   delay: 2500,
      //   disableOnInteraction: false,
      // },

      // observer: true,
      // observeParents: true,
      slidesPerView: 'auto',
      spaceBetween: 30,
      centeredSlides: true,
      // autoHeight: true,
      speed: 800,
      // touchRatio: 0,
      //simulateTouch: false,
      loop: true,
      //preloadImages: false,
      lazy: true,
      // Dotts
      // pagination: {
      // 	el: '.service__pagination',
      // 	clickable: true,
      // },
      // Arrows
      navigation: {
        prevEl: '.portfolio__nav .slider-nav__btn--prev',
        nextEl: '.portfolio__nav .slider-nav__btn--next',
      },
      breakpoints: {
        0: {
          slidesPerView: 'auto',
          spaceBetween: 30,
        },
        320: {},
        768: {
          centeredSlides: false,
        },
        992: {},
        1268: {},
      },

      on: {},
    });
  }

  if (document.querySelector('.promotion__slider')) {
    new Swiper('.promotion__slider', {
      // Подключаем модули слайдера
      // для конкретного случая
      //modules: [Navigation, Pagination],
      modules: [Pagination],

      // effect: 'fade',
      // autoplay: {
      //   delay: 2500,
      //   disableOnInteraction: false,
      // },

      observer: true,
      // observeParents: true,
      slidesPerView: 'auto',
      spaceBetween: 0,
      centeredSlides: true,
      // autoHeight: true,
      speed: 800,
      // touchRatio: 0,
      //simulateTouch: false,
      loop: true,
      //preloadImages: false,
      lazy: true,
      // Dotts
      pagination: {
        el: '.promotion__dots',
        clickable: true,
      },
      // Arrows
      // navigation: {
      // 	prevEl: '.portfolio__pagination .portfolio__slider-btn--prev',
      // 	nextEl: '.portfolio__pagination .portfolio__slider-btn--next',
      // },
      // breakpoints: {
      // 	0: {
      // 		slidesPerView: 1,
      // 		spaceBetween: 30,
      // 	},
      // 	320: {
      // 	},
      // 	768: {
      // 	},
      // 	992: {
      // 	},
      // 	1268: {
      // 	},
      // },

      on: {},
    });
  }

  if (document.querySelector('.info__slider')) {
    resizableSwiper('(max-width: 1365px)', '.info__slider', {
      // Подключаем модули слайдера
      // для конкретного случая
      // modules: [Navigation, Pagination],
      modules: [Navigation],

      // effect: 'fade',
      // autoplay: {
      //   delay: 2500,
      //   disableOnInteraction: false,
      // },

      // observer: true,
      // observeParents: true,
      slidesPerView: 'auto',
      centeredSlides: true,
      spaceBetween: 30,
      // autoHeight: true,
      speed: 800,
      // touchRatio: 0,
      //simulateTouch: false,
      //loop: true,
      //preloadImages: false,
      //lazy: true,
      // Dotts
      // pagination: {
      //   el: '.reviews__pagination',
      //   clickable: true,
      // },
      // Arrows
      navigation: {
        nextEl: `.info__nav .slider-nav__btn--next`,
        prevEl: `.info__nav .slider-nav__btn--prev`,
      },
      // breakpoints: {
      // 	0: {
      // 		slidesPerView: 1,
      // 		spaceBetween: 30,
      // 	},
      // 	// 320: {
      // 	// 	slidesPerView: "auto",
      // 	// 	spaceBetween: 28,
      // 	// },
      // 	// 768: {
      // 	// 	slidesPerView: 2,
      // 	// 	spaceBetween: 30,
      // 	// },
      // 	// 992: {
      // 	// },
      // 	// 1268: {
      // 	// 	slidesPerView: 1,
      // 	// 	spaceBetween: 44,
      // 	// },
      // },

      on: {},
    });
  }

  if (document.querySelector('.service-content__slider')) {
    new Swiper('.service-content__slider', {
      // Подключаем модули слайдера
      // для конкретного случая
      //modules: [Navigation, Pagination],
      modules: [Navigation],

      // effect: 'fade',
      // autoplay: {
      //   delay: 2500,
      //   disableOnInteraction: false,
      // },

      // observer: true,
      // observeParents: true,
      // slidesPerView: 'auto',
      // spaceBetween: 30,
      centeredSlides: true,
      // autoHeight: true,
      speed: 800,
      // touchRatio: 0,
      //simulateTouch: false,
      loop: true,
      //preloadImages: false,
      lazy: true,
      // Dotts
      // pagination: {
      // 	el: '.service__pagination',
      // 	clickable: true,
      // },
      // Arrows
      navigation: {
        prevEl: '.service-content__nav .slider-nav__btn--prev',
        nextEl: '.service-content__nav .slider-nav__btn--next',
      },
      breakpoints: {
        0: {
          slidesPerView: 'auto',
          spaceBetween: 15,
        },
        320: {},
        500: {
          slidesPerView: 'auto',
          spaceBetween: 30,
        },
        // 768: {
        //   // centeredSlides: false,
        // },
        992: {
          slidesPerView: 'auto',
          spaceBetween: 30,
          centeredSlides: false,
        },
        // 1268: {},
      },

      on: {},
    });
  }

  if (document.querySelector('.masters')) {
    const sliders = document.querySelectorAll('.certificates__slider');
    // console.log(sliders);
    for (let i = 0; i < sliders.length; i++) {
      const slider = sliders[i];
      let classSlider = `certificates__slider_${i}`;
      slider.classList.add(classSlider);

      new Swiper(`.${classSlider}`, {
        // Подключаем модули слайдера
        // для конкретного случая
        //modules: [Navigation, Pagination],
        modules: [Navigation],

        // effect: 'fade',
        // autoplay: {
        //   delay: 2500,
        //   disableOnInteraction: false,
        // },

        // observer: true,
        // observeParents: true,
        // slidesPerView: 1,
        // spaceBetween: 30,
        // autoHeight: true,
        speed: 800,
        // touchRatio: 0,
        //simulateTouch: false,
        loop: true,
        //preloadImages: false,
        //lazy: true,
        // Dotts
        // pagination: {
        // 	el: '.desc__slider-pagination',
        // 	clickable: true,
        // },
        // Arrows
        navigation: {
          nextEl: `.${classSlider} ~ .slider-nav .slider-nav__btn--next`,
          prevEl: `.${classSlider} ~ .slider-nav .slider-nav__btn--prev`,
        },
        breakpoints: {
          0: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          320: {},
          768: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          992: {
            // slidesPerView: "auto",
            // spaceBetween: 20,
          },
          1366: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
        },

        on: {},
      });
    }
  }

  // if (document.querySelector('.courses-body-list__slider')) {
  //   new Swiper('.courses-body-list__slider', {
  //     // Подключаем модули слайдера
  //     // для конкретного случая
  //     //modules: [Navigation, Pagination],
  //     modules: [Navigation],

  //     // effect: 'fade',
  //     // autoplay: {
  //     //   delay: 2500,
  //     //   disableOnInteraction: false,
  //     // },

  //     observer: true,
  //     // observeParents: true,
  //     // slidesPerView: 'auto',
  //     // spaceBetween: 30,
  //     centeredSlides: true,
  //     // autoHeight: true,
  //     speed: 800,
  //     // touchRatio: 0,
  //     //simulateTouch: false,
  //     loop: true,
  //     //preloadImages: false,
  //     lazy: true,
  //     // Dotts
  //     // pagination: {
  //     // 	el: '.service__pagination',
  //     // 	clickable: true,
  //     // },
  //     // Arrows
  //     navigation: {
  //       prevEl: '.courses-body-list__nav .slider-nav__btn--prev',
  //       nextEl: '.courses-body-list__nav .slider-nav__btn--next',
  //     },
  //     breakpoints: {
  //       0: {
  //         slidesPerView: 1,
  //         spaceBetween: 15,
  //       },
  //       320: {},
  //       500: {
  //         slidesPerView: 'auto',
  //         spaceBetween: 30,
  //       },
  //       768: {
  //         // centeredSlides: false,
  //       },
  //       992: {},
  //       1268: {},
  //     },

  //     on: {},
  //   });
  // }


  if (document.querySelector('.courses-body-list__slider')) {
    resizableSwiper('(max-width: 1365px)', '.courses-body-list__slider', {
      // Подключаем модули слайдера
      // для конкретного случая
      // modules: [Navigation, Pagination],
      modules: [Navigation],

      // effect: 'fade',
      // autoplay: {
      //   delay: 2500,
      //   disableOnInteraction: false,
      // },

      // observer: true,
      // observeParents: true,
      // slidesPerView: "auto",
      centeredSlides: true,
      spaceBetween: 30,
      // autoHeight: true,
      speed: 800,
      // touchRatio: 0,
      //simulateTouch: false,
      //loop: true,
      //preloadImages: false,
      //lazy: true,
      // Dotts
      // pagination: {
      //   el: '.reviews__pagination',
      //   clickable: true,
      // },
      // Arrows
      navigation: {
        prevEl: '.courses-body-list__nav .slider-nav__btn--prev',
        nextEl: '.courses-body-list__nav .slider-nav__btn--next',
      },
      breakpoints: {
        0: {
          slidesPerView: 'auto',
          spaceBetween: 15,
        },
        // 320: {},
        500: {
          slidesPerView: 'auto',
          spaceBetween: 30,
        },
        // 768: {
        //   // centeredSlides: false,
        // },
        // 992: {},
        // 1268: {},
      },

      on: {},
    });
  }
}




Скролл на базе слайдера (по классу swiper_scroll для оболочки слайдера)
function initSlidersScroll() {
  // Добавление классов слайдера
  // при необходимости отключить
  bildSliders();

  let sliderScrollItems = document.querySelectorAll('.swiper_scroll');
  if (sliderScrollItems.length > 0) {
    for (let index = 0; index < sliderScrollItems.length; index++) {
      const sliderScrollItem = sliderScrollItems[index];
      const sliderScrollBar =
        sliderScrollItem.querySelector('.swiper-scrollbar');
      const sliderScroll = new Swiper(sliderScrollItem, {
        observer: true,
        observeParents: true,
        direction: 'vertical',
        slidesPerView: 'auto',
        freeMode: {
          enabled: true,
        },
        scrollbar: {
          el: sliderScrollBar,
          draggable: true,
          snapOnRelease: false,
        },
        mousewheel: {
          releaseOnEdges: true,
        },
      });
      sliderScroll.scrollbar.updateSize();
    }
  }
}

window.addEventListener('load', function (e) {
  // Запуск инициализации слайдеров
  initSliders();
  // Запуск инициализации скролла на базе слайдера (по классу swiper_scroll)
  //initSlidersScroll();
});

const resizableSwiper = (breakpoint, swiperClass, swiperSettings, callback) => {
  let swiper;

  breakpoint = window.matchMedia(breakpoint);

  const enableSwiper = function (className, settings) {
    swiper = new Swiper(className, settings);

    if (callback) {
      callback(swiper);
    }
  };

  const checker = function () {
    // console.log('CHANGE');
    if (breakpoint.matches) {
      console.log('da');
      return enableSwiper(swiperClass, swiperSettings);
    } else {
      if (swiper !== undefined) {
        console.log('net');
        swiper.destroy(true, true);
        return;
      }
    }
  };

  breakpoint.addEventListener('change', checker);
  checker();
};

if (document.querySelector('.portfolio__slider')) {
  new Swiper('.portfolio__slider', {
    // Подключаем модули слайдера
    // для конкретного случая
    //modules: [Navigation, Pagination],
    modules: [Navigation],

    // effect: 'fade',
    // autoplay: {
    //   delay: 2500,
    //   disableOnInteraction: false,
    // },

    // observer: true,
    // observeParents: true,
    slidesPerView: 'auto',
    spaceBetween: 30,
    centeredSlides: true,
    // autoHeight: true,
    speed: 800,
    // touchRatio: 0,
    //simulateTouch: false,
    loop: true,
    //preloadImages: false,
    lazy: true,
    // Dotts
    // pagination: {
    // 	el: '.service__pagination',
    // 	clickable: true,
    // },
    // Arrows
    navigation: {
      prevEl: '.portfolio__nav .slider-nav__btn--prev',
      nextEl: '.portfolio__nav .slider-nav__btn--next',
    },
    breakpoints: {
      0: {
        slidesPerView: 'auto',
        spaceBetween: 30,
      },
      320: {},
      768: {
        centeredSlides: false,
      },
      992: {},
      1268: {},
    },

    on: {},
  });
}

if (document.querySelector('.promotion__slider')) {
  new Swiper('.promotion__slider', {
    // Подключаем модули слайдера
    // для конкретного случая
    //modules: [Navigation, Pagination],
    modules: [Pagination],

    // effect: 'fade',
    // autoplay: {
    //   delay: 2500,
    //   disableOnInteraction: false,
    // },

    observer: true,
    // observeParents: true,
    slidesPerView: 'auto',
    spaceBetween: 0,
    centeredSlides: true,
    // autoHeight: true,
    speed: 800,
    // touchRatio: 0,
    //simulateTouch: false,
    loop: true,
    //preloadImages: false,
    lazy: true,
    // Dotts
    pagination: {
      el: '.promotion__dots',
      clickable: true,
    },
    // Arrows
    // navigation: {
    // 	prevEl: '.portfolio__pagination .portfolio__slider-btn--prev',
    // 	nextEl: '.portfolio__pagination .portfolio__slider-btn--next',
    // },
    // breakpoints: {
    // 	0: {
    // 		slidesPerView: 1,
    // 		spaceBetween: 30,
    // 	},
    // 	320: {
    // 	},
    // 	768: {
    // 	},
    // 	992: {
    // 	},
    // 	1268: {
    // 	},
    // },

    on: {},
  });
}

if (document.querySelector('.info__slider')) {
  resizableSwiper('(max-width: 1365px)', '.info__slider', {
    // Подключаем модули слайдера
    // для конкретного случая
    // modules: [Navigation, Pagination],
    modules: [Navigation],

    // effect: 'fade',
    // autoplay: {
    //   delay: 2500,
    //   disableOnInteraction: false,
    // },

    // observer: true,
    // observeParents: true,
    slidesPerView: 'auto',
    centeredSlides: true,
    spaceBetween: 30,
    // autoHeight: true,
    speed: 800,
    // touchRatio: 0,
    //simulateTouch: false,
    //loop: true,
    //preloadImages: false,
    //lazy: true,
    // Dotts
    // pagination: {
    //   el: '.reviews__pagination',
    //   clickable: true,
    // },
    // Arrows
    navigation: {
      nextEl: `.info__nav .slider-nav__btn--next`,
      prevEl: `.info__nav .slider-nav__btn--prev`,
    },
    // breakpoints: {
    // 	0: {
    // 		slidesPerView: 1,
    // 		spaceBetween: 30,
    // 	},
    // 	// 320: {
    // 	// 	slidesPerView: "auto",
    // 	// 	spaceBetween: 28,
    // 	// },
    // 	// 768: {
    // 	// 	slidesPerView: 2,
    // 	// 	spaceBetween: 30,
    // 	// },
    // 	// 992: {
    // 	// },
    // 	// 1268: {
    // 	// 	slidesPerView: 1,
    // 	// 	spaceBetween: 44,
    // 	// },
    // },

    on: {},
  });
}

if (document.querySelector('.service-content__slider')) {
  new Swiper('.service-content__slider', {
    // Подключаем модули слайдера
    // для конкретного случая
    //modules: [Navigation, Pagination],
    modules: [Navigation],

    // effect: 'fade',
    // autoplay: {
    //   delay: 2500,
    //   disableOnInteraction: false,
    // },

    // observer: true,
    // observeParents: true,
    // slidesPerView: 'auto',
    // spaceBetween: 30,
    centeredSlides: true,
    // autoHeight: true,
    speed: 800,
    // touchRatio: 0,
    //simulateTouch: false,
    loop: true,
    //preloadImages: false,
    lazy: true,
    // Dotts
    // pagination: {
    // 	el: '.service__pagination',
    // 	clickable: true,
    // },
    // Arrows
    navigation: {
      prevEl: '.service-content__nav .slider-nav__btn--prev',
      nextEl: '.service-content__nav .slider-nav__btn--next',
    },
    breakpoints: {
      0: {
        slidesPerView: 'auto',
        spaceBetween: 15,
      },
      320: {},
      500: {
        slidesPerView: 'auto',
        spaceBetween: 30,
      },
      // 768: {
      //   // centeredSlides: false,
      // },
      992: {
        slidesPerView: 'auto',
        spaceBetween: 30,
        centeredSlides: false,
      },
      // 1268: {},
    },

    on: {},
  });
}

if (document.querySelector('.masters')) {
  const sliders = document.querySelectorAll('.certificates__slider');
  // console.log(sliders);
  for (let i = 0; i < sliders.length; i++) {
    const slider = sliders[i];
    let classSlider = `certificates__slider_${i}`;
    slider.classList.add(classSlider);

    new Swiper(`.${classSlider}`, {
      // Подключаем модули слайдера
      // для конкретного случая
      //modules: [Navigation, Pagination],
      modules: [Navigation],

      // effect: 'fade',
      // autoplay: {
      //   delay: 2500,
      //   disableOnInteraction: false,
      // },

      // observer: true,
      // observeParents: true,
      // slidesPerView: 1,
      // spaceBetween: 30,
      // autoHeight: true,
      speed: 800,
      // touchRatio: 0,
      //simulateTouch: false,
      loop: true,
      //preloadImages: false,
      //lazy: true,
      // Dotts
      // pagination: {
      // 	el: '.desc__slider-pagination',
      // 	clickable: true,
      // },
      // Arrows
      navigation: {
        nextEl: `.${classSlider} ~ .slider-nav .slider-nav__btn--next`,
        prevEl: `.${classSlider} ~ .slider-nav .slider-nav__btn--prev`,
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        320: {},
        768: {
          slidesPerView: 2,
          spaceBetween: 30,
        },
        992: {
          // slidesPerView: "auto",
          // spaceBetween: 20,
        },
        1366: {
          slidesPerView: 2,
          spaceBetween: 30,
        },
      },

      on: {},
    });
  }
}

if (document.querySelector('.courses-body-list__slider')) {
  resizableSwiper('(max-width: 1365px)', '.courses-body-list__slider', {
    // Подключаем модули слайдера
    // для конкретного случая
    // modules: [Navigation, Pagination],
    modules: [Navigation],

    // effect: 'fade',
    // autoplay: {
    //   delay: 2500,
    //   disableOnInteraction: false,
    // },

    // observer: true,
    // observeParents: true,
    // slidesPerView: "auto",
    centeredSlides: true,
    spaceBetween: 30,
    // autoHeight: true,
    speed: 800,
    // touchRatio: 0,
    //simulateTouch: false,
    //loop: true,
    //preloadImages: false,
    //lazy: true,
    // Dotts
    // pagination: {
    //   el: '.reviews__pagination',
    //   clickable: true,
    // },
    // Arrows
    navigation: {
      prevEl: '.courses-body-list__nav .slider-nav__btn--prev',
      nextEl: '.courses-body-list__nav .slider-nav__btn--next',
    },
    breakpoints: {
      0: {
        slidesPerView: 'auto',
        spaceBetween: 15,
      },
      // 320: {},
      500: {
        slidesPerView: 'auto',
        spaceBetween: 30,
      },
      // 768: {
      //   // centeredSlides: false,
      // },
      // 992: {},
      // 1268: {},
    },

    on: {},
  });
}
