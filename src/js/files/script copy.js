// Подключение функционала "Чертогов Фрилансера"
// import { log } from 'gulp-util';
// import { lightGalleryCoreSettings } from 'lightgallery/lg-settings.js';
import { isMobile, menuClose, menuOpen, _slideUp, _slideDown } from './functions.js';
// Подключение списка активных модулей
import { flsModules } from './modules.js';
// import { log } from 'gulp-util';

const menuItemHasChildrenArr = document.querySelectorAll(
  '.menu-item-has-children .sub-menu'
);
menuItemHasChildrenArr.forEach((el) => {
  const element = el.parentElement.firstElementChild;

  element.classList.add('_icon-arrow');
  element.setAttribute('data-spoller', '');
});

const menuItemHasChildrenListArr = document.querySelectorAll('.menu__list > .menu-item-has-children');
function addNestedClass(menu, level) {
  if (menu) {
    menu.forEach((el) => {
      // console.dir(el.lastElementChild);
      if (el.lastElementChild.classList.contains('sub-menu')) {
        el.lastElementChild.classList.add(`level-${level}`);
        addNestedClass(
          el.querySelectorAll('.menu-item-has-children'),
          level + 1
        );
      }
    });
  }
}
addNestedClass(menuItemHasChildrenListArr, 1);



// function menu() {
//   const menu = document.querySelector('.menu');
//   const breakpointMenu = '(min-width: 1024px)';

//   const menuItems = document.querySelectorAll('.menu-item');
//   const subMenus = document.querySelectorAll('.sub-menu');

//   // console.log(menuItems.length);

//   menuItems.forEach(el => {

//     if (el.closest('.header')) {
//       el.classList.add('menu-item_h')
//     }
//     if (el.closest('.footer')) {
//       el.classList.add('menu-item_f')
//     }
//   });

//   subMenus.forEach(el => {

//     if (el.closest('.header')) {
//       el.classList.add('sub-menu_h')
//     }
//     if (el.closest('.footer')) {
//       el.classList.add('sub-menu_f')
//     }
//   });

//   if (window.matchMedia(breakpointMenu).matches) {
//     menu.onmouseover = menu.onmouseout = handler;
//     function handler(event) {
//       let menuItem = event.target.closest('.menu-item-has-children a');
//       if (menuItem) {
//         // menuItem.parentElement.classList.toggle('_open-sub-menu');
//         // if (event.type == 'mouseover') {
//         //   menuItem.parentElement.classList.add('_open-sub-menu');
//         // } else if (event.type == 'mouseout') {
//         //   menuItem.parentElement.classList.remove('_open-sub-menu');
//         // }
//       }
//     }

//     const menus = document.querySelectorAll('.menu__list');

//     if (menus) {
//       menus.forEach((menu) => {
//         menu.onmouseover = function (event) {
//           //клик
//           // if (event.target.nodeName === 'A' && event.target.closest('.menu-item-has-children')) {
//           //   console.log('da');
//           // }

//           if (event.target.hasAttribute('data-spoller')) {
//             closeAllSubMenu(event.target.nextElementSibling);
//             event.target.nextElementSibling.classList.toggle('sub-menu_open');
//             event.target.parentNode.classList.toggle('menu-item_active');

//             event.target.addEventListener('click', preventClick);

//             function preventClick(event) {
//               if (event.target.getAttribute('href') === '#') {
//                 event.preventDefault();
//               }
//             }
//           }
//         };

//         function closeAllSubMenu(currentMenu = null) {
//           const parents = [];

//           if (currentMenu) {
//             let currentParent = currentMenu.parentNode;

//             while (currentParent) {
//               if (currentParent.classList.contains('menu__list')) break;
//               if (currentParent.nodeName === 'UL') parents.push(currentParent);
//               currentParent = currentParent.parentNode;
//             }
//           }

//           const subMenuArr = document.querySelectorAll('.sub-menu');
//           subMenuArr.forEach((subMenu) => {
//             if (subMenu !== currentMenu && !parents.includes(subMenu)) {
//               subMenu.classList.remove('sub-menu_open');
//               subMenu.parentNode.classList.remove('menu-item_active');
//             }
//           });
//         }

//         menu.onmouseleave = closeAllSubMenu;
//       });
//     }
//   }
// }
// menu();
// window.addEventListener('resize', menu);

function menu() {
  // Замена элементов <a> в родителях с классом menu-item-has-children
  const parentItems = document.querySelectorAll('.menu-item-has-children > a');

  parentItems.forEach(item => {
    const parent = item.parentElement;
    const newHeader = document.createElement('div');
    newHeader.classList.add('main-item');

    const newAnchor = document.createElement('a');
    newAnchor.href = item.href;
    newAnchor.innerText = item.innerText;

    const newButton = document.createElement('div');
    newButton.classList.add('main-item__btn');
    newButton.classList.add('_icon-arrow');

    newHeader.appendChild(newAnchor);
    newHeader.appendChild(newButton);

    parent.insertBefore(newHeader, item);
    parent.removeChild(item);
    console.log('ready');
  });


  const menu = document.querySelector('.menu');
  const breakpointMenu = '(min-width: 992px)';
  const breakpointMenuMax = '(max-width: 991.98px)';

  const menuItems = document.querySelectorAll('.menu-item');
  const subMenus = document.querySelectorAll('.sub-menu');

  menuItems.forEach(el => {
      if (el.closest('.header')) {
          el.classList.add('menu-item_h')
      }
      if (el.closest('.footer')) {
          el.classList.add('menu-item_f')
      }
  });

  subMenus.forEach(el => {
      if (el.closest('.header')) {
          el.classList.add('sub-menu_h')
      }
      if (el.closest('.footer')) {
          el.classList.add('sub-menu_f')
      }
  });


  if (window.matchMedia(breakpointMenu).matches) {
    closeAllSubMenu();
    menu.onmouseover = menu.onmouseout = handler;
    function handler(event) {
        let menuItem = event.target.closest('.menu-item-has-children .main-item');
        if (menuItem) {
        }
    }

    const menus = document.querySelectorAll('.menu__list');

    if (menus) {
        menus.forEach((menu) => {
          menu.onmouseover = function (event) {
            const targetElement = event.target;
            if (targetElement.closest('.main-item')) {
                const mainItem = targetElement.closest('.main-item');
                const menuItemHasChildren = mainItem.closest('.menu-item-has-children');
                const subMenu = menuItemHasChildren.querySelector('.sub-menu');

                closeAllSubMenu(subMenu);
                subMenu.classList.toggle('sub-menu_open');
                menuItemHasChildren.classList.toggle('menu-item_active');

                // targetElement.addEventListener('click', preventClick);

                // function preventClick(event) {
                //     if (targetElement.getAttribute('href') === '#') {
                //         event.preventDefault();
                //     }
                // }
            }
        };

          function closeAllSubMenu(currentMenu = null) {
              const parents = [];

              if (currentMenu) {
                  let currentParent = currentMenu.parentNode;

                  while (currentParent) {
                      if (currentParent.classList.contains('menu__list')) break;
                      if (currentParent.nodeName === 'UL') parents.push(currentParent);
                      currentParent = currentParent.parentNode;
                  }
              }

              const subMenuArr = document.querySelectorAll('.sub-menu');
              subMenuArr.forEach((subMenu) => {
                  if (subMenu !== currentMenu && !parents.includes(subMenu)) {
                      subMenu.classList.remove('sub-menu_open');
                      subMenu.parentNode.classList.remove('menu-item_active');
                  }
              });
          }

          menu.onmouseleave = closeAllSubMenu;
        });
    }
  } else if (window.matchMedia(breakpointMenuMax).matches) {
    const menu = document.querySelector('.header .menu__list');
    const allBtns = menu.querySelectorAll('.main-item__btn');
  
    allBtns.forEach(btn => {
      btn.addEventListener('click', function(e) {
        const parentItem = btn.closest('.menu-item-has-children');
        parentItem.classList.toggle('sub-menu_open');
        _slideDown(parentItem.children[1], 200);

      });
    });
}
  
}
menu();
window.addEventListener('resize', menu);

