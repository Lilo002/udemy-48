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

    const forms = document.querySelectorAll('.feed-form');
          
    forms.forEach(item => {
        bindPostData(item);
    });

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            if(overlay.dataset.close !== '' && overlay.dataset.close) {
                closeModal(overlay.dataset.close);
            }

            openModal('loading');

            const formData = new FormData(form);

            /* const json = JSON.stringify(Object.fromEntries(formData.entries())); */
            //если json то добавить JSON.stringify() и довавить заголовок и в выводе результата добавить res.json()
            /* http://localhost:3000/request */

            fetch('mailer/smart.php', {
                method: "POST",
                body: formData
            })
            .then(data => {
                closeModal('loading');
                openModal('gratitude');
            }).catch(() => {
                closeModal('loading');
                openModal('error');
            }).finally(() => {
                form.reset();
            })
        });
    }
    
    //validation

    const telInput = document.querySelectorAll('[data-input-tel]');

    function getInputNumbersValue(input) {
        return input.value.replace(/\D/g, '');
    }

    function onPhoneInput(e) {
        let input = e.target,
            inputNumbersValue = getInputNumbersValue(input),
            formatedInputValue = '',
            selectionStart = input.selectionStart;

        if(input.value.length != selectionStart) {
            if(e.data && /\D/g.test(e.data)) {
                input.value = inputNumbersValue;
            }
            return;
        }

        if(['3', '+'].includes(inputNumbersValue[0], 0)) {
            //Belarus number

            let firstSymbol = `+375 `;
            formatedInputValue = firstSymbol;

            if(inputNumbersValue.length > 3) {
                formatedInputValue += `(${inputNumbersValue.substring(3,5)}`;
            }
            if(inputNumbersValue.length > 5) {
                formatedInputValue += `) ${inputNumbersValue.substring(5,8)}`;
            }
            if(inputNumbersValue.length > 8) {
                formatedInputValue += `-${inputNumbersValue.substring(8,10)}`;
            }
            if(inputNumbersValue.length > 10) {
                formatedInputValue += `-${inputNumbersValue.substring(10,12)}`;
            }

        } else if(inputNumbersValue[0] == '8') {

            let firstSymbol = `8 `;
            formatedInputValue = firstSymbol;

            if(inputNumbersValue.length > 1) {
                formatedInputValue += `${inputNumbersValue.substring(1,4)}`;
            }
            if(inputNumbersValue.length > 4) {
                formatedInputValue += ` ${inputNumbersValue.substring(4,11)}`;
            }           
        } 
        else if(input.value == '' || input.value[0] == '+' && input.value.length == 2) {

            return input.value = '';

        } else {
            //else number
            formatedInputValue = `+ ${inputNumbersValue.substring(0, 16)}`;

        }

        input.value = formatedInputValue;    
    }

    function onPhoneKeyDown(e) {
        // удаление если осталась шапка:
        if(e.keyCode == 8 && (getInputNumbersValue(e.target).length == 1 || e.target.value == `+375 `)) {
            e.target.value = '';
        }
    };

    function onPhonePaste(e) {
        let pasted = e.clipboardData || window.clipboardData,
            input = e.target,
            inputNumbersValue = getInputNumbersValue(input);

        if(pasted) {
            let pastedText = pasted.getData("Text");
            if(/\D/g.test(pastedText)) {
                input.value = inputNumbersValue;
            }
        }
    }

    telInput.forEach((item, index) => {
        item.addEventListener('keydown', onPhoneKeyDown);
        item.addEventListener('input', onPhoneInput, false);
        item.addEventListener('paste', onPhonePaste, false);
    });

    //reviews animation fadeInUp (animate__fadeInUp animate__animated)

    const reviews = document.querySelectorAll('.review'),
          reviewSection = document.querySelector('.reviews');

    document.addEventListener('scroll', onScroll);

    function addAnimation(item) {
        item.classList.add('animate__fadeInUp', 'review_show');
    }
          
    function onScroll(e) {
        let currentPosition = window.scrollY;

        if((reviewSection.offsetTop - reviewSection.offsetHeight) <= currentPosition && (reviewSection.offsetTop + reviewSection.offsetHeight) > currentPosition) {
            reviews.forEach((item, i) => {
                if((item.offsetTop - reviewSection.offsetHeight / 1.2) <= currentPosition) {
                    let timmer = i * 300 + 300;

                    console.log(item.offsetTop);
                    console.log(item.offsetHeight);
                    console.log(currentPosition);

                    setTimeout(addAnimation, timmer, item);   
                }
            })
        /* document.removeEventListener('scroll', onScroll); */
        }
    }

    //scrollUp

    const scrollUpBTN = document.querySelector('.img-up');

    function makeScrollBtnVisible(e) {
        scrollUpBTN.classList.toggle('img-up_active', window.scrollY > 500)
    };

    function goToTop(e) {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    scrollUpBTN.addEventListener('click', goToTop);

    window.addEventListener('scroll', makeScrollBtnVisible);

});