let colorStore = localStorage.getItem("color-option");
if (colorStore !== null){
    //Set color from Local Storage on Reload
    document.documentElement.style.setProperty("--main-color", colorStore);
    //Remove active class
    document.querySelectorAll(".color-list li").forEach(element => {
        element.classList.remove("active");

        if(element.dataset.color === colorStore){
            element.classList.add("active");
        }
    });
}


// Settings Box
document.querySelector(".gear-container .fa-gear").onclick = function () {
    this.classList.toggle("fa-spin");
    document.querySelector(".settings-box").classList.toggle("open");
};

// Change Color
const colorsLi = document.querySelectorAll(".color-list li");
for(var i = 0; i <= 4; i++){
    colorsLi[i].addEventListener("click", function (e) {
        //Change color
        document.documentElement.style.setProperty('--main-color', e.target.dataset.color);
        //Local Storage Set Item
        localStorage.setItem("color-option", e.target.dataset.color);
        //Remove active class
        handleActive(e);
    });
};

let intervalValue;
let backCheck = true;
let backStore = localStorage.getItem('background-option');
if(backStore !== null){
    if(backStore === 'true'){
        backCheck = true;
    } else {
        backCheck = false;
    }
    document.querySelectorAll(".span-container span").forEach(element => {
        element.classList.remove("active");
    });
    if(backStore === 'true'){
        document.querySelector(".span-container .yes").classList.add('active');
    } else {
        document.querySelector(".span-container .no").classList.add('active');
    }
}

//Random Background Option
const backEl = document.querySelectorAll(".span-container span");
for(var i = 0; i <= 1; i++){
    backEl[i].addEventListener("click", function (e) {
        handleActive(e);
        if(e.target.dataset.background === "yes"){
            backCheck = true;
            randomizeImgs();
            localStorage.setItem('background-option', true);
        } else{
            backCheck = false;
            clearInterval(intervalValue);
            localStorage.setItem('background-option', false);
        }
    });
};

// Change Background Automaticlly
var landingPage = document.getElementById('land'),
    imgsArray = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"];
function randomizeImgs(){
    if(backCheck === true){
        intervalValue = setInterval(function(){
            var randomNumber = Math.floor(Math.random() * imgsArray.length);
        
            landingPage.style.backgroundImage = 'url("../imgs/' + imgsArray[randomNumber] + '")';
        }, 30000);
    }
};
randomizeImgs();


// Scroll Skills
let mySkills = document.querySelector(".skills");
window.onscroll = function () {
    let skillsOffsetTop = mySkills.offsetTop;
    let skillsOffsetHeight = mySkills.offsetHeight;
    let windowHeight = this.innerHeight;
    let scrollTop = this.pageYOffset;
    if (scrollTop > (skillsOffsetTop + skillsOffsetHeight - windowHeight - 320)) {
        let myProgress = document.querySelectorAll(".skill-box .skill-progress span");
        myProgress.forEach(skills => {
            skills.style.width = skills.dataset.progress;
        });
    }
};

//Popup Images
let myImgs = document.querySelectorAll(".imgs-box img");
myImgs.forEach(img => {
    img.addEventListener('click', (e) => {
        let overlay = document.createElement("div");
        overlay.className = 'popup-overlay';
        document.body.appendChild(overlay);

        let popupBox = document.createElement("div");
        popupBox.className = 'popup-box';
        document.body.appendChild(popupBox);

        let popupImg = document.createElement("img");
        popupImg.src = img.src;
        if (img.alt !== null) {
            let headImg = document.createElement("h3");
            let textHead = document.createTextNode(img.alt);
            headImg.appendChild(textHead);
            popupBox.appendChild(headImg);
        }
        popupBox.appendChild(popupImg);

        let exitImg = document.createElement('span');
        exitImg.className = 'exit-button';
        let textExit = document.createTextNode('X');
        exitImg.appendChild(textExit);
        popupBox.appendChild(exitImg);
    });
});

document.addEventListener('click', (e) => {
    if(e.target.className == 'exit-button'){
        document.querySelector('.popup-box').remove();
        document.querySelector('.popup-overlay').remove();
    }
});

//Scroll Intro View
const allBullets = document.querySelectorAll('.nav-bullets .bullet');
const allLinks = document.querySelectorAll('.links a');

function scrollIntoView(elements){
    elements.forEach(ele =>{
        ele.addEventListener("click", (e) => {
            e.preventDefault();
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior : 'smooth'
            });
        });
    });
};

scrollIntoView(allBullets);
scrollIntoView(allLinks);

//Handle Active
function handleActive (ev){
    ev.target.parentElement.querySelectorAll(".active").forEach(element => {
        element.classList.remove("active");
    });
    ev.target.classList.add("active");
}

//Show Bullets

let bulletsSpan = document.querySelectorAll('.bullets-option span');
let bulletsCont = document.querySelector('.nav-bullets');
let bulletLocal = localStorage.getItem("bullets-option");

if(bulletLocal !== null){
    bulletsSpan.forEach(span =>{
        span.classList.remove("active");
    });
    if(bulletLocal === "block"){
        bulletsCont.style.display = 'block';
        document.querySelector(".bullets-option .yes").classList.add("active");
    } else {
        bulletsCont.style.display = 'none';
        document.querySelector(".bullets-option .no").classList.add("active");

    }
}
bulletsSpan.forEach(span =>{
    span.addEventListener("click", (e) => {
        if(e.target.dataset.display === 'show'){
            bulletsCont.style.display = 'block';
            localStorage.setItem("bullets-option", "block");
        } else {
            bulletsCont.style.display = 'none';
            localStorage.setItem("bullets-option", "none");
        }
        handleActive(e);
    });
});

//Reset All Options
document.querySelector('.reset-option').onclick = function(){
    localStorage.clear();
    window.location.reload();
};