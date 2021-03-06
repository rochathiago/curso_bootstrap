function createCircle(circleID, order, value){

    let container = document.getElementById(circleID);

    let circle = new ProgressBar.Circle(container, {
        color: '#64DAF9',
        strokeWidth: 8,
        duration: 1000 + (order * 500),
        from: {color: '#AAA'},
        to: {color: '#64DAF9'},
        step: function(state, circle){
            circle.path.setAttribute('stroke', state.color);

            let val = Math.round(circle.value() * value);

            circle.setText(val);
        }
    })

    circle.animate(1.0);
}

function filterBox(opt, boxes){
    if(opt == "all"){
        $(boxes).fadeIn();
    }else{
        $(boxes).each(function(){
            if($(this).attr("opt") != opt){
                $(this).fadeOut("slow");
            }else{
                $(this).fadeIn();
            }

        });
    }
}


$(document).ready(function(){

    let dataAreaOffset = $("#data-area").offset();
    let stop = false;

    $(window).scroll(function(e){

        let scroll = $(window).scrollTop();

        console.log('scroll: ' + scroll + "      dataAreaOffset.top: " + (dataAreaOffset.top - 500));
        if(scroll > (dataAreaOffset.top - 700) && !stop){

            //Progress bar
            createCircle("circleA", 1, 60);
            createCircle("circleB", 2, 254);
            createCircle("circleC", 3, 32);
            createCircle("circleD", 4, 5243);

            stop = true;
        }
    });

    //Parallax
    setTimeout(function(){
        $("#data-area").parallax({imageSrc: 'img/cidadeparallax.png'});
        $("#apply-area").parallax({imageSrc: 'img/pattern.png'});
    }, 250);

    //Filtro do Portfólio
    $(".filter-btn").on("click", function(){
        let opt = $(this).attr("opt");
        let boxes = $(".project-box");

        $('.filter-btn').removeClass("active");
        $(this).addClass("active");

        filterBox(opt, boxes);
    });

    // Scroll para seções seção
    let navBtn = $(".nav-item");

    $(navBtn).click(function(e){        
        e.preventDefault();        
        let scrollTo = $(this).attr('scroll-to')
        console.log(scrollTo);
        $([document.documentElement, document.body]).animate({
            scrollTop: $("#" + scrollTo).offset().top - 70
        }, 1500);
    }); 

});