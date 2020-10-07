window.addEventListener("load",removePreload);


function removePreload(){

    document.querySelector(".preload").classList.remove("preload")
    appearText();
}




var currentUpdating = 0
function appearText(){
 
    var textHolder = document.getElementById("navList")
    textHolder.children[currentUpdating].style.fontSize = "12vh";
    currentUpdating+=1
    if(!(currentUpdating>= textHolder.children.length)){
        setTimeout(appearText,500);
    }
}