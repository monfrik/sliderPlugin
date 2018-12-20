$.fn.slider = function(){
    let slideIndex = 1,
    slides = document.getElementsByClassName('slider-item'),
    prev = document.querySelector('.prev'),
    next = document.querySelector('.next'),
    dotsWrap = document.querySelector('.slider-dots'),
    dots = document.getElementsByClassName('dot');
    
    showSlides(slideIndex);

    function showSlides(n) {
        if(n > slides.length){
            slideIndex = 1;
        };
        if (n < 1){
            slideIndex = slides.length;
        };
        for(let i = 0; i < slides.length; i++){
            slides[i].classList = "slider-item";
        };
        for(let i = 0; i < dots.length; i++){
            dots[i].classList.remove('dot-active');
        };

        switch(Math.floor(Math.random() * 5)){
            case 1: {
                slides[slideIndex - 1].style.transition = '0s';
                slides[slideIndex - 1].style.left = '100%';
                setTimeout(function(){
                    slides[slideIndex - 1].style.transition = '0.6s';
                    slides[slideIndex - 1].style.left = '0%';
                },100);
                break;
            }
            case 2: {
                slides[slideIndex - 1].style.transition = '0s';
                slides[slideIndex - 1].style.bottom = '100%';
                setTimeout(function(){
                    slides[slideIndex - 1].style.transition = '0.6s';
                    slides[slideIndex - 1].style.bottom = '0%';
                },100);
                break;
            }
            case 3: {
                slides[slideIndex - 1].style.transition = '0s';
                slides[slideIndex - 1].style.transform = 'scale(0)';
                setTimeout(function(){
                    slides[slideIndex - 1].style.transition = '0.6s';
                    slides[slideIndex - 1].style.transform = 'scale(1)';
                },100);
                break;
            }
            case 4: {
                slides[slideIndex - 1].style.transition = '0s';
                slides[slideIndex - 1].style.top = '100%';
                slides[slideIndex - 1].style.right = '100%';
                setTimeout(function(){
                    slides[slideIndex - 1].style.transition = '0.6s';
                    slides[slideIndex - 1].style.top = '0%';
                    slides[slideIndex - 1].style.right = '0%';
                },100);
                break;
            }
            case 5: {
                slides[slideIndex - 1].style.transition = '0s';
                slides[slideIndex - 1].style.transform = 'scale(0) rotate(180deg)';
                setTimeout(function(){
                    slides[slideIndex - 1].style.transition = '0.6s';
                    slides[slideIndex - 1].style.transform = 'scale(1) rotate(0deg)';
                },100);
                break;
            }
            // case 0: {
            //     slides[slideIndex - 1]
            //     slides[slideIndex - 1].style.transition = '0s';
            //     slides[slideIndex - 1].style.overflow = 'hidden';
            //     slides[slideIndex - 1].style.borderRadius = '100%';
            //     slides[slideIndex - 1].style.width = '0%';
            //     slides[slideIndex - 1].style.left = '50%';
            //     setTimeout(function(){
            //         slides[slideIndex - 1].style.transition = '0.6s';
            //         // slides[slideIndex - 1].style.overflow = 'show';
            //         slides[slideIndex - 1].style.borderRadius = '0';
            //         slides[slideIndex - 1].style.width = '100%';
            //         slides[slideIndex - 1].style.left = '0%';
            //     },50);
            //     break;
            // }
        }
        slides[slideIndex - 1].classList.add('show');
        dots[slideIndex - 1].classList.add('dot-active');

    }   

    function plusSlides(n){
        showSlides(slideIndex += n)
    }

    function currentSlide(n){
        showSlides(slideIndex = n)
    }

    prev.addEventListener('click', function(){
        plusSlides(-1);
    });

    next.addEventListener('click', function(){
        plusSlides(1);
    });

    dotsWrap.addEventListener('click', function(event){
        for(let i = 0; i < dots.length + 1; i++){
            if(event.target.classList.contains('dot') && event.target == dots[i-1]){
                currentSlide(i);
            }
        }
    });
    }