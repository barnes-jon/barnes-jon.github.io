

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

document.getElementById("button0").onclick = function () {
  document.getElementById("jsPanagram0").style.color = 'green';
  document.getElementById("jsPanagram0").style.font = "green 20px arial,serif";
  document.getElementById("fontName").innerHTML = "<h3>Arial</h3>";
}

document.getElementById("button1").onclick = function () {
  document.getElementById("jsPanagram0").style.color = 'blue';
  document.getElementById("jsPanagram0").style.font = "20px Georgia ";
  document.getElementById("fontName").innerHTML = "<h3>Georgia</h3>";
}

document.getElementById("button2").onclick = function () {
  document.getElementById("jsPanagram0").style.color = '#FF0000';
  document.getElementById("jsPanagram0").style.font = "20px Calibri ";
  document.getElementById("fontName").innerHTML = "<h3>Calibri</h3>";
}

document.getElementById("button3").onclick = function () {
  document.getElementById("jsPanagram0").style.color = '#000000';
  document.getElementById("jsPanagram0").style.font = "20px papyrus";  
  document.getElementById("fontName").innerHTML = "<h3>Papyrus</h3>";
}
