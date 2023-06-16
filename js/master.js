// settings
let gear = document.querySelector(".gear");
gear.onclick = function () {
    this.classList.toggle('fa-spin');
    document.querySelector(".settings-box").classList.toggle("open");
}

document.querySelector(".reset-options").addEventListener("click", ()=> {
    localStorage.removeItem("custom_background");
    localStorage.removeItem("custom_bullets");
    localStorage.removeItem("color_option");
    window.location.reload();
});
// get bullets

let bullets = document.querySelectorAll(".bullets-nav .bullet");
let bulletsOptions = document.querySelectorAll(".show-bullets span");

if (localStorage.getItem("custom_bullets") !== null) {
    bulletsOptions.forEach(element => {
        element.classList.remove("active");
    })
    if (localStorage.getItem("custom_bullets") === "block") {
        document.querySelector(".show-bullets span.yes").classList.add("active");
        document.querySelector(".bullets-nav").style.display = "block";
    } else {
        document.querySelector(".show-bullets span.no").classList.add("active");
        document.querySelector(".bullets-nav").style.display = "none";
    }   
}

// show or hidden bullets

bulletsOptions.forEach(element => {
    element.addEventListener("click", event=> {
        handleActive(event);
        if (event.target.dataset.bullets === "show") {
            document.querySelector(".bullets-nav").style.display = "block";
            localStorage.setItem("custom_bullets", "block");
        } else {
            document.querySelector(".bullets-nav").style.display = "none";
            localStorage.setItem("custom_bullets", "none");
        }
    });
});
// get links

let links = document.querySelectorAll(".links a");


// Handle move to sections

function moveToSpecificSection(elements) {
    elements.forEach(element => {
        element.addEventListener("click", el => {
            el.preventDefault();
            document.querySelector(el.target.dataset.section).scrollIntoView({
                behavior: 'smooth'
            });
        })
    })
}

moveToSpecificSection(bullets);
moveToSpecificSection(links);
// colors

let mainColor = localStorage.getItem("color_option");
const customColors = document.querySelectorAll('.colors li');
// Check if color in localStorage
if (mainColor !== null) {
    // set color in local Storage
    document.documentElement.style.setProperty("--main-color", mainColor);
    // remove active class from lis
    customColors.forEach(li=> {
        li.parentElement.querySelectorAll(".active").forEach(liColor=> {
            liColor.classList.remove('active');
        });
        
    });
    // set active class to li
    customColors.forEach(li=> {
        if (li.dataset.color === mainColor) {
            li.classList.add('active');
        }
        
    });

}

customColors.forEach(li=> {
    li.addEventListener("click", (event)=> {
        handleActive(event)
        document.documentElement.style.setProperty("--main-color", event.target.dataset.color);
        localStorage.setItem("color_option", event.target.dataset.color);
    })
})


// Background
const customBackground = document.querySelectorAll('.random-backgrounds span');




// random background option
let randomBackgroundOption = true;

// check if backgroundLocalStorage is empty or not
let backgroundLocalStorage = localStorage.getItem("custom_background");

if (backgroundLocalStorage !== null) {
    
    customBackground.forEach(element => {
        element.classList.remove("active");
        if (backgroundLocalStorage === "true") {
            randomBackgroundOption = true;
            document.querySelector('.random-backgrounds span.yes').classList.add("active");
        } else {
            randomBackgroundOption = false;
            document.querySelector('.random-backgrounds span.no').classList.add("active");
        }
    }) 
}


// clear interval variable
let backgroundInterval;

customBackground.forEach(span=> {
    span.addEventListener("click", (event)=> {
        handleActive(event)
        if (event.target.dataset.background === "yes") {
            randomBackgroundOption = true;
            randomizeImgs();
            localStorage.setItem("custom_background", true);
        } else {
            randomBackgroundOption = false;
            clearInterval(backgroundInterval);
            localStorage.setItem("custom_background", false);
        }
    });

})

// get landing section

let landingSection = document.querySelector(".landing-section");

const backgroundArray = ["imgs/01.jpg", "imgs/02.jpg", "imgs/03.jpg", "imgs/04.jpg", "imgs/05.jpg", "imgs/06.png"];




function randomizeImgs () {
    if (randomBackgroundOption) {
        backgroundInterval = setInterval(() => {
            landingSection.style.backgroundImage = `url(${backgroundArray[Math.floor(Math.random() * backgroundArray.length)]})`;
        }, 1000);
    }
}
randomizeImgs();


// get skills 

let skills = document.querySelector(".skills");
let progress = document.querySelectorAll(".skill span");

window.onscroll = function () {
    if (window.scrollY > (skills.offsetTop + skills.offsetHeight - window.innerHeight)) {
        progress.forEach(skill => {
            skill.style.width = skill.dataset.progress;
            console.log(skill.dataset.progress)
        })
    }
}

// get all images

let gallery = document.querySelectorAll(".images-box img");

gallery.forEach(img => {
    img.addEventListener("click", e => {
        let overlayPopup = document.createElement("div");
        overlayPopup.className = "overlay-pop";
        document.body.appendChild(overlayPopup);
        

        // create popup box
        let popupBox = document.createElement("div");
        popupBox.className = "popup-box";

        // create heading 
        let heading = document.createElement("h3");
        let imageText = document.createTextNode(img.alt);
        heading.appendChild(imageText);
        if (imageText !== null) {
            popupBox.appendChild(heading);
        }
        // create popup Image
        let popupImage = document.createElement("img");
        popupImage.src = img.src;
        // popupImage.className("popup-image");
        console.log(img.src)
        popupBox.appendChild(popupImage);
        document.body.appendChild(popupBox);

        // create close button
        let closeButton = document.createElement("span");
        let closeText = document.createTextNode("X");
        closeButton.className = "close-popup";
        closeButton.appendChild(closeText);

        popupBox.appendChild(closeButton);
    })
})


document.addEventListener("click", (element)=> {
    if (element.target.className ===  "close-popup") {
        element.target.parentElement.remove();
        document.querySelector(".overlay-pop").remove();
    }
})


// handle active elements 

function handleActive(element) {
    element.target.parentElement.querySelectorAll(".active").forEach(backgroundEl=> {
        backgroundEl.classList.remove('active');
    });
    
    element.target.classList.add('active');
}

// get toggle 

let toggleBtn = document.querySelector(".toggle-menu");
let linksMenu = document.querySelector(".links");

toggleBtn.onclick = function (e) {
    e.stopPropagation();
    this.classList.toggle("open");
    linksMenu.classList.toggle("open");
}

document.addEventListener("click", (e)=> {
    if (e.target !== toggleBtn && e.target !== linksMenu) {
        if(linksMenu.classList.contains("open")) {
            toggleBtn.classList.remove("open");
            linksMenu.classList.remove("open");
        }
    }
});

linksMenu.onclick = (e) => {
    e.stopPropagation();
}