//Тарифы
document.addEventListener('DOMContentLoaded', function() {
  const navItems = document.querySelectorAll('.tariffs__nav-item');
  const tariffItems = document.querySelectorAll('.tariffs__item');
  let activeIndex = 0;  // Переменная для хранения активного индекса

  function handleTabClick(event) {
      if (window.innerWidth <= 992) {
          const clickedIndex = Array.from(navItems).indexOf(event.currentTarget);
          activeIndex = clickedIndex;  // Обновляем активный индекс
          updateActiveClass(clickedIndex);
      }
  }

  function handleResize() {
      if (window.innerWidth > 992) {
          navItems.forEach(item => {
              item.classList.remove('active');
          });
          tariffItems.forEach(item => {
              item.classList.remove('active');
          });
      } else {
          updateActiveClass(activeIndex);  // Восстанавливаем активный класс при уменьшении ширины
      }
  }

  function updateActiveClass(index) {
      navItems.forEach((item, i) => {
          item.classList.toggle('active', i === index);
      });
      tariffItems.forEach((item, i) => {
          item.classList.toggle('active', i === index);
      });
  }

  navItems.forEach(item => {
      item.addEventListener('click', handleTabClick);
  });

  window.addEventListener('resize', handleResize);

  // Initial check on page load
  if (window.innerWidth <= 992) {
      updateActiveClass(activeIndex);
  }
});


//slider 
// function slider() {
//   const descs = document.querySelector('.cruise-route__descs-items');
//   const images = document.querySelector('.cruise-route__images');
//   const days = document.querySelector('.cruise-route__days');
//   const daysLength = descs.children.length;

//   function buildDaysSpan(node) {
//     for (let i = 0; i < 10; i++) {
//       let day = document.createElement('span');
//       node.append(day);
//     }
//   }

//   if (daysLength >= 1) {
//     let row1 = document.createElement('div');
//     row1.classList.add('cruise-route__days-row');
//     row1.classList.add('cruise-route__days-row_1');
//     buildDaysSpan(row1);
//     days.append(row1);
//   }
//   if (daysLength > 10) {
//     let row2 = document.createElement('div');
//     row2.classList.add('cruise-route__days-row');
//     row2.classList.add('cruise-route__days-row_2');
//     buildDaysSpan(row2);
//     days.append(row2);
//   }
//   if (daysLength > 20) {
//     let row3 = document.createElement('div');
//     row3.classList.add('cruise-route__days-row');
//     row3.classList.add('cruise-route__days-row_3');
//     row3.classList.add('hidden');
//     buildDaysSpan(row3);
//     days.append(row3);
//   }

//   const spans = days.querySelectorAll('span');
//   for (let i = 0; i < daysLength; i++) {
//     spans[i].classList.add('day');

//     let span1 = document.createElement('span');
//     span1.innerHTML = `${i + 1}`;
//     let span2 = document.createElement('span');
//     span2.innerHTML = ` день`;

//     spans[i].append(span1);
//     spans[i].append(span2);

//     if (i == 0) {
//       spans[i].classList.add('active');
//     }
//   }

//   descs.children[0].classList.add('active');
//   images.children[0].classList.add('active');

//   const btnPrev = document.querySelector('.nav-cruise-route__btn_prev');
//   const btnNext = document.querySelector('.nav-cruise-route__btn_next');

//   const daysQuantity = days.querySelectorAll('.day');

//   let currentEl = 0;

//   function updateActiveElements(index) {
//     descs.children[currentEl].classList.remove('active');
//     images.children[currentEl].classList.remove('active');
//     daysQuantity[currentEl].classList.remove('active');
//     currentEl = index;
//     descs.children[currentEl].classList.add('active');
//     images.children[currentEl].classList.add('active');
//     daysQuantity[currentEl].classList.add('active');

//     if (currentEl >= 20) {
//       document.querySelector('.cruise-route__days-row_1').classList.add('hidden');
//       document.querySelector('.cruise-route__days-row_2').classList.add('hidden');
//       document.querySelector('.cruise-route__days-row_3').classList.remove('hidden');
//     } else if (currentEl >= 10) {
//       document.querySelector('.cruise-route__days-row_1').classList.remove('hidden');
//       document.querySelector('.cruise-route__days-row_2').classList.remove('hidden');
//       document.querySelector('.cruise-route__days-row_3').classList.add('hidden');
//     } else {
//       document.querySelector('.cruise-route__days-row_1').classList.remove('hidden');
//       if (daysLength > 10) {
//         document.querySelector('.cruise-route__days-row_2').classList.remove('hidden');
//       }
//       if (daysLength > 20) {
//         document.querySelector('.cruise-route__days-row_3').classList.add('hidden');
//       }
//     }
//   }

//   btnPrev.addEventListener('click', () => {
//     let newIndex = (currentEl - 1 + descs.children.length) % descs.children.length;
//     updateActiveElements(newIndex);
//   });

//   btnNext.addEventListener('click', () => {
//     let newIndex = (currentEl + 1) % descs.children.length;
//     updateActiveElements(newIndex);
//   });

//   daysQuantity.forEach((day, index) => {
//     day.addEventListener('click', () => {
//       updateActiveElements(index);
//     });
//   });

//   document.addEventListener('keydown', function(event) {
//     const activeDay = document.querySelector('.day.active');
//     let nextDay;
  
//     if (event.key === 'ArrowLeft') {
//       let newIndex = (currentEl - 1 + descs.children.length) % descs.children.length;
//       updateActiveElements(newIndex);
//     } else if (event.key === 'ArrowRight') {
//       let newIndex = (currentEl + 1) % descs.children.length;
//       updateActiveElements(newIndex);
//     }
  
//     if (nextDay) {
//       updateActiveElements([...daysQuantity].indexOf(nextDay));
//     }
//   });

// }

// const bodySlider = document.querySelector('.cruise-route__body');
// if (bodySlider) {
//   slider();
// }

//новый

// function slider() {
//   const descs = document.querySelector('.cruise-route__descs-items');
//   const images = document.querySelector('.cruise-route__images');
//   const days = document.querySelector('.cruise-route__days');
//   const daysLength = descs.children.length;

//   function buildDaysSpan(node, count) {
//     for (let i = 0; i < count; i++) {
//       let day = document.createElement('span');
//       node.append(day);
//     }
//   }

