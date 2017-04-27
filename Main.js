$(document).ready(function () {
	var json = [ {"productName": "Asus PU301LA",			   "productType": "Ноутбук", 	"productId": "id7531"},
				 {"productName": "Dell Inspiron 5749",		   "productType": "Ноутбук",	"productId": "id7532"},
				 {"productName": "MSI PCI-Ex GeForce GTX 960", "productType": "Видеокарта", "productId": "id7533"},
				 {"productName": "Dell UltraSharp U2412M",	   "productType": "Монитор",	"productId": "id7534"},
				 {"productName": "A4Tech Bloody V8MA",		   "productType": "Мышь",		"productId": "id7535"},
  				 {"productName": "BOSCH MSM 6B700",			   "productType": "Блендер",	"productId": "id7536"},
  				 {"productName": "HP 255 G3",				   "productType": "Ноутбук",	"productId": "id7537"},
				 {"productName": "Lenovo G40-30",			   "productType": "Ноутбук",	"productId": "id7538"},
				 {"productName": "Apple MacBook Air 13",	   "productType": "Ноутбук",	"productId": "id7539"}
				];
    var tr;
    for (var i = 0; i < json.length; i++) {
    	tr = $('<tr/>');
        tr.append("<td>" + json[i].productName + "</td>");
        tr.append("<td>" + json[i].productType + "</td>");
        tr.append("<td>" + json[i].productId + "</td>");
        $('table').append(tr);
    }
});