var idDoUsuniecia = 0;
var idDoEdycji = 0;
var idDoPrzeniesienia = 0;
var idCelu = 0;

$( document ).ready(function() {
    init();
});

function init() {
    $( "#dialogDelete" ).dialog({ autoOpen: false ,
        buttons: [
       {
         text: "Anuluj",
         icon: "ui-icon-cancel",
         click: function() {
           $( this ).dialog( "close" );
         }

       }, {
         text: "Usuń węzeł",
         icon: "ui-icon-trash",
         click:function() {
           $( this ).dialog( "close" );
           deleteNode();
         } 
       }
     ],
     minWidth: 400,
     modal: true
  });
  
  $( "#dialog-form" ).dialog({ autoOpen: false,
    modal: true,
    buttons: [
       {
         text: "Anuluj",
         icon: "ui-icon-cancel",
         click: function() {
           $( this ).dialog( "close" );
         }

       }, {
         text: "Utwórz nowe drzewo",
         icon: "ui-icon-plus",
         click:function() {
           dodajNoweDrzewo();
         } 
       }
     ],
    minWidth: 450});

    $( "#dialogEdit" ).dialog({ autoOpen: false,
    modal: true,
    buttons: [
       {
         text: "Anuluj",
         icon: "ui-icon-cancel",
         click: function() {
           $( this ).dialog( "close" );
         }

       }, {
         text: "Zapisz",
         icon: "ui-icon-disk",
         click:function() {
           edytujNazwe();
         } 
       }
     ],
    minWidth: 450});
  
  getAllRoots();
}

function getAllRoots() { //pobiera z bazy wszystkie elementy typu root
    var URL = "/StrukturyDrzewiaste/php/getAllRoots.php";
    var XHR = new XMLHttpRequest();

    XHR.open("GET", URL, true);

    XHR.onreadystatechange = function() {
            if (XHR.readyState === 4) {
                    if (XHR.status === 200)
                        insertRoots(XHR.responseText);
                    else
                        alert("Wystąpił błąd " + XHR.status);
            }
    };

    XHR.send(null);
}

function insertRoots(json) {
    var tabOfRoots = JSON.parse(json);
    var drzewa = $("#drzewa");
    for (var i =0; i<tabOfRoots.length; i++) {
        var div = $('<div class="root"></div>');
        div.html(tabOfRoots[i].name);
        div.click({id: tabOfRoots[i].id}, showTree);
        drzewa.append(div);
    }
}

function newRoot(){
    $( "#dialog-form" ).dialog("open");
}

function dodajNoweDrzewo(){
    var name = $("#inputAddTree").val();
    console.log("name = " + name);
    if (name.trim().length === 0) {
        console.log("Muszisz wpisać jakąś nazwę");
        showAlert("Muszisz wpisać jakąś nazwę");
        return;
    } else {
        $( "#dialog-form" ).dialog( "close" );
        addTreeToDB(name);
    }
}

function addTreeToDB(name){
    var URL = "/StrukturyDrzewiaste/php/addTree.php?name="+name;
  
    var XHR = new XMLHttpRequest();

    XHR.open("GET", URL, true);

    XHR.onreadystatechange = function() {
            if (XHR.readyState === 4) {
                    if (XHR.status === 200) {
                        console.log("INSERT id: " + XHR.responseText);
                        location.href="index.html";
                    }
                    else
                        alert("Wystąpił błąd " + XHR.status);
            }
    };

    XHR.send(null);
    
}

function showTree(event) {
    $("#drzewa").html("");
    getTree(event.data.id);
}

function getTree(id) {
    console.log(id);
    var URL = "/StrukturyDrzewiaste/php/getTree.php?id="+id;
    var XHR = new XMLHttpRequest();

    XHR.open("GET", URL, true);

    XHR.onreadystatechange = function() {
            if (XHR.readyState === 4) {
                    if (XHR.status === 200)
                        drawTree(XHR.responseText);
                    else
                        alert("Wystąpił błąd " + XHR.status);
            }
    };

    XHR.send(null);
}