//   const rows = Math.ceil(daysLength / 10);
//   for (let i = 0; i < rows; i++) {
//     let row = document.createElement('div');
//     row.classList.add('cruise-route__days-row');
//     row.classList.add(`cruise-route__days-row_${i + 1}`);
//     if (i > 1) row.classList.add('hidden'); // Скрываем строки начиная с третьей
//     buildDaysSpan(row, Math.min(10, daysLength - i * 10));
//     days.append(row);
//   }

//   const spans = days.querySelectorAll('span');
//   for (let i = 0; i < daysLength; i++) {
//     spans[i].classList.add('day');

//     let span1 = document.createElement('span');
//     span1.innerHTML = `${i + 1}`;
//     let span2 = document.createElement('span');
//     span2.innerHTML = ` день`;

//     spans[i].append(span1);
//     spans[i].append(span2);

//     if (i == 0) {
//       spans[i].classList.add('active');
//     }
//   }

//   descs.children[0].classList.add('active');
//   images.children[0].classList.add('active');

//   const btnPrev = document.querySelector('.nav-cruise-route__btn_prev');
//   const btnNext = document.querySelector('.nav-cruise-route__btn_next');

//   const daysQuantity = days.querySelectorAll('.day');

//   let currentEl = 0;

//   function updateActiveElements(index) {
//     descs.children[currentEl].classList.remove('active');
//     images.children[currentEl].classList.remove('active');
//     daysQuantity[currentEl].classList.remove('active');
//     currentEl = index;
//     descs.children[currentEl].classList.add('active');
//     images.children[currentEl].classList.add('active');
//     daysQuantity[currentEl].classList.add('active');

//     const currentRow = Math.floor(currentEl / 10) + 1;
//     const nextRow = currentRow + 1;

//     document.querySelectorAll('.cruise-route__days-row').forEach((row, idx) => {
//       if (idx + 1 === currentRow || idx + 1 === nextRow) {
//         row.classList.remove('hidden');
//       } else {
//         row.classList.add('hidden');
//       }
//     });
//   }

//   btnPrev.addEventListener('click', () => {
//     let newIndex = (currentEl - 1 + descs.children.length) % descs.children.length;
//     updateActiveElements(newIndex);
//   });

//   btnNext.addEventListener('click', () => {
//     let newIndex = (currentEl + 1) % descs.children.length;
//     updateActiveElements(newIndex);
//   });

//   daysQuantity.forEach((day, index) => {
//     day.addEventListener('click', () => {
//       updateActiveElements(index);
//     });
//   });

//   document.addEventListener('keydown', function(event) {
//     if (event.key === 'ArrowLeft') {
//       let newIndex = (currentEl - 1 + descs.children.length) % descs.children.length;
//       updateActiveElements(newIndex);
//     } else if (event.key === 'ArrowRight') {
//       let newIndex = (currentEl + 1) % descs.children.length;
//       updateActiveElements(newIndex);
//     }
//   });
// }
// const bodySlider = document.querySelector('.cruise-route__body');
// if (bodySlider) {
//   slider();
// }

// новее

// function slider() {
//   const descs = document.querySelector('.cruise-route__descs-items');
//   const images = document.querySelector('.cruise-route__images');
//   const days = document.querySelector('.cruise-route__days');
//   const daysLength = descs.children.length;

//   function buildDaysSpan(node, count) {
//     for (let i = 0; i < count; i++) {
//       let day = document.createElement('span');
//       node.append(day);
//     }
//   }

//   if (daysLength <= 10) {
//     let row = document.createElement('div');
//     row.classList.add('cruise-route__days-row');
//     row.classList.add('cruise-route__days-row_1');
//     buildDaysSpan(row, daysLength);
//     days.append(row);
//   } else {
//     const rows = Math.ceil(daysLength / 10);
//     for (let i = 0; i < rows; i++) {
//       let row = document.createElement('div');
//       row.classList.add('cruise-route__days-row');
//       row.classList.add(`cruise-route__days-row_${i + 1}`);
//       if (i > 1) row.classList.add('hidden'); // Скрываем строки начиная с третьей
//       buildDaysSpan(row, Math.min(10, daysLength - i * 10));
//       days.append(row);
//     }
//   }

//   const spans = days.querySelectorAll('span');
//   for (let i = 0; i < daysLength; i++) {
//     spans[i].classList.add('day');

//     let span1 = document.createElement('span');
//     span1.innerHTML = `${i + 1}`;
//     let span2 = document.createElement('span');
//     span2.innerHTML = ` день`;

//     spans[i].append(span1);
//     spans[i].append(span2);

//     if (i == 0) {
//       spans[i].classList.add('active');
//     }
//   }

//   descs.children[0].classList.add('active');
//   images.children[0].classList.add('active');

//   const btnPrev = document.querySelector('.nav-cruise-route__btn_prev');
//   const btnNext = document.querySelector('.nav-cruise-route__btn_next');

//   const daysQuantity = days.querySelectorAll('.day');

//   let currentEl = 0;

//   function updateActiveElements(index) {
//     descs.children[currentEl].classList.remove('active');
//     images.children[currentEl].classList.remove('active');
//     daysQuantity[currentEl].classList.remove('active');
//     currentEl = index;
//     descs.children[currentEl].classList.add('active');
//     images.children[currentEl].classList.add('active');
//     daysQuantity[currentEl].classList.add('active');

//     const currentRow = Math.floor(currentEl / 10) + 1;
//     const nextRow = currentRow + 1;

//     document.querySelectorAll('.cruise-route__days-row').forEach((row, idx) => {
//       if (idx + 1 === currentRow || idx + 1 === nextRow) {
//         row.classList.remove('hidden');
//       } else {
//         row.classList.add('hidden');
//       }
//     });
//   }

//   btnPrev.addEventListener('click', () => {
//     let newIndex = (currentEl - 1 + descs.children.length) % descs.children.length;
//     updateActiveElements(newIndex);
//   });

//   btnNext.addEventListener('click', () => {
//     let newIndex = (currentEl + 1) % descs.children.length;
//     updateActiveElements(newIndex);
//   });

//   daysQuantity.forEach((day, index) => {
//     day.addEventListener('click', () => {
//       updateActiveElements(index);
//     });
//   });

//   document.addEventListener('keydown', function(event) {
//     if (event.key === 'ArrowLeft') {
//       let newIndex = (currentEl - 1 + descs.children.length) % descs.children.length;
//       updateActiveElements(newIndex);
//     } else if (event.key === 'ArrowRight') {
//       let newIndex = (currentEl + 1) % descs.children.length;
//       updateActiveElements(newIndex);
//     }
//   });
// }
// const bodySlider = document.querySelector('.cruise-route__body');
// if (bodySlider) {
//   slider();
// }


// самый новый
// function slider() {
//   const descs = document.querySelector('.cruise-route__descs-items');
//   const images = document.querySelector('.cruise-route__images');
//   const days = document.querySelector('.cruise-route__days');
//   const daysLength = descs.children.length;

//   function buildDaysSpan(node, count) {
//     for (let i = 0; i < count; i++) {
//       let day = document.createElement('span');
//       node.append(day);
//     }
//   }

