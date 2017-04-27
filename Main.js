$(document).ready(function () {
	var json = [ {"productName": "Asus PU301LA",			   "productType": "Ноутбук",	"price": "1200", "productId": "id7531"},
				 {"productName": "Dell Inspiron 5749",		   "productType": "Ноутбук",	"price": "1200", "productId": "id7532"},
				 {"productName": "MSI PCI-Ex GeForce GTX 960", "productType": "Видеокарта", "price": "1200", "productId": "id7533"},
				 {"productName": "Dell UltraSharp U2412M",	   "productType": "Монитор",	"price": "1200", "productId": "id7534"},
				 {"productName": "A4Tech Bloody V8MA",		   "productType": "Мышь",		"price": "1200", "productId": "id7535"},
  				 {"productName": "BOSCH MSM 6B700",			   "productType": "Блендер",	"price": "1200", "productId": "id7536"},
  				 {"productName": "HP 255 G3",				   "productType": "Ноутбук",    "price": "1200", "productId": "id7537"},
				 {"productName": "Lenovo G40-30",			   "productType": "Ноутбук",	"price": "1200", "productId": "id7538"},
				 {"productName": "Apple MacBook Air 13",	   "productType": "Ноутбук",	"price": "1200", "productId": "id7539"}
				];
    var tr;
    for (var i = 0; i < json.length; i++) {
    	tr = $('<tr/>');
        tr.append("<td>" + json[i].productName + "</td>");
        tr.append("<td>" + json[i].productType + "</td>");
        tr.append("<td>" + json[i].price + "</td>");
        tr.append("<td>" + json[i].productId + "</td>");
        $('table').append(tr);
    }
});

function sortTable() {
  var table, rows, switching, i, x, y, shouldSwitch;
  table = document.getElementById("myTable");
  switching = true;
  /*Make a loop that will continue until
  no switching has been done:*/
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = table.getElementsByTagName("TR");
    /*Loop through all table rows (except the
    first, which contains table headers):*/
    for (i = 1; i < (rows.length - 1); i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare,
      one from current row and one from the next:*/
      x = rows[i].getElementsByTagName("TD")[0];
      y = rows[i + 1].getElementsByTagName("TD")[0];
      //check if the two rows should switch place:
      if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
        //if so, mark as a switch and break the loop:
        shouldSwitch= true;
        break;
      }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
    }
  }
}


/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