function drawTree(json) {
    var poziom = 0;
    var marginLeft = poziom*40;
    var drzewa = $("#drzewa");
    var tree = JSON.parse(json);
    var div = getNode(marginLeft, tree[0].id, tree[0].name);
    drzewa.append(div);
    var div2 = getNodes(tree[1], poziom);
    drzewa.append(div2);
}

function getNodes(tree, poziom){
    poziom++;
    var marginLeft = poziom*40;
    var container = $('<div class="container"></div>');
    for (var i =0; i<tree.length; i++) {
        if (i%2 === 0) {
             var node = getNode(marginLeft, tree[i].id, tree[i].name);
             container.append(node);
        } else {
            var div2 = getNodes(tree[i], poziom);
            container.append(div2);
        }
    }
    
    return container;
}

//zwraca element (przycisk o odpowideniej nazwie z odpowidnim marginesem wraz ze strzałką do rozijania zagnieżdrzonych elementów
function getNode(marginLeft, id, name) { 
    console.log("ENTRY getNode(marginLeft= "+ marginLeft + ", id = "+id+", name= "+name+")");
    var div = $('<div id="node'+id+'" class="node" style="margin-left: '+marginLeft+'px"></div>');
    var button = $('<button class="button my_popup'+id+'_open" ></button>');
    var popUp = generatePopup(id);
    var arrow = $('<div style="float: left; margin: 2px"><img src="img/move.png" width="28" height="28"></div>');
    var img = $('<div class="arrowImg" ><img src="img/down.png" width="32" height="32"></div>');
    var clear = $('<div style="clear: both;"></div>');
    img.click({id: id}, toggleContainer);
    button.click({id: id}, showPopup);
    button.html(name);
    div.append(button);
    div.append(popUp);
    div.append(arrow);
    div.append(img);
    div.append(clear);
    div.draggable({ revert: true,  
        handle: arrow,
     start: function( event, ui ) {
         idDoPrzeniesienia = id;
     }});
 
    div.droppable({
     drop: function( event, ui ) {
         $( this ).removeClass("nodeOver");
         idCelu = id;
         alert("id do przeniesienia: " + idDoPrzeniesienia +  " a id culu: " + idCelu);
      },
     over: function( event, ui ) {
         $( this ).addClass("nodeOver");
     },
     out: function( event, ui ) {
         $( this ).removeClass("nodeOver");
     }
    });
    popUp.popup({
        type: "tooltip",
        horizontal: "leftedge",
        vertical: "bottom",
        opacity: 0.3,
        transition: 'all 0.3s'
      });
    return div;
}

function generatePopup(id) {
     console.log("ENTRY generatePopup(id = "+id+")");
     var popUp = $('<div id="my_popup'+id+'" class="popup"></div>');
     var addChildButton = $('<div class="addChildButton addChilPpopup'+id+'_open">Dodaj węzeł</div>');
     
     var addChildPopup = $('<div id="addChilPpopup'+id+'" class="addChilPpopup"></div>');
     var input = $('<input type="text" id="inputAddChild'+id+'">');
     var addButton = $('<div class="addChildButton">Dodaj</div>');
     addButton.click({id: id}, addNode);
     addChildPopup.append(input);
     addChildPopup.append(addButton);
     
     //addChildButton.click({id: id}, showAddChildPopup);
     var removeButton = $('<div class="removeButton">Usuń węzeł</div>');
     removeButton.click({id: id}, showDeleteDialog);
     
     var editButton = $('<div class="editButton">Edytuj</div>');
     editButton.click({id: id}, showEditDialog);
     
     
     popUp.append(addChildButton);
     popUp.append(editButton);
     popUp.append(removeButton);
     popUp.append(addChildPopup);
     
     addChildPopup.popup({
        opacity: 0.3,
        transition: 'all 0.3s'
      });
     return popUp;
}

function showDeleteDialog(event) {
    idDoUsuniecia = event.data.id;
    $( "#dialogDelete" ).dialog("open");
}

