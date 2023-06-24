'use string';
//slider

$(document).ready(function(){
    $('.carousel__inner').slick({
        speed: 1200,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/left.svg" alt="prev"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/right.svg" alt="next"></button>',
        responsive: [
            {
                breakpoint: 969,
                settings: {
                    dots: true,
                    arrows:false
                }
            }
        ]
      });
});

document.addEventListener('DOMContentLoaded', () => {
    //tabs

    const btnMore = document.querySelectorAll('.catalog-item__link'),
          btnBack = document.querySelectorAll('.catalog-item__back'),
          tabItemMain = document.querySelectorAll('.catalog-item__content'),
          tabItemDescr = document.querySelectorAll('.catalog-item__list');
    
    function openMainInformation(i) {
        tabItemMain[i].classList.add('catalog-item__content_active');
        tabItemDescr[i].classList.remove('catalog-item__list_active');
    };

    function openDescrInformation(i) {
        tabItemMain[i].classList.remove('catalog-item__content_active');
        tabItemDescr[i].classList.add('catalog-item__list_active');
    };

    //openDescription

    btnMore.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const target = e.target;

            if(target && target.classList.contains('catalog-item__link')) {
                btnMore.forEach((item, i) => {
                    if(target == item) {
                        checkOpenInformation();
                        openDescrInformation(i)
                    }
                })
            }  
        }) 
    })

    //openMainInformation

    btnBack.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const target = e.target;

            if(target && target.classList.contains('catalog-item__back')) {
                btnBack.forEach((item, i) => {
                    if(target == item) {
                        openMainInformation(i);
                    }
                })
            }  
        }) 
    })

    //closeOtherDescr

    function checkOpenInformation() {
        tabItemDescr.forEach((item, i) => {
            if(item.classList.contains('catalog-item__list_active')) {
                item.classList.remove('catalog-item__list_active');
                tabItemMain[i].classList.add('catalog-item__content_active');
            }
        })
    }

    //tabs

    const content = document.querySelectorAll('.catalog__content'),
          tabs = document.querySelectorAll('.catalog__tab');

    function openTab(i) {
        tabs.forEach(item => {
            item.classList.remove('catalog__tab_active');
        })
        tabs[i].classList.add('catalog__tab_active');
    }

    function openContent(i) {
        content.forEach(item => {
            item.classList.remove('catalog__content_active');
        })
        content[i].classList.add('catalog__content_active');
    }


    tabs.forEach((item, i) => {
        item.addEventListener('click', (e) => {
            const target = e.target;
            if(target && target.closest('.catalog__tab').classList.contains('catalog__tab') && target.closest('.catalog__tab') == item) {
                openTab(i);
                openContent(i);
            }
        })
    })

    openTab(0);
    openContent(0);

    //modal

    const openModalBtn = document.querySelectorAll('[data-modal]')
          closeModalBtn = document.querySelectorAll('[data-close]'),
          modalBye = document.querySelector('#buy'),
          modalConsultation = document.querySelector('#consultation'),
          overlay = document.querySelector('.overlay'),
          body = document.querySelector('body');


    function openModal(modalSelector) {
        const modal = document.querySelector(`#${modalSelector}`);
        modal.classList.remove('modal_closed');
        overlay.classList.remove('overlay_closed');
        body.style.overflow = 'hidden';
        body.classList.add('pr');
        overlay.dataset.close = modalSelector;
    }

    function closeModal(modalSelector) {
        const modal = document.querySelector(`#${modalSelector}`);
        modal.classList.add('modal_closed');
        overlay.classList.add('overlay_closed');
        body.style.overflow = '';
        body.classList.remove('pr');
        overlay.dataset.close = '';
    }

    openModalBtn.forEach(item => {
        item.addEventListener('click', function() {
            openModal(item.dataset.modal);
        })
    })

    closeModalBtn.forEach(item => {
        item.addEventListener('click', function() {
            closeModal(item.dataset.close);
        })
    })

    overlay.addEventListener('click', (e) => {
        if(e.target == overlay) {
            closeModal(overlay.dataset.close);
            overlay.dataset.close = '';
        }
    })

    //Forms

    const forms = document.querySelectorAll('.feed-form'),
          openGratitudeBtn = document.querySelectorAll('[data-submit]');
          
    forms.forEach(item => {
        bindPostData(item);
    });
    
    const postData = async (url, data) => {
        let res = await fetch(url, {
            /* mode: 'no-cors', */
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        });

        return await res.json();
    };

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/request', json)
            .then(data => {
                if(overlay.dataset.close !== '' && overlay.dataset.close) {
                    closeModal(overlay.dataset.close);
                }
                openModal('gratitude');
            }).catch(() => {
                if(overlay.dataset.close !== '' && overlay.dataset.close) {
                    closeModal(overlay.dataset.close);
                }
                openModal('error');
            }).finally(() => {
                form.reset();
            })
        });
    }   

});