//   if (daysLength <= 10) {
//     let row = document.createElement('div');
//     row.classList.add('cruise-route__days-row');
//     row.classList.add('cruise-route__days-row_1');
//     row.style.gridTemplateColumns = `repeat(${daysLength}, 1fr)`;
//     buildDaysSpan(row, daysLength);
//     days.append(row);
//   } else {
//     // First row for first 10 elements
//     let firstRow = document.createElement('div');
//     firstRow.classList.add('cruise-route__days-row');
//     firstRow.classList.add('cruise-route__days-row_1');
//     buildDaysSpan(firstRow, 10);
//     days.append(firstRow);

//     // Additional rows for remaining elements
//     const rows = Math.ceil((daysLength - 10) / 10);
//     for (let i = 0; i < rows; i++) {
//       let row = document.createElement('div');
//       row.classList.add('cruise-route__days-row');
//       row.classList.add(`cruise-route__days-row_${i + 2}`);
//       row.classList.add('hidden'); // Hide rows starting from the second
//       buildDaysSpan(row, Math.min(10, daysLength - (i + 1) * 10));
//       days.append(row);
//     }
//   }

//   const spans = days.querySelectorAll('span');
//   for (let i = 0; i < daysLength; i++) {
//     spans[i].classList.add('day');

//     let span1 = document.createElement('span');
//     span1.innerHTML = `${i + 1}`;
//     let span2 = document.createElement('span');
//     span2.innerHTML = ` день`;

//     spans[i].append(span1);
//     spans[i].append(span2);

//     if (i == 0) {
//       spans[i].classList.add('active');
//     }
//   }

//   descs.children[0].classList.add('active');
//   images.children[0].classList.add('active');

//   const btnPrev = document.querySelector('.nav-cruise-route__btn_prev');
//   const btnNext = document.querySelector('.nav-cruise-route__btn_next');

//   const daysQuantity = days.querySelectorAll('.day');

//   let currentEl = 0;

//   function updateActiveElements(index) {
//     descs.children[currentEl].classList.remove('active');
//     images.children[currentEl].classList.remove('active');
//     daysQuantity[currentEl].classList.remove('active');
//     currentEl = index;
//     descs.children[currentEl].classList.add('active');
//     images.children[currentEl].classList.add('active');
//     daysQuantity[currentEl].classList.add('active');

//     const currentRow = Math.floor(currentEl / 10) + 1;
//     const nextRow = currentRow + 1;

//     document.querySelectorAll('.cruise-route__days-row').forEach((row, idx) => {
//       if (idx + 1 === currentRow || (idx + 1 === nextRow && currentRow === 1)) {
//         row.classList.remove('hidden');
//       } else {
//         row.classList.add('hidden');
//       }
//     });
//   }

//   btnPrev.addEventListener('click', () => {
//     let newIndex = (currentEl - 1 + descs.children.length) % descs.children.length;
//     updateActiveElements(newIndex);
//   });

//   btnNext.addEventListener('click', () => {
//     let newIndex = (currentEl + 1) % descs.children.length;
//     updateActiveElements(newIndex);
//   });

//   daysQuantity.forEach((day, index) => {
//     day.addEventListener('click', () => {
//       updateActiveElements(index);
//     });
//   });

//   document.addEventListener('keydown', function(event) {
//     if (event.key === 'ArrowLeft') {
//       let newIndex = (currentEl - 1 + descs.children.length) % descs.children.length;
//       updateActiveElements(newIndex);
//     } else if (event.key === 'ArrowRight') {
//       let newIndex = (currentEl + 1) % descs.children.length;
//       updateActiveElements(newIndex);
//     }
//   });
// }

// const bodySlider = document.querySelector('.cruise-route__body');
// if (bodySlider) {
//   slider();
// }


// function slider() {
//   const descs = document.querySelector('.cruise-route__descs-items');
//   const images = document.querySelector('.cruise-route__images');
//   const days = document.querySelector('.cruise-route__days');
//   const daysLength = descs.children.length;

//   function buildDaysSpan(node, count, startIndex) {
//     for (let i = 0; i < count; i++) {
//       let day = document.createElement('span');
//       day.classList.add('day');

//       let span1 = document.createElement('span');
//       span1.innerHTML = `${startIndex + i + 1}`;
//       let span2 = document.createElement('span');
//       span2.innerHTML = ` день`;

//       day.append(span1);
//       day.append(span2);

//       node.append(day);
//     }
//   }

//   const rows = Math.ceil(daysLength / 10);
//   const minItemsPerRow = Math.floor(daysLength / rows);
//   const extraItems = daysLength % rows;

//   let currentIndex = 0;
//   for (let i = 0; i < rows; i++) {
//     let row = document.createElement('div');
//     row.classList.add('cruise-route__days-row');
//     row.classList.add(`cruise-route__days-row_${i + 1}`);
//     if (i > 1) row.classList.add('hidden'); // Скрываем строки начиная с третьей

//     const itemsInRow = i < extraItems ? minItemsPerRow + 1 : minItemsPerRow;
//     buildDaysSpan(row, itemsInRow, currentIndex);
//     days.append(row);
//     currentIndex += itemsInRow;
//   }

//   const spans = days.querySelectorAll('.day');
//   if (spans.length > 0) {
//     spans[0].classList.add('active');
//   }

//   descs.children[0].classList.add('active');
//   images.children[0].classList.add('active');

//   const btnPrev = document.querySelector('.nav-cruise-route__btn_prev');
//   const btnNext = document.querySelector('.nav-cruise-route__btn_next');

//   let currentEl = 0;

//   function updateActiveElements(index) {
//     descs.children[currentEl].classList.remove('active');
//     images.children[currentEl].classList.remove('active');
//     spans[currentEl].classList.remove('active');
//     currentEl = index;
//     descs.children[currentEl].classList.add('active');
//     images.children[currentEl].classList.add('active');
//     spans[currentEl].classList.add('active');

//     const currentRow = Math.floor(currentEl / 10) + 1;
//     const nextRow = currentRow + 1;

//     document.querySelectorAll('.cruise-route__days-row').forEach((row, idx) => {
//       if (idx + 1 === currentRow || idx + 1 === nextRow) {
//         row.classList.remove('hidden');
//       } else {
//         row.classList.add('hidden');
//       }
//     });
//   }

//   btnPrev.addEventListener('click', () => {
//     let newIndex = (currentEl - 1 + descs.children.length) % descs.children.length;
//     updateActiveElements(newIndex);
//   });

//   btnNext.addEventListener('click', () => {
//     let newIndex = (currentEl + 1) % descs.children.length;
//     updateActiveElements(newIndex);
//   });

//   spans.forEach((day, index) => {
//     day.addEventListener('click', () => {
//       updateActiveElements(index);
//     });
//   });

//   document.addEventListener('keydown', function(event) {
//     if (event.key === 'ArrowLeft') {
//       let newIndex = (currentEl - 1 + descs.children.length) % descs.children.length;
//       updateActiveElements(newIndex);
//     } else if (event.key === 'ArrowRight') {
//       let newIndex = (currentEl + 1) % descs.children.length;
//       updateActiveElements(newIndex);
//     }
//   });
// }

