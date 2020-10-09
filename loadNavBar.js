

dropdownButton = document.getElementById("dropdownImage")

dropdownButton.addEventListener("click",showOptions);

function hideOptions(event){
   
    if(!(event.target.classList.contains("navLink"))){
        dropdownImg.style.transform = "rotate(0deg)";
        enableScroll();
        navHolder = document.getElementById("navHolder");
        navHolder.style.top = "-100vh";
        grayOut = document.getElementById("opaque");
        grayOut.style.opacity = "0";
        setTimeout(function(){
            document.body.removeChild(navHolder);
            document.body.removeChild(grayOut);
        },500)
    }
}

var links = ["about.html","portfolio.html","blog.html","contact.html"]
var names = ["About","Portfolio","Blog","Contact"]
function showOptions(){
    dropdownImg = document.getElementById("dropdownImage");
    dropdownImg.style.transform = "rotate(180deg)";


    disableScroll();
    grayOut = document.createElement("div");
    grayOut.id = "opaque"
    grayOut.style.opacity = 0;
    setTimeout(function(){
        grayOut.style.opacity = .8;
    },100);
    grayOut.addEventListener("click",hideOptions);
    document.body.appendChild(grayOut);

    
    navHolder = document.createElement("div");
    navHolder.style.transition = "top 1s ease"
    navHolder.style.position = "fixed";
    navHolder.style.width = "100%"
    navHolder.style.top = "-100vh"
    navHolder.style.left = "0px"
  
    navHolder.id = "navHolder";
    navList = document.createElement("ul");
    navList.id = "navList";
    navHolder.appendChild(navList);

    for(var i = 0; i < names.length; i++){
        navList.appendChild(createNavItem(names[i],links[i]));

    }
    document.body.appendChild(navHolder)
    setTimeout(function(){
        navHolder.style.top = "0vh";
        navHolder.addEventListener("click",hideOptions);

    },100)


}
function disableScroll() { 
    // Get the current page scroll position 
    scrollTop = window.pageYOffset || document.documentElement.scrollTop; 
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft, 
  
        // if any scroll is attempted, set this to the previous value 
        window.onscroll = function() { 
            window.scrollTo(scrollLeft, scrollTop); 
        }; 
} 
  
function enableScroll() { 
    window.onscroll = function() {}; 
} 

function createNavItem(name,linkURL){
    navItem = document.createElement("li");
    navItem.classList.add("navItem");
    link = document.createElement("a");
    link.href = linkURL;
    link.classList.add("navLink")
    link.textContent = name;
    navItem.appendChild(link);
    navItem.style.fontSize = "12vh";
    return navItem;
}