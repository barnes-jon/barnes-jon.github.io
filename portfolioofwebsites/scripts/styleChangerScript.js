

let fontName = ["Arial","Georgia","Calibri"];

const panagramPhrase = "Jaded zombies acted quaintly but kept driving their oxen forward.";

let fontIndexNumber = 0;
let panagramClassId;
let panagramExamples;
let panagramInnerHtmlString = "";
let fontType;

function panagramGenerator(){
  panagramClassId = "jsPanagram" + fontIndexNumber.toString();
  panagramExamples = document.getElementById(panagramClassId);
  fontType = fontName[fontIndexNumber];
  panagramInnerHtmlString =  
    `<div class="font-panel" id="panagramClassId"> 
      <p class="fontChange">${panagramPhrase}</p>
      <p class="fontChange" style="font-weight:bold">${panagramPhrase}</p>
      <p class="fontChange" style="font-style:italic">${panagramPhrase}</p>
     </div>`;
  panagramExamples.innerHTML = panagramInnerHtmlString;
}

panagramGenerator();

document.getElementById("buttonGreen").onclick = function () {
  document.getElementById("jsPanagram0").style.color = 'green';
}
document.getElementById("buttonBlue").onclick = function () {
  document.getElementById("jsPanagram0").style.color = 'blue';
}
document.getElementById("buttonRed").onclick = function () {
  document.getElementById("jsPanagram0").style.color = '#FF0000';
}

document.getElementById("buttonArial").onclick = function () {
  document.getElementById("jsPanagram0").style.font = "20px Arial";
  document.getElementById("fontName").innerHTML = "<h3>Arial</h3>";
}
document.getElementById("buttonGeorgia").onclick = function () {
  document.getElementById("jsPanagram0").style.font = "20px Georgia ";
  document.getElementById("fontName").innerHTML = "<h3>Georgia</h3>";
}
document.getElementById("buttonPapyrus").onclick = function () {
  document.getElementById("jsPanagram0").style.font = "20px papyrus";  
  document.getElementById("fontName").innerHTML = "<h3>Papyrus</h3>";
}
document.getElementById("buttonReset").onclick = function () {
  document.getElementById("jsPanagram0").style.color = '#000000';
  document.getElementById("jsPanagram0").style.font = "20px Helvetica";
  document.getElementById("fontName").innerHTML = "<h3>Black Helvetica</h3>";
}