// const bodySlider = document.querySelector('.cruise-route__body');
// if (bodySlider) {
//   slider();
// }

// function slider() {
//   const descs = document.querySelector('.cruise-route__descs-items');
//   const images = document.querySelector('.cruise-route__images');
//   const days = document.querySelector('.cruise-route__days');
//   const daysLength = descs.children.length;

//   function buildDaysSpan(node, count, startIndex) {
//     for (let i = 0; i < count; i++) {
//       let day = document.createElement('span');
//       day.classList.add('day');

//       let span1 = document.createElement('span');
//       span1.innerHTML = `${startIndex + i + 1}`;
//       let span2 = document.createElement('span');
//       span2.innerHTML = ` день`;

//       day.append(span1);
//       day.append(span2);

//       node.append(day);
//     }
//   }

//   const rows = Math.ceil(daysLength / 10);
//   const minItemsPerRow = Math.floor(daysLength / rows);
//   const extraItems = daysLength % rows;

//   let currentIndex = 0;
//   for (let i = 0; i < rows; i++) {
//     let row = document.createElement('div');
//     row.classList.add('cruise-route__days-row');
//     row.classList.add(`cruise-route__days-row_${i + 1}`);
//     if (i > 1) row.classList.add('hidden'); // Скрываем строки начиная с третьей

//     const itemsInRow = i < extraItems ? minItemsPerRow + 1 : minItemsPerRow;
//     row.style.gridTemplateColumns = `repeat(${itemsInRow}, 1fr)`;
//     buildDaysSpan(row, itemsInRow, currentIndex);
//     days.append(row);
//     currentIndex += itemsInRow;
//   }

//   const spans = days.querySelectorAll('.day');
//   if (spans.length > 0) {
//     spans[0].classList.add('active');
//   }

//   descs.children[0].classList.add('active');
//   images.children[0].classList.add('active');

//   const btnPrev = document.querySelector('.nav-cruise-route__btn_prev');
//   const btnNext = document.querySelector('.nav-cruise-route__btn_next');

//   let currentEl = 0;

//   function updateActiveElements(index) {
//     descs.children[currentEl].classList.remove('active');
//     images.children[currentEl].classList.remove('active');
//     spans[currentEl].classList.remove('active');
//     currentEl = index;
//     descs.children[currentEl].classList.add('active');
//     images.children[currentEl].classList.add('active');
//     spans[currentEl].classList.add('active');

//     const currentRow = Math.floor(currentEl / 10) + 1;
//     const nextRow = currentRow + 1;

//     document.querySelectorAll('.cruise-route__days-row').forEach((row, idx) => {
//       if (idx + 1 === currentRow || idx + 1 === nextRow) {
//         row.classList.remove('hidden');
//       } else {
//         row.classList.add('hidden');
//       }
//     });
//   }

//   btnPrev.addEventListener('click', () => {
//     let newIndex = (currentEl - 1 + descs.children.length) % descs.children.length;
//     updateActiveElements(newIndex);
//   });

//   btnNext.addEventListener('click', () => {
//     let newIndex = (currentEl + 1) % descs.children.length;
//     updateActiveElements(newIndex);
//   });

//   spans.forEach((day, index) => {
//     day.addEventListener('click', () => {
//       updateActiveElements(index);
//     });
//   });

//   document.addEventListener('keydown', function(event) {
//     if (event.key === 'ArrowLeft') {
//       let newIndex = (currentEl - 1 + descs.children.length) % descs.children.length;
//       updateActiveElements(newIndex);
//     } else if (event.key === 'ArrowRight') {
//       let newIndex = (currentEl + 1) % descs.children.length;
//       updateActiveElements(newIndex);
//     }
//   });
// }

// const bodySlider = document.querySelector('.cruise-route__body');
// if (bodySlider) {
//   slider();
// }


// function slider() {
//   const descs = document.querySelector('.cruise-route__descs-items');
//   const images = document.querySelector('.cruise-route__images');
//   const days = document.querySelector('.cruise-route__days');
//   const daysLength = descs.children.length;

//   function buildDaysSpan(node, count, startIndex) {
//     for (let i = 0; i < count; i++) {
//       let day = document.createElement('span');
//       day.classList.add('day');

//       let span1 = document.createElement('span');
//       span1.innerHTML = `${startIndex + i + 1}`;
//       let span2 = document.createElement('span');
//       span2.innerHTML = ` день`;

//       day.append(span1);
//       day.append(span2);

//       node.append(day);
//     }
//   }

//   const rows = Math.ceil(daysLength / 10);
//   const minItemsPerRow = Math.floor(daysLength / rows);
//   const extraItems = daysLength % rows;

//   let currentIndex = 0;
//   for (let i = 0; i < rows; i++) {
//     let row = document.createElement('div');
//     row.classList.add('cruise-route__days-row');
//     const itemsInRow = i < extraItems ? minItemsPerRow + 1 : minItemsPerRow;
//     row.classList.add(`cruise-route__days-row_${itemsInRow}`);
//     if (i > 1) row.classList.add('hidden'); // Скрываем строки начиная с третьей
//     buildDaysSpan(row, itemsInRow, currentIndex);
//     days.append(row);
//     currentIndex += itemsInRow;
//   }

//   const spans = days.querySelectorAll('.day');
//   if (spans.length > 0) {
//     spans[0].classList.add('active');
//   }

//   descs.children[0].classList.add('active');
//   images.children[0].classList.add('active');

//   const btnPrev = document.querySelector('.nav-cruise-route__btn_prev');
//   const btnNext = document.querySelector('.nav-cruise-route__btn_next');

//   let currentEl = 0;

//   function updateActiveElements(index) {
//     descs.children[currentEl].classList.remove('active');
//     images.children[currentEl].classList.remove('active');
//     spans[currentEl].classList.remove('active');
//     currentEl = index;
//     descs.children[currentEl].classList.add('active');
//     images.children[currentEl].classList.add('active');
//     spans[currentEl].classList.add('active');

//     const currentRow = Math.floor(currentEl / 10) + 1;
//     const nextRow = currentRow + 1;

//     document.querySelectorAll('.cruise-route__days-row').forEach((row, idx) => {
//       if (idx + 1 === currentRow || idx + 1 === nextRow) {
//         row.classList.remove('hidden');
//       } else {
//         row.classList.add('hidden');
//       }
//     });
//   }

//   btnPrev.addEventListener('click', () => {
//     let newIndex = (currentEl - 1 + descs.children.length) % descs.children.length;
//     updateActiveElements(newIndex);
//   });

//   btnNext.addEventListener('click', () => {
//     let newIndex = (currentEl + 1) % descs.children.length;
//     updateActiveElements(newIndex);
//   });

//   spans.forEach((day, index) => {
//     day.addEventListener('click', () => {
//       updateActiveElements(index);
//     });
//   });

//   document.addEventListener('keydown', function(event) {
//     if (event.key === 'ArrowLeft') {
//       let newIndex = (currentEl - 1 + descs.children.length) % descs.children.length;
//       updateActiveElements(newIndex);
//     } else if (event.key === 'ArrowRight') {
//       let newIndex = (currentEl + 1) % descs.children.length;
//       updateActiveElements(newIndex);
//     }
//   });
// }

