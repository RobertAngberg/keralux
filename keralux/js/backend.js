const skickad = document.querySelectorAll(".skickad");
const färdig = document.querySelectorAll(".färdig");
const misslyckad = document.querySelectorAll(".misslyckad");
const skuld = document.querySelectorAll(".skuld");
const påminnelse = document.querySelectorAll(".påminnelse");
const inkasso = document.querySelectorAll(".inkasso");

skickad.forEach((skickad) => {
  if (skickad.innerText !== "Skickad: 0000-00-00 00:00:00") {
    skickad.style.backgroundColor = "rgb(210,187,36)";
  }
});

påminnelse.forEach((påminnelse) => {
  if (påminnelse.innerText !== "Påminnelse: 0000-00-00 00:00:00") {
    påminnelse.style.backgroundColor = "rgb(0,51,102)";
  }
});

inkasso.forEach((inkasso) => {
  if (inkasso.innerText !== "Inkasso: 0000-00-00 00:00:00") {
    inkasso.style.backgroundColor = "rgb(0,51,102)";
  }
});

färdig.forEach((färdig) => {
  if (färdig.innerText !== "Färdig: 0000-00-00 00:00:00") {
    färdig.style.backgroundColor = "rgb(113,174,92)";
  }
});

misslyckad.forEach((misslyckad) => {
  if (misslyckad.innerText !== "Misslyckad: 0000-00-00 00:00:00") {
    misslyckad.style.backgroundColor = "rgb(102,0,0)";
  }
});

skuld.forEach((skuld) => {
  if (skuld.innerText !== "Skuld: 0000-00-00 00:00:00") {
    skuld.style.backgroundColor = "rgb(102,0,0)";
  }
});
