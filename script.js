

window.onscroll = function(){affixTop()};

var navbar = document.getElementById("sticky_stuff");

var sticky = navbar.offsetTop;

var content = document.getElementById("content");
function affixTop(){
    if(window.pageYOffset >=sticky){
        navbar.classList.add("sticky");
        content.style.padding = '45px 0 0 0';

    }else{
        navbar.classList.remove("sticky");
        content.style.padding = '0 0 0 0';
    }
}
