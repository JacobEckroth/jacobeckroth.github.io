

dropdownButton = document.getElementById("dropdownImage")

dropdownButton.addEventListener("click",showOptions);



var names = ["About","Portfolio","Blog","Contact"]
function showOptions(){
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

function createNavItem(name){
    navItem = document.createElement("li");
    navItem.classList.add("navItem");
    link = document.createElement("a");
    link.href = "#";
    link.textContent = name;
    navItem.appendChild(link);
    navItem.style.fontSize = "12vh";
    return navItem;
}