window.addEventListener("load",removePreload);
const timeToNextLoad = 500

function removePreload(){

    document.querySelector(".preload").classList.remove("preload")
    setTimeout( appearText,timeToNextLoad);
}




var currentUpdating = 0
function appearText(){
    
    var textHolder = document.getElementById("navList")
    textHolder.children[currentUpdating].style.fontSize = "12vh";
    currentUpdating+=1
    if(!(currentUpdating>= textHolder.children.length)){
        setTimeout(appearText,timeToNextLoad);
    }else{
        setTimeout(function(){
            for(var i = 0; i < textHolder.children.length; i++){
                textHolder.children[i].style.transition = "none";
            }
        },timeToNextLoad*2)
     
    }
}