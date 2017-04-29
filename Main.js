var json = [ {Name: "Asus PU301LA",			          Type: "Ноутбук",	  Price: 1000,  Id: "id7531", Picture: "http://www.foxtrot.com.ua/files/MediumImages/6180148/0.jpg"},
				     {Name: "Dell Inspiron 5749",		      Type: "Ноутбук",	  Price: 21000, Id: "id7532", Picture: "http://www.laptopworld.com.pk/media/catalog/product/cache/1/small_image/295x295/9df78eab33525d08d6e5fb8d27136e95/o/p/open_box_dell_inspiron_5749_silver__1_1.jpg"},
				     {Name: "MSI PCI-Ex GeForce GTX 960", Type: "Видеокарта", Price: 6000,  Id: "id7533", Picture: "https://dubizar.com/media/catalog/product/cache/1/small_image/295x295/9df78eab33525d08d6e5fb8d27136e95/z/o/zotac-geforce-gtx-960-amp-edition-4gb-zt-90309-10m.jpg"},
				     {Name: "Dell UltraSharp U2412M",	    Type: "Монитор",	  Price: 7150,  Id: "id7534", Picture: "http://i.dell.com/images/global/products/root/monitor-u2413-front-std-295x295.jpg"},
				     {Name: "A4Tech Bloody V8MA",		      Type: "Мышь",		    Price: 650,   Id: "id7535", Picture: "https://a4tech.ua/media/catalog/product/cache/14/small_image/295x295/9df78eab33525d08d6e5fb8d27136e95/v/8/v8ma_bloody_01.jpg"},
  				   {Name: "BOSCH MSM 6B700",			      Type: "Блендер",	  Price: 1299,  Id: "id7536", Picture: "http://megakom.info/media/catalog/product/cache/1/small_image/295x295/9df78eab33525d08d6e5fb8d27136e95/5/6/562358_v01_b_2.jpg"},
  				   {Name: "HP 255 G3",				          Type: "Ноутбук",    Price: 7100,  Id: "id7537", Picture: "http://phonetrader.ng/buy/media/catalog/product/cache/1/small_image/295x295/9df78eab33525d08d6e5fb8d27136e95/2/5/255_g3.jpg"},
				     {Name: "Lenovo G40-30",			        Type: "Ноутбук",	  Price: 8000,  Id: "id7538", Picture: "http://phonetrader.ng/buy/media/catalog/product/cache/1/small_image/295x295/9df78eab33525d08d6e5fb8d27136e95/g/4/g40_30.jpg"},
				     {Name: "Apple MacBook Air 13",	      Type: "Ноутбук",	  Price: 27099, Id: "id7539", Picture: "https://yellow.ua/media/catalog/product/cache/8/small_image/295x295/9df78eab33525d08d6e5fb8d27136e95/a/1/a1370_macbook_air_z0mg000cp_321233879061_1_2.jpg"}
				    ];

// Decode JSON and paste it to HTML table
function showResults () {
    var html = '';
    for (var e in json) {
        html += '<tr>'
            +'<td>'+json[e].Name+'</td>'
            +'<td>'+json[e].Type+'</td>'
            +'<td>'+json[e].Price+'</td>'
            +'<td>'+json[e].Id+'</td>'
            +"<td><img src='" + json[e].Picture + "'></td>"
        +'</tr>';
    }
    $('#results').html(html);
}

// Sort
$(function() {
    $('#headings th').click(function() {
        var id = $(this).attr('id');
        var asc = (!$(this).attr('asc')); // switch the order, true if not set
        
        // set asc="asc" when sorted in ascending order
        $('#headings th').each(function() {
            $(this).removeAttr('asc');
        });
        if (asc) $(this).attr('asc', 'asc');
        
        sortResults(id, asc);
    });
        
    showResults();
});

function sortResults(prop, asc) {
    json = json.sort(function(a, b) {
        if (asc) return (a[prop] > b[prop]);
        else return (b[prop] > a[prop]);
    });
    showResults();
}

