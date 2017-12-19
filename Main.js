var json = [{Name: "Asus PU301LA",			      Type: "Laptop",	  Price: 1000,  Id: "id7531", Picture: "img/asus.png"},
			{Name: "Dell Inspiron 5749",		  Type: "Laptop",	  Price: 21000, Id: "id7532", Picture: "img/dell.jpg"},
			{Name: "MSI PCI-Ex GeForce GTX 960",  Type: "VideoCard",  Price: 6000,  Id: "id7533", Picture: "img/geforce.jpg"},
			{Name: "Dell UltraSharp U2412M",	  Type: "Monitor",	  Price: 7150,  Id: "id7534", Picture: "img/dell2.jpg"},
			{Name: "A4Tech Bloody V8MA",		  Type: "Mouse",	  Price: 650,   Id: "id7535", Picture: "img/a4tech.jpg"},
  			{Name: "BOSCH MSM 6B700",			  Type: "Blender",	  Price: 1299,  Id: "id7536", Picture: "img/blender.jpg"},
  		    {Name: "HP 255 G3",				      Type: "Laptop",     Price: 7100,  Id: "id7537", Picture: "img/hp.jpg"},
		    {Name: "Lenovo G40-30",			      Type: "Laptop",	  Price: 8000,  Id: "id7538", Picture: "img/lenovo.jpg"},
		    {Name: "Apple MacBook Air 13",	      Type: "Laptop",	  Price: 27099, Id: "id7539", Picture: "img/macbook.jpg"}
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
