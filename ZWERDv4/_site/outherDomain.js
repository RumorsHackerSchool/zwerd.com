function myFunction4(){
document.getElementById("header").innerHTML = "JavaScript was run from outherDomain.js";
document.getElementById("button").onclick = "myFunction5()";
document.getElementById("button").innerHTML = "run script from outherFolder.js";
}
