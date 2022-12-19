console.log('renderer process 1');

const BrowserWindow = require('electron').remote.BrowserWindow;
const path = require('path')
const { shell } = require('electron')

const url = require('url')
var titlesArray = JSON.parse(window.localStorage.getItem('titlesArray'));
var imgUrlsArray = JSON.parse(window.localStorage.getItem('imageUrls'));

const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

prevBtn.addEventListener('click', function (event) {
  previousSlide();
});
nextBtn.addEventListener('click', function (event) {
  nextSlide();
});

var items = document.getElementsByClassName('item');
var titles = document.getElementsByClassName('title');
var titleAs = document.getElementsByClassName("slideLink");
console.log(titleAs);
for(var i = 0; i < items.length; i++){
  titleAs[i].addEventListener('click', event => {
    shell.openExternal(aLinks[0]);
  })
  items[i].style.backgroundImage = "url(\'" +  imgUrlsArray[i % imgUrlsArray.length] +"\')";
  items[i].innerHTML = "<h1>" + titlesArray[i] + "</h1>";
}
let slideIndex = 1;
showSlides(slideIndex);
function nextSlide() {
    showSlides(slideIndex += 1);
}

function previousSlide() {
    showSlides(slideIndex -= 1);  
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("item");
    
    if (n > slides.length) {
      slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }
  
    for (let slide of slides) {
        slide.style.display = "none";
    }   
    slides[slideIndex - 1].style.display = "block"; 
}

const {ipcRenderer} = require('electron');
let sliderBtn = document.getElementById("sliderGen")
let inputs = document.querySelectorAll("[id='title']");
let imgURLs = document.querySelectorAll("[id='imgURL']");
var titlesList = [];
var imgList = [];
if (sliderBtn){
    sliderBtn.addEventListener('click', function (event) {
        for(var i in inputs){
            if(inputs[i].value){
                titlesList.push(inputs[i].value);
            }
            if(imgURLs[i].value){
                imgList.push(imgURLs[i].value);
            }
        }
        window.localStorage.setItem("titlesArray", JSON.stringify(titlesList));
        window.localStorage.setItem("imageUrls", JSON.stringify(imgList));
        window.location.replace("slider.html");
    });
}