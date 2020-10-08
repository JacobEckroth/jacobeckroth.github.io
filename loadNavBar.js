

dropdownButton = document.getElementById("dropdownImage")

dropdownButton.addEventListener("click",showOptions);



var links = ["about.html","portfolio.html","blog.html","constact.html"]
var names = ["About","Portfolio","Blog","Contact"]
function showOptions(){
    grayOut = document.createElement("div");
    grayOut.id = "opaque"
    grayOut.style.opacity = 0;
    setTimeout(function(){
        grayOut.style.opacity = .8;
    },100);
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
        navList.appendChild(createNavItem(names[i]));

    }
    document.body.appendChild(navHolder)
    setTimeout(function(){
        navHolder.style.top = "0vh";

    },100)


}

function createNavItem(name,link){
    navItem = document.createElement("li");
    navItem.classList.add("navItem");
    link = document.createElement("a");
    link.href = link;
    link.textContent = name;
    navItem.appendChild(link);
    navItem.style.fontSize = "12vh";
    return navItem;
}