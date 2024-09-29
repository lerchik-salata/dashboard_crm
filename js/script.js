document.addEventListener("DOMContentLoaded", function () {
    const elements = document.querySelectorAll('.fade-in');
  
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };
  
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, options);
  
    elements.forEach(element => {
      observer.observe(element);
    });
  });

let selectedPage = 1;

function selectPage(page) {
  event.preventDefault();
  selectedPage = page;
  updatePagination();
}

function updatePagination() {
  const links = document.querySelectorAll('.pagination__link');
  
  links.forEach(link => {
    const page = parseInt(link.innerText); 
    if (page === selectedPage) {
      link.classList.add('pagination__link_active'); 
    } else {
      link.classList.remove('pagination__link_active');
    }
  });
}

document.addEventListener('DOMContentLoaded', updatePagination);

let selectedMenu = 'Customers';

function selectMenu(menu) {
  event.preventDefault();
  selectedMenu =  menu;
  updateMenu();
}

function updateMenu() {
  const links = document.querySelectorAll('.sidebar__menu-item');
  
  links.forEach(link => {
    const page = link.querySelector('.sidebar__text');
    const pageName = page.innerText; 
    if (pageName == selectedMenu) {
      link.classList.add('sidebar__menu-item_active'); 
    } else {
      link.classList.remove('sidebar__menu-item_active');
    }
  });
}

document.addEventListener('DOMContentLoaded', updateMenu);

  