// const bodySlider = document.querySelector('.cruise-route__body');
// if (bodySlider) {
//   slider();
// }


// function slider() {
//   const descs = document.querySelector('.cruise-route__descs-items');
//   const images = document.querySelector('.cruise-route__images');
//   const days = document.querySelector('.cruise-route__days');
//   const daysLength = descs.children.length;

//   function buildDaysSpan(node, count, startIndex) {
//     for (let i = 0; i < count; i++) {
//       let day = document.createElement('span');
//       day.classList.add('day');

//       let span1 = document.createElement('span');
//       span1.innerHTML = `${startIndex + i + 1}`;
//       let span2 = document.createElement('span');
//       span2.innerHTML = ` день`;

//       day.append(span1);
//       day.append(span2);

//       node.append(day);
//     }
//   }

//   const rows = Math.ceil(daysLength / 10);
//   const minItemsPerRow = Math.floor(daysLength / rows);
//   const extraItems = daysLength % rows;

//   let rowSizes = [];
//   let currentIndex = 0;
//   for (let i = 0; i < rows; i++) {
//     let row = document.createElement('div');
//     row.classList.add('cruise-route__days-row');
//     const itemsInRow = i < extraItems ? minItemsPerRow + 1 : minItemsPerRow;
//     rowSizes.push(itemsInRow);
//     row.classList.add(`cruise-route__days-row_${itemsInRow}`);
//     if (i > 1) row.classList.add('hidden'); // Скрываем строки начиная с третьей
//     buildDaysSpan(row, itemsInRow, currentIndex);
//     days.append(row);
//     currentIndex += itemsInRow;
//   }

//   const spans = days.querySelectorAll('.day');
//   if (spans.length > 0) {
//     spans[0].classList.add('active');
//   }

//   descs.children[0].classList.add('active');
//   images.children[0].classList.add('active');

//   const btnPrev = document.querySelector('.nav-cruise-route__btn_prev');
//   const btnNext = document.querySelector('.nav-cruise-route__btn_next');

//   let currentEl = 0;

//   function getRowIndex(elementIndex) {
//     let totalElements = 0;
//     for (let i = 0; i < rowSizes.length; i++) {
//       totalElements += rowSizes[i];
//       if (elementIndex < totalElements) {
//         return i;
//       }
//     }
//     return -1; // This should never happen
//   }

//   function updateActiveElements(index) {
//     descs.children[currentEl].classList.remove('active');
//     images.children[currentEl].classList.remove('active');
//     spans[currentEl].classList.remove('active');
//     currentEl = index;
//     descs.children[currentEl].classList.add('active');
//     images.children[currentEl].classList.add('active');
//     spans[currentEl].classList.add('active');

//     const currentRowIndex = getRowIndex(currentEl);
//     const nextRowIndex = currentRowIndex + 1;

//     document.querySelectorAll('.cruise-route__days-row').forEach((row, idx) => {
//       if (idx === currentRowIndex || idx === nextRowIndex) {
//         row.classList.remove('hidden');
//       } else {
//         row.classList.add('hidden');
//       }
//     });
//   }

//   btnPrev.addEventListener('click', () => {
//     let newIndex = (currentEl - 1 + descs.children.length) % descs.children.length;
//     updateActiveElements(newIndex);
//   });

//   btnNext.addEventListener('click', () => {
//     let newIndex = (currentEl + 1) % descs.children.length;
//     updateActiveElements(newIndex);
//   });

//   spans.forEach((day, index) => {
//     day.addEventListener('click', () => {
//       updateActiveElements(index);
//     });
//   });

//   document.addEventListener('keydown', function(event) {
//     if (event.key === 'ArrowLeft') {
//       let newIndex = (currentEl - 1 + descs.children.length) % descs.children.length;
//       updateActiveElements(newIndex);
//     } else if (event.key === 'ArrowRight') {
//       let newIndex = (currentEl + 1) % descs.children.length;
//       updateActiveElements(newIndex);
//     }
//   });
// }

// const bodySlider = document.querySelector('.cruise-route__body');
// if (bodySlider) {
//   slider();
// }


function slider() {
  const descs = document.querySelector('.cruise-route__descs-items');
  const images = document.querySelector('.cruise-route__images');
  const days = document.querySelector('.cruise-route__days');
  const daysLength = descs.children.length;

  function buildDaysSpan(node, count, startIndex) {
    for (let i = 0; i < count; i++) {
      let day = document.createElement('span');
      day.classList.add('day');

      let span1 = document.createElement('span');
      span1.innerHTML = `${startIndex + i + 1}`;
      let span2 = document.createElement('span');
      span2.innerHTML = ` день`;

      day.append(span1);
      day.append(span2);

      node.append(day);
    }
  }

  const rows = Math.ceil(daysLength / 10);
  const minItemsPerRow = Math.floor(daysLength / rows);
  const extraItems = daysLength % rows;

  let rowSizes = [];
  let currentIndex = 0;
  for (let i = 0; i < rows; i++) {
    let row = document.createElement('div');
    row.classList.add('cruise-route__days-row');
    const itemsInRow = i < extraItems ? minItemsPerRow + 1 : minItemsPerRow;
    rowSizes.push(itemsInRow);
    row.classList.add(`cruise-route__days-row_${itemsInRow}`);
    if (i > 1) row.classList.add('hidden'); // Скрываем строки начиная с третьей
    buildDaysSpan(row, itemsInRow, currentIndex);
    days.append(row);
    currentIndex += itemsInRow;
  }

  const spans = days.querySelectorAll('.day');
  if (spans.length > 0) {
    spans[0].classList.add('active');
  }

  descs.children[0].classList.add('active');
  images.children[0].classList.add('active');

  const btnPrev = document.querySelector('.nav-cruise-route__btn_prev');
  const btnNext = document.querySelector('.nav-cruise-route__btn_next');

  let currentEl = 0;

  function getRowIndex(elementIndex) {
    let totalElements = 0;
    for (let i = 0; i < rowSizes.length; i++) {
      totalElements += rowSizes[i];
      if (elementIndex < totalElements) {
        return i;
      }
    }
    return -1; // This should never happen
  }

  function updateActiveElements(index) {
    descs.children[currentEl].classList.remove('active');
    images.children[currentEl].classList.remove('active');
    spans[currentEl].classList.remove('active');
    currentEl = index;
    descs.children[currentEl].classList.add('active');
    images.children[currentEl].classList.add('active');
    spans[currentEl].classList.add('active');

    const currentRowIndex = getRowIndex(currentEl);
    const nextRowIndex = currentRowIndex + 1;

    document.querySelectorAll('.cruise-route__days-row').forEach((row, idx) => {
      if (idx === currentRowIndex || idx === nextRowIndex || (idx === currentRowIndex - 1 && nextRowIndex >= rows)) {
        row.classList.remove('hidden');
      } else {
        row.classList.add('hidden');
      }
    });
  }

  btnPrev.addEventListener('click', () => {
    let newIndex = (currentEl - 1 + descs.children.length) % descs.children.length;
    updateActiveElements(newIndex);
  });

  btnNext.addEventListener('click', () => {
    let newIndex = (currentEl + 1) % descs.children.length;
    updateActiveElements(newIndex);
  });

  spans.forEach((day, index) => {
    day.addEventListener('click', () => {
      updateActiveElements(index);
    });
  });

  document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowLeft') {
      let newIndex = (currentEl - 1 + descs.children.length) % descs.children.length;
      updateActiveElements(newIndex);
    } else if (event.key === 'ArrowRight') {
      let newIndex = (currentEl + 1) % descs.children.length;
      updateActiveElements(newIndex);
    }
  });
}

