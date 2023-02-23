//date 
var d = new Date(); 
var year  = d.getFullYear();
var dateTag = document.getElementById("yearDate");
dateTag.innerHTML =  `Riverside Holdings management &copy; ${year} -  v2.1.0` ;

try{
  setInterval(myTimer, 1000);
}
catch{
  //
}


function myTimer() {
  const d = new Date();
  try{
    document.getElementById("tmecode").innerHTML = d.toLocaleTimeString() + " (SAST)";
    
  }
  catch{

  }  
  hideloader();
}

//SCROLL TO FUNCTION
//Get the button
var mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.body.style = "transition: ease-in 0.3s; behavior: smooth;";
  document.documentElement.scrollTop = 0;
}


///side navigation
/* Set the width of the sidebar to 250px and the left margin of the page content to 250px */
function openNav() {
  document.getElementById("mySidebar").style.left = "0px";

}

/* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
function closeNav() {
  document.getElementById("mySidebar").style.left = "-310px";

}

var tblordrs = document.getElementById("allOrdersT");

function chekrws(){
  if(tblordrs.rows.length == 0){

  }
  else if (tblordrs.rows.length > 0) {
    hideloader();
  }
  
}

function hideloader(){
  var loader = document.getElementById("loader-gif");
  var body = document.querySelector("body");
  
  loader.style.display = "none"
}