function showEditDialog(event) {
    idDoEdycji = event.data.id;
    $( "#dialogEdit" ).dialog("open");
    var button = $("#node"+idDoEdycji+" button");
    var aktualnaNazwa = button.text();
    $("#inputEdit").val(aktualnaNazwa);
}

function addNode(event) {
    var id = event.data.id;
    console.log("ENTRY addNode(id = "+id+")");
    
    var name = $("#inputAddChild"+id).val();
    console.log("name = " + name);
    if (name.trim().length === 0) {
        console.log("Muszisz wpisać jakąś nazwę");
        showAlert("Muszisz wpisać jakąś nazwę");
        return;
    }
    
    var URL = "/StrukturyDrzewiaste/php/addNode.php?id="+id+"&name="+name;
  
    var XHR = new XMLHttpRequest();

    XHR.open("GET", URL, true);

    XHR.onreadystatechange = function() {
            if (XHR.readyState === 4) {
                    if (XHR.status === 200) {
                        console.log("INSERT id: " + XHR.responseText);
                        addNodeDOM(XHR.responseText, id, name);
                    }
                    else
                        alert("Wystąpił błąd " + XHR.status);
            }
    };

    XHR.send(null);
    
}

function addNodeDOM(id, parentId, name) {
    console.log("ENTRY addNodeDOM(id = "+id+", parentId = "+parentId+", name= "+name+")");
    $('#addChilPpopup'+parentId).popup('hide');
    $('#my_popup'+parentId).popup('hide');
    var parentNode = $("#node"+parentId);
    var marginLeft = parentNode.css("margin-left");
    var marginLeftVal = parseInt(marginLeft.substr(0, marginLeft.indexOf("px")));
    var node = getNode(marginLeftVal+40, id, name);
    var container = $('<div class="container"></div>');
    parentNode.next().append(node);
    parentNode.next().append(container);

}

function deleteNode() {
    var URL = "/StrukturyDrzewiaste/php/deleteNode.php?id="+idDoUsuniecia;
  
    var XHR = new XMLHttpRequest();

    XHR.open("GET", URL, true);

    XHR.onreadystatechange = function() {
            if (XHR.readyState === 4) {
                    if (XHR.status === 200) {
                        console.log(XHR.responseText);
                        deleteNodeDOM();
                    }
                    else
                        alert("Wystąpił błąd " + XHR.status);
            }
    };

    XHR.send(null);
}

function edytujNazwe() {
    
    var name = $("#inputEdit").val();
    console.log("name = " + name);
    if (name.trim().length === 0) {
        console.log("Muszisz wpisać jakąś nazwę");
        showAlert("Muszisz wpisać jakąś nazwę");
        return;
    } else {
      $( "#dialogEdit" ).dialog("close");
      var URL = "/StrukturyDrzewiaste/php/changeNode.php?id="+idDoEdycji+"&name="+name;

        var XHR = new XMLHttpRequest();

        XHR.open("GET", URL, true);

        XHR.onreadystatechange = function() {
                if (XHR.readyState === 4) {
                        if (XHR.status === 200) {
                            console.log(XHR.responseText);
                            editNodeDOM(idDoEdycji, name);
                        }
                        else
                            alert("Wystąpił błąd " + XHR.status);
                }
        };

        XHR.send(null);  
    }
}

function deleteNodeDOM(){
    var node = $("#node"+idDoUsuniecia);
    $('#my_popup'+idDoUsuniecia).popup('hide');
    node.next().remove();
    node.remove();
}

function editNodeDOM(id, name){
    var button = $("#node"+id+" button");
    $('#my_popup'+id).popup('hide');
    button.text(name);
}

function toggleContainer(event) {
    var id = event.data.id;
    $("#node"+id).next().toggle(300);
    var imgName = $("#node"+id + " div.arrowImg img").attr("src");
    if ( imgName === "img/down.png") {
        imgName = "img/up.png";
    } else if (imgName === "img/up.png") {
        imgName = "img/down.png";
    }
    
    $("#node"+id + " div.arrowImg img").attr("src", imgName);
}

function showPopup(event) {
    var id = event.data.id;
    $('#my_popup'+id).popup({
        tooltipanchor: event.target
    });
}