// Filters
var filterTable = function (HTMLTBodyRef, aFilters) {
    var rows = HTMLTBodyRef.getElementsByTagName("TR"),
        filters = {}, n,
        walkThrough = function (rows) {
            var tr, i, f;
            for (i = 0; i < rows.length; i += 1) {
                tr = rows.item(i);
                for(f in filters) {
                    if (filters.hasOwnProperty(f)) {
                        if (false === filters[f].validate(tr.children[f].innerText) ) {
                            tr.style.display = "none"; break;
                        } else {
                            tr.style.display = "";
                        }
                    }
                }
            }
        };
    for(n in aFilters) {
        if (aFilters.hasOwnProperty(n)) {
            if (aFilters[n] instanceof filterTable.Filter) {
                filters[n] = aFilters[n];
            } else {
                filters[n] = new filterTable.Filter(aFilters[n]);
            }
            filters[n]._setAction("onchange", function () {walkThrough(rows);});
        }
    }
}

filterTable.Filter = function (HTMLElementRef, callback, eventName) {
    /* If function was not called as constructor, fix it */
    if (!(this instanceof arguments.callee)) {
        return new arguments.callee(HTMLElementRef, callback, eventName);
    }

    /* Argument to string */
    this.filters = {}.toString.call(HTMLElementRef) == "[object Array]" ? HTMLElementRef : [HTMLElementRef];

    this.validate = function (cellValue) {
        for (var i = 0; i < this.filters.length; i += 1) {
            if ( false === this.__validate(cellValue, this.filters[i], i) ) {
                return false;
            }
        }
    }

    this.__validate = function (cellValue, filter, i) {
        if (typeof callback !== "undefined") {
            return callback(cellValue, this.filters, i);
        }
        /* If there are spaces, delete them */
        filter.value = filter.value.replace(/^\s+$/g, "");
        /* Input is equal to the value of cell */
        return !filter.value || filter.value == cellValue;
    }

    this._setAction = function (anEventName, callback) {
        for (var i = 0; i < this.filters.length; i += 1) {
            this.filters[i][eventName||anEventName] = callback;
        }
    }
};


function show(container, Message) {
    container.className = 'message';
    var msgElem = document.createElement('span');
    msgElem.className = "output-message";
    msgElem.innerHTML = Message;
    container.appendChild(msgElem);
}

function showMessage(container) {
    container.className = '';
    if (container.lastChild.className == "output-message") {
        container.removeChild(container.lastChild);
    }
}

function calculate(form) {
    // Calculate Total

    var product = form.elements;

    showMessage(product.Quantity.parentNode);
    if (product.Product.value == 'A4Tech Bloody V8MA') {
        show(product.Total.parentNode, product.Quantity.value * 650)
        document.getElementById("Check_out").disabled = true;
    }
    
    else if(product.Product.value == 'Asus PU301LA') {
        show(product.Total.parentNode, product.Quantity.value * 1000)
        document.getElementById("Check_out").disabled = true;
    }
      
    else if(product.Product.value == 'BOSCH MSM 6B700') {
        show(product.Total.parentNode, product.Quantity.value * 1999)
        document.getElementById("Check_out").disabled = true;
    }

    else if(product.Product.value == 'MSI PCI-Ex GeForce GTX 960') {
        show(product.Total.parentNode, product.Quantity.value * 6000)
        document.getElementById("Check_out").disabled = true;
    }

    else if(product.Product.value == 'HP 255 G3') {
        show(product.Total.parentNode, product.Quantity.value * 7100)
        document.getElementById("Check_out").disabled = true;
    }
    else if(product.Product.value == 'Dell Inspiron 5749') {
        show(product.Total.parentNode, product.Quantity.value * 21000)
        document.getElementById("Check_out").disabled = true;
    }

    else {
        show(product.Total.parentNode, 'Sorry, we do not have this product')
        document.getElementById("Check_out").disabled = true;
    }
}    