const bodySlider = document.querySelector('.cruise-route__body');
if (bodySlider) {
  slider();
}

//showMore
const showMoreArr = document.querySelectorAll('[data-show-more]');
showMoreArr.forEach((showMore) => {
  const showMoreWrapper = showMore.querySelector('[data-show-more-content]');
  const quantityHideElements = parseInt(showMoreWrapper.dataset.showMoreContent, 10);
  const showMoreWrapperChildren = showMoreWrapper.children;

  let status = 0;

  const hide = () => {
    for (let i = 0; i < showMoreWrapperChildren.length; i++) {
      const showMoreWrapperChild = showMoreWrapperChildren[i];
      if (i >= quantityHideElements) {
        setTimeout(() => {
          showMoreWrapperChild.classList.add('hidden');
        }, 200);
        _slideUp(showMoreWrapperChild, 200);
      }
    }
  };

  const show = () => {
    for (let i = 0; i < showMoreWrapperChildren.length; i++) {
      const showMoreWrapperChild = showMoreWrapperChildren[i];
      if (i >= quantityHideElements) {
        showMoreWrapperChild.classList.remove('hidden');
        _slideDown(showMoreWrapperChild, 200);
      }
    }
  };

  // Проверка количества элементов и создание кнопки
  if (showMoreWrapperChildren.length > quantityHideElements) {
    const showMoreBtn = document.createElement('button');
    showMoreBtn.type = 'button';
    showMoreBtn.className = 'btn-more _icon-arrow';
    showMoreBtn.setAttribute('data-show-more-btn', '');
    showMoreBtn.innerHTML = '<span>Показать еще</span><span>Скрыть</span>';
    showMore.appendChild(showMoreBtn);

    hide();

    showMoreBtn.addEventListener('click', () => {
      if (!status) {
        status = 1;
        showMore.classList.add('_showmore-active');
        show();
      } else {
        hide();
        showMore.classList.remove('_showmore-active');
        status = 0;
      }
    });
  }
});


// slider2 
// function slider2() {
//   const descs = document.querySelector('.port-route__descs-items');
//   const titles = document.querySelector('.port-route__titles');
//   const routes = document.querySelector('.port-route__routes-row');

//   descs.children[0].classList.add('active');
//   titles.children[0].classList.add('active');
//   routes.children[0].classList.add('active');

//   const btnPrev = document.querySelector('.nav-cruise-route__btn_prev');
//   const btnNext = document.querySelector('.nav-cruise-route__btn_next');

//   const routesQuantity = routes.querySelectorAll('.port-route__routes-item');

//   routes.classList.add(`flex_${routesQuantity.length}`);

//   console.log(routesQuantity.length);

//   let currentEl = 0;

//   function updateActiveElements(index) {
//     descs.children[currentEl].classList.remove('active');
//     titles.children[currentEl].classList.remove('active');
//     routesQuantity[currentEl].classList.remove('active');
//     currentEl = index;
//     descs.children[currentEl].classList.add('active');
//     titles.children[currentEl].classList.add('active');
//     routesQuantity[currentEl].classList.add('active');

//   }

//   btnPrev.addEventListener('click', () => {
//     let newIndex = (currentEl - 1 + descs.children.length) % descs.children.length;
//     updateActiveElements(newIndex);
//   });

//   btnNext.addEventListener('click', () => {
//     let newIndex = (currentEl + 1) % descs.children.length;
//     updateActiveElements(newIndex);
//   });

//   routesQuantity.forEach((route, index) => {
//     route.addEventListener('click', () => {
//       updateActiveElements(index);
//     });
//   });

//   document.addEventListener('keydown', function(event) {
//     const activeDay = document.querySelector('.day.active');
//     let nextDay;
  
//     if (event.key === 'ArrowLeft') {
//       let newIndex = (currentEl - 1 + descs.children.length) % descs.children.length;
//       updateActiveElements(newIndex);
//     } else if (event.key === 'ArrowRight') {
//       let newIndex = (currentEl + 1) % descs.children.length;
//       updateActiveElements(newIndex);
//     }
  
//     if (nextDay) {
//       updateActiveElements([...daysQuantity].indexOf(nextDay));
//     }
//   });

// }
// const bodyPort = document.querySelector('.port-route__body');
// if (bodyPort) {
//   slider2();
// }

function slider2() {
  const descs = document.querySelector('.port-route__descs-items');
  const titles = document.querySelector('.port-route__titles');
  const routes = document.querySelector('.port-route__routes-row');

  // Check if the necessary elements exist
  if (!descs || !titles || !routes) return;

  descs.children[0].classList.add('active');
  titles.children[0].classList.add('active');
  routes.children[0].classList.add('active');

  const btnPrev = document.querySelector('.nav-cruise-route__btn_prev');
  const btnNext = document.querySelector('.nav-cruise-route__btn_next');

  const routesQuantity = routes.querySelectorAll('.port-route__routes-item');
  routes.classList.add(`flex_${routesQuantity.length}`);

  console.log(routesQuantity.length);

  // Hide navigation buttons if there is only one element
  if (routesQuantity.length <= 1) {
    btnPrev.style.display = 'none';
    btnNext.style.display = 'none';
  }

  let currentEl = 0;

  function updateActiveElements(index) {
    descs.children[currentEl].classList.remove('active');
    titles.children[currentEl].classList.remove('active');
    routesQuantity[currentEl].classList.remove('active');
    currentEl = index;
    descs.children[currentEl].classList.add('active');
    titles.children[currentEl].classList.add('active');
    routesQuantity[currentEl].classList.add('active');
  }

  btnPrev.addEventListener('click', () => {
    let newIndex = (currentEl - 1 + descs.children.length) % descs.children.length;
    updateActiveElements(newIndex);
  });

  btnNext.addEventListener('click', () => {
    let newIndex = (currentEl + 1) % descs.children.length;
    updateActiveElements(newIndex);
  });

  routesQuantity.forEach((route, index) => {
    route.addEventListener('click', () => {
      updateActiveElements(index);
    });
  });

  document.addEventListener('keydown', function(event) {
    if (routesQuantity.length <= 1) return; // Skip if only one element

    if (event.key === 'ArrowLeft') {
      let newIndex = (currentEl - 1 + descs.children.length) % descs.children.length;
      updateActiveElements(newIndex);
    } else if (event.key === 'ArrowRight') {
      let newIndex = (currentEl + 1) % descs.children.length;
      updateActiveElements(newIndex);
    }
  });
}

const bodyPort = document.querySelector('.port-route__body');
if (bodyPort) {
  slider2();
}

