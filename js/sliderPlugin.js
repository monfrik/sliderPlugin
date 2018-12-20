(function( $ ) {
    jQuery.fn.slider = function(options) {
        /*берём нужные параметры из введённых пользователем и записываем их в settings, иначе записываются дефолтные*/
        let settings = $.extend({
            controls: true,
            color: "#c78030",
            size: "contain",
            autoSwap: false,
            autoSwapTime: 4000,
            autoSwapOnMouserover: false,
        }, options);
        
        let slideIndex = 0; // первоначальный номер слайда

        let interval;

        /*Добавляем стили ввёденный пользователем или дефолтные*/
        settingParameters(settings['color'], settings['size'], settings['controls']);
        
        /*открытие слайда*/
        showSlide(slideIndex);
        
        function showSlide(index) {
            /*обнуление стилей для слайдов и индетификаторов*/
            resetStyles();

            if (settings['autoSwap']) {
                autoSwaping();
                if (!settings['autoSwapOnMouserover']) {
                    $('.slider').on('mouseover', function(){
                        clearTimeout(interval);
                    });
                    $('.slider').on('mouseleave', function(){
                        autoSwaping()
                    });
                }
            }
            
            if(index > $('.slider-item').length -1){
                slideIndex = 0;  //Если мы переключили последний слайд на следующий, открывается первый
            };
            if (index < 0){
                slideIndex = $('.slider-item').length -1; //Если мы переключили первый слайд на предыдущий, открывается последний
            };

            /*Появление анимации*/
            slideAnimate($(`.slider-item:eq(${slideIndex})`));
            
            /*добавление стилей текущему слайду*/
            currentSlide(slideIndex);
        }

        /*Смена слайда при свайпе*/
        if (settings['controls']) {
            $(".slider-item").swipe({
                swipeLeft:  leftSwipe,
                swipeRight: rightSwipe,
                threshold:0
            });
        }

        /*при переключении слайдера назад открываем предыдущий слайд*/
        $('.slider-prev').click(function(){
            plusSlide(-1);
        });
        
        /*при переключении слайдера вперёд открываем следующий слайд*/
        $('.slider-next').click(function(){
            plusSlide(1);
        });
        
        /*открытие нужного слайда при нажатии на идентификатор*/
        $('.slider-indicators').on('click', '.slider-indicator', function(){

            slideIndex=$('.slider-indicators .slider-indicator').index(this);
            showSlide(slideIndex);
        });
        
        /*открытие нужного слайда при нажатии на стрелки на клавиатуре или кнопки от 1 до 9*/
        if (settings['controls']) {
            $("body").keydown(function(event) {
                if ((event.which-49) > -1 && (event.which-49) < $('.slider-item').length + 1 && $('.slider-item').length < 10) {
                    showSlide(slideIndex = event.which - 49);
                }   
                if (event.which == 39){
                    plusSlide(1);
                } else if (event.which == 37){
                    plusSlide(-1);
                }
            });
        }

        function leftSwipe() {
            plusSlide(1);
        }

        function rightSwipe() {
            plusSlide(-1);
        }

        /*открывает следующий/предыдущий слайд*/
        function plusSlide(n){
            showSlide(slideIndex += n);
        }

        function autoSwaping() {
            clearTimeout(interval);
            interval = setTimeout(function(){
                plusSlide(1);
            }, settings['autoSwapTime']);
        }
        
        function settingParameters(color, size, controls){
            $('.slider-arrow').css('borderColor', color); 
            $('.slider-indicator').css('borderColor', color);
            $('.slider-img').each(function(){
                /*если ползователь выбрал свойство size равное stretching (растягивание), то картинка растягивается по размеру слайдера*/
                if (size == 'stretching') {
                    $(this).css('height', '100%');
                    $(this).css('width', '100%');
                }
                /*если ползователь выбрал свойство size равное cover(покрытие), то картинка покрывает весь слайдер и обрезаются вылезающие части*/
                else if(size == 'cover') {
                    if (parseInt($(this).css('width'))/parseInt($(this).css('height')) > parseInt($('.slider').css('width'))/parseInt($('.slider').css('height'))){
                        $(this).css('height', '100%');
                        $(this).css('width', 'auto');
                    } else {
                        $(this).css('height', 'auto');
                        $(this).css('width', '100%');
                    }
                }
                /*если ползователь выбрал свойство size равное contain(вмещать) или неизвестное значение, то картинка полностью вмещается в слайдер*/ 
                else {
                    $(this).css('max-height', '100%');
                    $(this).css('max-width', '100%');
                }
            });

            if(!controls){
                $('.slider-indicators').remove();
                $('.slider-swap').remove();
            }
        }

        function resetStyles(){
            $('.slider-indicator').css('backgroundColor', 'transparent');
            $('.slider-indicator').css('transform', 'scale(1)');

            $(`.slider-item`).each(function(){
                $(this).removeClass('show');
            });
        }

        function slideAnimate(element){
            switch (Math.floor(Math.random() * 10)) {
                /*Вылет справа*/
                case 1: {
                    $(element).css('left', '100%');

                    setTimeout(function(){
                        $(element).css('left', '0%');
                    },100);

                    break;
                }
                /*Вылет сверху*/
                case 2: {
                    $(element).css('bottom', '100%');

                    setTimeout(function(){
                        $(element).css('bottom', '0%');
                    },100);

                    break;
                }
                /*Увеличение*/
                case 3: {
                    $(element).css('transform', 'scale(0)');

                    setTimeout(function(){
                        $(element).css('transform', 'scale(1)');
                    },100);

                    break;
                }
                /*Вылет из левого-нижнего угла*/
                case 4: {
                    $(element).css('top', '100%');
                    $(element).css('right', '100%');

                    setTimeout(function(){
                        $(element).css('top', '0%');
                        $(element).css('right', '0%');
                    },100);

                    break;
                }
                /*Увеличение с вращением по оси Z*/
                case 5: {
                    $(element).css('transform', 'scale(0) rotateZ(180deg)');

                    setTimeout(function(){
                        $(element).css('transform', 'scale(1) rotateZ(0deg)');
                    },100);

                    break;
                }
                /*Увеличение с вращением по оси X*/
                case 6: {
                    $(element).css('transform', 'scale(0) rotateX(360deg)');

                    setTimeout(function(){
                        $(element).css('transform', 'scale(1) rotateX(0deg)');
                    },100);

                    break;
                }
                /*Увеличение с наклоном*/
                case 7: {
                    $(element).css('transform', 'scale(0) skew(90deg)');

                    setTimeout(function(){
                        $(element).css('transform', 'scale(1) skew(0deg)');
                    },100);

                    break;
                }
                /*Уменьшение*/
                case 8: {
                    $(element).css('transform', 'scale(15)');

                    setTimeout(function(){
                        $(element).css('transform', 'scale(1)');
                    },100);

                    break;
                }
                /*Вылет слева*/
                case 9: {
                    $(element).css('right', '100%');

                    setTimeout(function(){
                        $(element).css('right', '0%');
                    },100);

                    break;
                }
            }
        }

        function currentSlide(index){
            setTimeout(function(){
                $(`.slider-item:eq(${index})`).addClass('show'); // текущему слайду добавляется класс show
            },100);
            
            $(`.slider-indicator:eq(${index})`).css('background-color', settings['color']);
            $(`.slider-indicator:eq(${index})`).css('transform', 'scale(1.2)');
        }
    }
}( jQuery ));