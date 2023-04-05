// Jag får inte till det helt men går det inte att använda ett form istället för ajax?
// Alltså, om man vill ha knappar för intervall att visa data
// Kanske att man måste ha all php-kod i samma dokument, eller?
// ... Känns trist att tramsa med ajax...

// function ajax(param) {
//   const xhttp = new XMLHttpRequest();
//   xhttp.open("GET", "readfromdb.php?q=" + param);
//   xhttp.send();
//   xhttp.onload = function () {
//     document.getElementById("aaa").innerText = this.responseText;
//   };
// }

// objData är en array, konvertera till object
const daysOrdersObj = {};
for (const orderQty of objData) {
  if ((daysOrdersObj[orderQty] = daysOrdersObj[orderQty])) {
    daysOrdersObj[orderQty]++;
  } else {
    daysOrdersObj[orderQty] = 1;
  }
}

// Gör två arrays; en med keys, en med values
let objKeys = Object.keys(daysOrdersObj);
let objValues = Object.values(daysOrdersObj);

// Varje datum har 1 (alltså ordrar) som default, måste ändra till 0
for (i in objValues) {
  if (objValues[i] == 1) {
    objValues[i] = 0;
  }
}

const chart = document.getElementById("myChart");

new Chart(chart, {
  type: "line",
  data: {
    labels: objKeys,
    datasets: [
      {
        label: "Ordrar",
        data: objValues,
        borderWidth: 1,
        tension: 0.1,
      },
    ],
  },
});