// video
document.addEventListener('DOMContentLoaded', function () {
  var videoPlayers = document.querySelectorAll('.video-player');

  videoPlayers.forEach(function(player) {
    var videoId = player.getAttribute('data-video-id');
    var img = player.querySelector('img');
    img.setAttribute('data-src', 'https://img.youtube.com/vi/' + videoId + '/maxresdefault.jpg');
    img.setAttribute('src', img.getAttribute('data-src'));

    player.addEventListener('click', function() {
      loadVideo(player, videoId);
    });
  });

  function loadVideo(player, videoId) {
    var wrapper = player.closest('.video__body');
    var iframe = document.createElement('iframe');
    iframe.setAttribute('src', 'https://www.youtube.com/embed/' + videoId + '?autoplay=1');
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('allowfullscreen', '1');
    iframe.setAttribute('allow', 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture');
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.style.position = 'relative';
    iframe.style.zIndex = '2';
    
    wrapper.innerHTML = '';
    wrapper.appendChild(iframe);
  }
});


// tags
// document.addEventListener('DOMContentLoaded', function() {
//   const tagsHeader = document.querySelector('[data-tags-header]');
//   const items = document.querySelectorAll('[data-tags] [data-tag]');
//   const uniqueTags = new Set();

//   // Собрать уникальные теги из всех элементов
//   items.forEach(item => {
//       const tags = item.dataset.tag.split(', ');
//       tags.forEach(tag => uniqueTags.add(tag));
//   });

//   // Добавить уникальные теги в data-tags-header
//   uniqueTags.forEach(tag => {
//       const span = document.createElement('span');
//       span.className = 'tag';
//       span.innerText = tag;
//       tagsHeader.appendChild(span);
//   });

//   // Функция фильтрации элементов
//   function filterItems(selectedTag) {
//       items.forEach(item => {
//           const itemTags = item.dataset.tag.split(', ');
//           if (itemTags.includes(selectedTag) || selectedTag === 'все сьюты') {
//               item.style.display = 'block';
//           } else {
//               item.style.display = 'none';
//           }
//       });
//   }

//   // Добавить обработчики событий для тегов
//   const tags = tagsHeader.querySelectorAll('.tag');
//   tags.forEach(tag => {
//       tag.addEventListener('click', function() {
//           const selectedTag = tag.innerText;
//           filterItems(selectedTag);

//           // Удалить класс 'active' у всех тегов и добавить его к выбранному тегу
//           tags.forEach(tag => tag.classList.remove('active'));
//           tag.classList.add('active');
//       });
//   });

//   // Показать все элементы при загрузке
//   filterItems('все сьюты');
// });


// document.addEventListener('DOMContentLoaded', function() {
//   const tagsHeader = document.querySelector('[data-tags-header]');
//   const items = document.querySelectorAll('[data-tags] [data-tag]');
//   const uniqueTags = new Set();

//   // Функция для инициализации фильтрации по тегам
//   function initTagFiltering() {
//       // Очистить tagsHeader
//       tagsHeader.innerHTML = '';

//       // Собрать уникальные теги из всех элементов
//       items.forEach(item => {
//           const tags = item.dataset.tag.split(', ');
//           tags.forEach(tag => uniqueTags.add(tag));
//       });

//       // Добавить уникальные теги в data-tags-header
//       uniqueTags.forEach(tag => {
//           const span = document.createElement('span');
//           span.className = 'tag';
//           span.innerText = tag;
//           tagsHeader.appendChild(span);
//       });

//       // Функция фильтрации элементов
//       function filterItems(selectedTag) {
//           items.forEach(item => {
//               const itemTags = item.dataset.tag.split(', ');
//               if (itemTags.includes(selectedTag) || selectedTag === 'все сьюты') {
//                   item.style.display = 'block';
//               } else {
//                   item.style.display = 'none';
//               }
//           });
//       }

//       // Добавить обработчики событий для тегов
//       const tags = tagsHeader.querySelectorAll('.tag');
//       tags.forEach(tag => {
//           tag.addEventListener('click', function() {
//               const selectedTag = tag.innerText;
//               filterItems(selectedTag);

//               // Удалить класс 'active' у всех тегов и добавить его к выбранному тегу
//               tags.forEach(tag => tag.classList.remove('active'));
//               tag.classList.add('active');
//           });
//       });

//       // Показать все элементы при загрузке
//       filterItems('все сьюты');
//   }

//   // Функция для проверки разрешения экрана
//   function checkScreenWidth() {
//       if (window.innerWidth < 992) {
//           initTagFiltering();
//       } else {
//           // Убрать фильтрацию и показать все элементы при большом разрешении
//           tagsHeader.innerHTML = '';
//           items.forEach(item => item.style.display = 'block');
//       }
//   }

//   // Инициализация при загрузке
//   checkScreenWidth();

//   // Добавить слушатель событий изменения размера окна
//   window.addEventListener('resize', checkScreenWidth);
// });

document.addEventListener('DOMContentLoaded', function() {
  const tagsHeader = document.querySelector('[data-tags-header]');
  const items = document.querySelectorAll('[data-tags] [data-tag]');
  const uniqueTags = new Set();

  // Функция для инициализации фильтрации по тегам
  function initTagFiltering() {
      // Очистить tagsHeader
      tagsHeader.innerHTML = '';

      // Добавить тег "все сьюты" и сделать его активным по умолчанию
      const allSuitesTag = document.createElement('span');
      allSuitesTag.className = 'tag active'; // Добавляем класс active
      allSuitesTag.innerText = 'все сьюты';
      tagsHeader.appendChild(allSuitesTag);

      // Собрать уникальные теги из всех элементов
      items.forEach(item => {
          const tags = item.dataset.tag.split(', ');
          tags.forEach(tag => uniqueTags.add(tag));
      });

      // Добавить уникальные теги в data-tags-header
      uniqueTags.forEach(tag => {
          const span = document.createElement('span');
          span.className = 'tag';
          span.innerText = tag;
          tagsHeader.appendChild(span);
      });

      // Функция фильтрации элементов
      function filterItems(selectedTag) {
          items.forEach(item => {
              const itemTags = item.dataset.tag.split(', ');
              if (itemTags.includes(selectedTag) || selectedTag === 'все сьюты') {
                  item.style.display = 'block';
              } else {
                  item.style.display = 'none';
              }
          });
      }

      // Добавить обработчики событий для тегов
      const tags = tagsHeader.querySelectorAll('.tag');
      tags.forEach(tag => {
          tag.addEventListener('click', function() {
              const selectedTag = tag.innerText;
              filterItems(selectedTag);

              // Удалить класс 'active' у всех тегов и добавить его к выбранному тегу
              tags.forEach(tag => tag.classList.remove('active'));
              tag.classList.add('active');
          });
      });

      // Показать все элементы при загрузке
      filterItems('все сьюты');
  }

  // Функция для проверки разрешения экрана
  function checkScreenWidth() {
      if (window.innerWidth < 992) {
          initTagFiltering();
      } else {
          // Убрать фильтрацию и показать все элементы при большом разрешении
          tagsHeader.innerHTML = '';
          items.forEach(item => item.style.display = 'block');
      }
  }

  // Инициализация при загрузке
  checkScreenWidth();

  // Добавить слушатель событий изменения размера окна
  window.addEventListener('resize', checkScreenWidth);
});
