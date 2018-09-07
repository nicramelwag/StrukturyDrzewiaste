var idDoUsuniecia = 0;
var idDoEdycji = 0;
var idDoPrzeniesienia = 0;
var idDoDodania = 0;
var idCelu = 0;
var myEmail = "";
var myId = 0;
var zalogowany = false;
var pierwszyRaz = true;
var mojeDrzewo = false;

$( document ).ready(function() {
    init();
});

function init() {
    
    getDataFromSession();

    $("#loginPopup").popup({
        type: "tooltip",
        horizontal: "rightedge",
        vertical: "bottom",
        opacity: 0.3,
        transition: 'all 0.5s'
      });

      $("#loginButton").click(zaloguj);
      
      $("#registerButton").click(function() {
          $( "#register-form" ).dialog("open");
      });
      
      
       
    
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
  
     $( "#dialogTransfer" ).dialog({ autoOpen: false ,
        buttons: [
       {
         text: "Anuluj",
         icon: "ui-icon-cancel",
         click: function() {
           $( this ).dialog( "close" );
         }

       }, {
         text: "Prznieś węzeł",
         icon: "ui-icon-transferthick-e-w",
         click:function() {
           $( this ).dialog( "close" );
           transferNode();
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

  $( "#register-form" ).dialog({ autoOpen: false,
    modal: true,
    buttons: [
       {
         text: "Anuluj",
         icon: "ui-icon-cancel",
         click: function() {
           $( this ).dialog( "close" );
         }

       }, {
         text: "Zarejestruj się",
         icon: "ui-icon-person",
         click:function() {
           walidacjaUrzytkownika();
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


    $( "#dialogAdd" ).dialog({ autoOpen: false,
    modal: true,
    buttons: [
       {
         text: "Anuluj",
         icon: "ui-icon-cancel",
         click: function() {
           $( this ).dialog( "close" );
         }

       }, {
         text: "Dodaj",
         icon: "ui-icon-plus",
         click:function() {
           addNode();
           $( this ).dialog( "close" );
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

function getMyRoots() { //pobiera z bazy wszystkie elementy typu root
    var URL = "/StrukturyDrzewiaste/php/getMyRoots.php";
    var XHR = new XMLHttpRequest();

    XHR.open("GET", URL, true);

    XHR.onreadystatechange = function() {
            if (XHR.readyState === 4) {
                    if (XHR.status === 200)
                        insertMyRoots(XHR.responseText);
                    else
                        alert("Wystąpił błąd " + XHR.status);
            }
    };

    XHR.send(null);
}

function insertRoots(json) {
    var tabOfRoots = JSON.parse(json);
    var drzewa = $("#drzewa");
    var pojemnikNaWszyskieDrzewa = $("<div class='pojemnikNaWszyskieDrzewa'></div>");
    var opis = $("<h1>Wszystie drzewa</h1>");
    pojemnikNaWszyskieDrzewa.append(opis);
    for (var i =0; i<tabOfRoots.length; i++) {
        var div = $('<div class="root"></div>');
        var title = $('<div class="title">'+tabOfRoots[i].title+'</div>');
        var description = $('<div class="description">'+tabOfRoots[i].description+'</div>');
        div.append(title);
        div.append(description);
        div.click({id: tabOfRoots[i].idRoot}, showTree);
        pojemnikNaWszyskieDrzewa.append(div);
    }
    
    drzewa.append(pojemnikNaWszyskieDrzewa);
    
    if (zalogowany) {
        getMyRoots();
    }
}

function insertMyRoots(json) {
    var tabOfRoots = JSON.parse(json);
    if (tabOfRoots.length === 0) return;
    
    var drzewa = $("#drzewa");
    var pojemnikNaMojeDrzewa = $("<div class='pojemnikNaMojeDrzewa'></div>");
    var opis = $("<h1>Moje drzewa</h1>");
    pojemnikNaMojeDrzewa.append(opis);
    for (var i =0; i<tabOfRoots.length; i++) {
        var div = $('<div class="root"></div>');
        var title = $('<div class="title">'+tabOfRoots[i].title+'</div>');
        var description = $('<div class="description">'+tabOfRoots[i].description+'</div>');
        div.append(title);
        div.append(description);
        div.click({id: tabOfRoots[i].idRoot}, showTree);
        pojemnikNaMojeDrzewa.append(div);
    }
    
    drzewa.prepend(pojemnikNaMojeDrzewa);
}

function newRoot(){
    getDataFromSession();
    if (zalogowany) {
        $( "#dialog-form" ).dialog("open");
    } else {
        showAlert("Nowe drzewa mogą dodawać jedynie zalogowani użytkownicy");
    }
    
}

function dodajNoweDrzewo(){
    console.log("ENTRY dodajNoweDrzewo()");
    var root = $("#inputAddTreeRoot").val();
    var title = $("#inputAddTreeTitle").val();
    var description = $("#inputAddTreeDescription").val();
    console.log("root = " + root);
    console.log("title = " + title);
    console.log("description = " + description);
    if (root.trim().length === 0 || title.trim().length === 0 || description.trim().length === 0) {
        console.log("Muszisz wpisać jakąś nazwę");
        showAlert("Muszisz uzupełnić wszystkie pola formularza");
        return;
    } else {
        $( "#dialog-form" ).dialog( "close" );
        addTreeToDB(root, title, description);
    }
}

function getDataFromSession() {
    var URL = "/StrukturyDrzewiaste/php/getData.php";
  
    var XHR = new XMLHttpRequest();

    XHR.open("GET", URL, true);

    XHR.onreadystatechange = function() {
            if (XHR.readyState === 4) {
                    if (XHR.status === 200) {
                        saveData(XHR.responseText);
                    }
                    else
                        alert("Wystąpił błąd " + XHR.status);
            }
    };

    XHR.send(null);
}

function saveData(text) { //zapisuje dane w zmiennych globalnych oraz ustawia odpowiednio panel logowania
    console.log("ENTRY saveData("+text+")");
    var json = JSON.parse(text);
    zalogowany = json.zalogowany;
    if (zalogowany){
        myEmail = json.email;
        myId = parseInt(json.id);
    } 
    
    if(pierwszyRaz) { //panel logowaniea dodaje sie tylko za pierwszym razem
        pierwszyRaz = false;
        addPanelLogowania();
    }
}

function addPanelLogowania() {
    console.log("ENTRY addPanelLogowania");
    console.log("zalogowany = " + zalogowany);
    var loginText;
    var loginButton;
    if (zalogowany){        
        loginText = $(' <div id="login">'+myEmail+'</div>');
        loginButton = $('<button class="removeButton" id="przyciskLogowania">Log out</button>');
    } else {
          loginText = $('<div id="login">Nie jesteś zalogowany</div>');
          loginButton = $('<button class="addChildButton loginPopup_open" id="przyciskLogowania">Log in</button>');
    }
    loginButton.click(sprwdzStanPrzycisku);
    $("#panelLogowania").prepend(loginButton);
    $("#panelLogowania").prepend(loginText);
}

function addTreeToDB(root, title, description){
    var URL = "/StrukturyDrzewiaste/php/addTree.php";
  
    var XHR = new XMLHttpRequest();

    XHR.open("POST", URL, true);

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

    XHR.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    XHR.send("root="+root+"&title="+title+"&description="+description);
    
    
}

function showTree(event) {
    $("#drzewa").html("");
    getTree(event.data.id);
}

function getTree(id) {
    console.log("ENTRY getTree(id="+id+")");
    isMyTree(id);
    var URL = "/StrukturyDrzewiaste/php/getTree.php?id="+id;
    var XHR = new XMLHttpRequest();

    XHR.open("GET", URL, true);

    XHR.onreadystatechange = function() {
            if (XHR.readyState === 4) {
                    if (XHR.status === 200) {
                        drawTree(XHR.responseText);
                    }
                    else
                        alert("Wystąpił błąd " + XHR.status);
            }
    };

    XHR.send(null);
}

function isMyTree(id) {
    console.log("ENTRY isMyTree(id="+id+")");
    var URL = "/StrukturyDrzewiaste/php/isMyTree.php?id="+id;
    var XHR = new XMLHttpRequest();

    XHR.open("GET", URL, false);

    XHR.onreadystatechange = function() {
            if (XHR.readyState === 4) {
                    if (XHR.status === 200) {
                        console.log("response " + XHR.responseText);
                        if(XHR.responseText === "true") {
                            mojeDrzewo = true;
                        } else {
                            mojeDrzewo = false;
                        }
                    }
                    else
                        alert("Wystąpił błąd " + XHR.status);
            }
    };

    XHR.send(null);
}

function walidacjaUrzytkownika() {
    console.log("ENTRY walidacjaUrzytkownika()");
    var URL = "/StrukturyDrzewiaste/php/register.php";
    var XHR = new XMLHttpRequest();
    
    var email = $("#inputEmail").val();
    var password = $("#inputPassword").val();
    var password2 = $("#inputPassword2").val();
    
    console.log("email " + email);
    console.log("password " + password);
    console.log("password2 " + password2);

    XHR.open("POST", URL, true);

    XHR.onreadystatechange = function() {
            if (XHR.readyState === 4) {
                    if (XHR.status === 200)
                        wypiszKomunikat(XHR.responseText);
                    else
                        alert("Wystąpił błąd " + XHR.status);
            }
    };

    XHR.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    XHR.send("email="+email+"&password="+password+"&password2="+password2);
}

function wypiszKomunikat(text) {
    console.log("ENTRY wypiszKomunikat()");
    console.log(text);
    
    if (text === "ok") {
        $( "#register-form" ).dialog("close");
        showMessage("Resestracja przebiegła pomyślnie, możesz się teraz zalogować");
    } else {
       showAlert(text); 
    }
    
}

function zaloguj() {
    console.log("ENTRY zaloguj()");
    var URL = "/StrukturyDrzewiaste/php/login.php";
    var XHR = new XMLHttpRequest();
    
    var email = $("#loginEmail").val();
    var password = $("#loginPassword").val();
    
    myEmail = email;
    
    console.log("email " + email);
    console.log("password " + password);

    XHR.open("POST", URL, true);

    XHR.onreadystatechange = function() {
            if (XHR.readyState === 4) {
                    if (XHR.status === 200)
                        wypiszKomunikatLogowania(XHR.responseText);
                    else
                        alert("Wystąpił błąd " + XHR.status);
            }
    };

    XHR.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    XHR.send("email="+email+"&password="+password);
}

function wypiszKomunikatLogowania(text) {
    console.log("ENTRY wypiszKomunikatLogowania()");
    console.log(text);
    
    if (text === "ok") {
        $('#loginPopup').popup('hide');
        showMessage("Zostałeś pomyślnie zalogowany");
        $("#login").text(myEmail);
        zalogowany = true;
        toggleLoginButton();
        getMyRoots();
    } else {
       showAlert(text); 
    }
    
}

function toggleLoginButton() {
    console.log("ENTRY toggleLoginButton()");
    $("#przyciskLogowania").toggleClass("addChildButton");
    $("#przyciskLogowania").toggleClass("removeButton");
    $("#przyciskLogowania").toggleClass("loginPopup_open");
    
    var text = $("#przyciskLogowania").text();
    console.log("text = "+ text);
    
    
    if (text === "Log in") {
        text = "Log out";
    } else if (text === "Log out") {
        text ="Log in";
    }
    
     $("#przyciskLogowania").text(text);
}

function drawTree(json) {
    var poziom = 0;
    var drzewa = $("#drzewa");
    var pasekNarzedzi = getPasekNarzedzi();
    drzewa.append(pasekNarzedzi);
    var tree = JSON.parse(json);
    var div = getNode( tree[0].id, tree[0].name);
    div.addClass("aktualRoot");
    drzewa.append(div);
    $("#node"+tree[0].id + " .arrow").remove();
    var div2 = getNodes(tree[1], poziom);
    drzewa.append(div2);
}

function getPasekNarzedzi() {
    var pasekNarzedzi = $("<div id='pasekNarzedzi'></div>");

     var expandButton = $('<div class="toolButton">Rozwiń wszystko</div>');
     expandButton.click(expandAll);
     
     var foldButton = $('<div class="toolButton">Zwiń wszystko</div>');
     foldButton.click(foldAll);
     
     pasekNarzedzi.append(expandButton);
     pasekNarzedzi.append(foldButton);
    
    return pasekNarzedzi;
}

function expandAll(){
    console.log("ENTRY expandAll()");
    var id  = getIdByNode($(".aktualRoot"));
    console.log("id = " + id);
    expandBranch(id);
}

function expandBranch(id){
     var container = $("#node"+id).next();
     rozwinContainer(id);
     container.children().each(function() {
        var branchId = getIdByNode($( this ).children().first());
        expandBranch(branchId);
    });
    
}

function foldAll(){
    console.log("ENTRY expandAll()");
    var id  = getIdByNode($(".aktualRoot"));
    console.log("id = " + id);
    foldBranch(id);
}

function foldBranch(id){
     var container = $("#node"+id).next();
     zwinContainer(id);
     container.children().each(function() {
        var branchId = getIdByNode($( this ).children().first());
        foldBranch(branchId);
    });
    
}

function getNodes(tree, poziom){
    poziom++;
    //container składa się z zestawów
    var container = $('<div class="container"></div>'); 
    //zestaw skłda się z jednego elementu typu node oraz z containera
    var node;
    for (var i =0; i<tree.length; i++) {
        //najpierw do zestau dodawany jest element typu node
        if (i%2 === 0) {
             node = getNode(tree[i].id,  tree[i].name);
        } else {//następnie do zestawu dodawany jest element typu container oraz cały zestaw dodawany jest do containera
            var zestaw = $('<div class="zestaw"></div>');
            zestaw.append(node);
            var containerWewnetrzny = getNodes(tree[i], poziom);
            zestaw.append(containerWewnetrzny);
            var id = tree[i-1].id;
            console.log("else " +id);
            zestaw.draggable({ revert: true,  
                handle: ".node .arrow",
                start: function( event, ui ) {
                    var id = parseInt($(this).children().first().attr("id").substr(4));
                    idDoPrzeniesienia = id;
                }
            });
            container.append(zestaw);
        }
    }
    
    return container;
}

//zwraca element (przycisk o odpowideniej nazwie z odpowidnim marginesem wraz ze strzałką do rozijania zagnieżdrzonych elementów
function getNode(id, name) { 
    console.log("ENTRY getNode( id = "+id+", name= "+name+")");
    var div = $('<div id="node'+id+'" class="node"></div>');
    var button = $('<button class="button my_popup'+id+'_open" ></button>');
    var popUp = generatePopup(id);
    if (mojeDrzewo) var arrow = $('<div class="arrow" style="float: left; margin: 2px"><img src="img/move.png" width="28" height="28"></div>');
    var img = $('<div class="arrowImg" ><img src="img/down.png" width="32" height="32"></div>');
    var clear = $('<div style="clear: both;"></div>');
    img.click({id: id}, toggleContainer);
    button.click({id: id}, showPopup);
    button.html(name);
    div.append(button);
    div.append(popUp);
    if (mojeDrzewo) div.append(arrow);
    div.append(img);
    div.append(clear);
 
    div.droppable({
     drop: function( event, ui ) {
         $( this ).removeClass("nodeOver");
         idCelu = id;
         showTransferDialog();
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
     
     var addChildButton = $('<div class="addChildButton">Dodaj węzeł</div>');
     addChildButton.click({id: id}, showAddDialog);
     
     //addChildButton.click({id: id}, showAddChildPopup);
     var removeButton = $('<div class="removeButton">Usuń węzeł</div>');
     removeButton.click({id: id}, showDeleteDialog);
     
     var editButton = $('<div class="editButton">Edytuj</div>');
     editButton.click({id: id}, showEditDialog);
     
     var sortButton = $('<div class="sortButton">Sortuj</div>');
     sortButton.click({id: id}, sort);
     
     
     if (mojeDrzewo) popUp.append(addChildButton);
     if (mojeDrzewo) popUp.append(editButton);
     popUp.append(sortButton);
     if (mojeDrzewo) popUp.append(removeButton);
     

     return popUp;
}

function sort(event) {
    var id = event.data.id;
    $('#my_popup'+id).popup('hide');
    var contener = $("#node"+id).next();
    $("#node"+id).next().detach();
    console.log(contener);
    contener = sortuj(contener);
    $("#node"+id).parent().append(contener);
    rozwinContainer(id);
}

function showDeleteDialog(event) {
    idDoUsuniecia = event.data.id;
    $( "#dialogDelete" ).dialog("open");
}

function showTransferDialog() {
    $("#doPrzeniesienia").text(getNameByid(idDoPrzeniesienia));
    $("#cel").text(getNameByid(idCelu));
    $( "#dialogTransfer" ).dialog("open");
}

function showEditDialog(event) {
    idDoEdycji = event.data.id;
    $( "#dialogEdit" ).dialog("open");
    var button = $("#node"+idDoEdycji+" button");
    var aktualnaNazwa = button.text();
    $("#inputEdit").val(aktualnaNazwa);
}

function showAddDialog(event) {
    idDoDodania = event.data.id;
    $( "#dialogAdd" ).dialog("open");
}

function addNode() {
    var id = idDoDodania;
    console.log("ENTRY addNode(id = "+id+")");
    
    var name = $("#inputAddNode").val();
    console.log("name = " + name);
    if (name.trim().length === 0) {
        console.log("Muszisz wpisać jakąś nazwę");
        showAlert("Muszisz wpisać jakąś nazwę");
        return;
    }
    
    var URL = "php/addNode.php?id="+id+"&name="+name;
  
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
    var node = getNode(id, name);
    var container = $('<div class="container"></div>');
    var zestaw = $('<div class="zestaw"></div>');
    zestaw.append(node);
    zestaw.append(container);
    zestaw.draggable({ revert: true,  
                handle: ".node .arrow",
                start: function( event, ui ) {
                    var id = parseInt($(this).children().first().attr("id").substr(4));
                    idDoPrzeniesienia = id;
                }
            });
    parentNode.next().append(zestaw);
    $("#inputAddNode").val("");
}

function deleteNode() {
    var URL = "php/deleteNode.php?id="+idDoUsuniecia;
  
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
      var URL = "php/changeNode.php?id="+idDoEdycji+"&name="+name;

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

function transferNode() {
    var URL = "php/transferNode.php?doPrzniesienia="+idDoPrzeniesienia+"&cel="+idCelu;
  
    var XHR = new XMLHttpRequest();

    XHR.open("GET", URL, true);

    XHR.onreadystatechange = function() {
            if (XHR.readyState === 4) {
                    if (XHR.status === 200) {
                        console.log(XHR.responseText);
                        transferNodeDOM();
                    }
                    else
                        alert("Wystąpił błąd " + XHR.status);
            }
    };

    XHR.send(null);
}

function deleteNodeDOM(){
    var node = $("#node"+idDoUsuniecia);
    $('#my_popup'+idDoUsuniecia).popup('hide');
    node.parent().remove();
}

function editNodeDOM(id, name){
    var button = $("#node"+id+" button");
    $('#my_popup'+id).popup('hide');
    button.text(name);
}

function transferNodeDOM(){ 
    var zestaw = $("#node"+idDoPrzeniesienia).parent().detach();
    $("#node"+idCelu).next().append(zestaw);
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

function rozwinContainer(id) {
    $("#node"+id).next().show(300);

     var imgName = "img/up.png";

    $("#node"+id + " div.arrowImg img").attr("src", imgName);
}

function zwinContainer(id) {
    $("#node"+id).next().hide(300);

     var imgName = "img/down.png";

    $("#node"+id + " div.arrowImg img").attr("src", imgName);
}

function showPopup(event) {
    var id = event.data.id;
    $('#my_popup'+id).popup({
        tooltipanchor: event.target
    });
}

function sprwdzStanPrzycisku(event) {
    console.log("ENTRY sprwdzStanPrzycisku()");
    var text = $("#przyciskLogowania").text();
    
    if (text === "Log in") {
        showLoginPopup(event);
    } else if (text === "Log out") {
        logOut();
    }
}

function showLoginPopup(event) {
    console.log("ENTRY showLoginPopup()" + event.target);
    $("#loginPopup").popup({
        tooltipanchor: event.target
    });
}

function logOut() {
    console.log("ENTRY logOut()");
    var URL = "/StrukturyDrzewiaste/php/logout.php";
    var XHR = new XMLHttpRequest();
    

    XHR.open("GET", URL, true);

    XHR.onreadystatechange = function() {
            if (XHR.readyState === 4) {
                    if (XHR.status === 200){
                        logOutDOM();
                    }  else
                        alert("Wystąpił błąd " + XHR.status);
            }
    };

    XHR.send(null);
}

function logOutDOM() {
    zalogowany = false;
    toggleLoginButton();
    $(".pojemnikNaMojeDrzewa").remove();
    $("#login").text("Nie jesteś zalogowany");
}

          

function getNameByid(id){
    var node = $("#node"+id);
    var text = node.children().first().text();
    return text;
}

function getIdByNode(node) {
    var idText = node.attr("id");
    return idText.substr(4);
}

function getNameByNode(node) {
    return node.children().first().text();
}

function sortuj(container) {
    var tablica = new Array(container.children().length);
    $.each(container.children(), function(index, value) {
        tablica[index] = value;
        console.log(value);
    });
    console.log(tablica.length);
    var newContainer = $("<div class='container'></div>");
    tablica = cleanArray(quickSort(tablica));
    for (var i = 0; i<tablica.length; i++) {
        newContainer.append($(tablica[i]));
    }
    console.log(tablica);
    console.log(newContainer);
    return newContainer;
}

function quickSort(tablica) {
    console.log("ENTRY quickSort()");
    console.log("tablica.length = " + tablica.length);
    if (tablica.length === 0) return new Array(0);
    if (tablica.length === 1) {
        var jedynyElement = tablica[0];
        var tablicaJednoelementowa = new Array(1);
        tablicaJednoelementowa.push(jedynyElement);
        return tablicaJednoelementowa;
    }
    
    var firstElement = tablica[0];
    console.log("firstElement = " + firstElement);
    var tablicaMniejszych = new Array();
    var tablicaWiekszych = new Array();
    
    for (var i=1; i<tablica.length; i++) {
        if (campare(firstElement, tablica[i]) > 0) tablicaMniejszych.push(tablica[i]);
        else tablicaWiekszych.push(tablica[i]);
    }
    
    var tabliaMnijszychPosortowana = quickSort(tablicaMniejszych);
    var tablicaWiekszychPosortowana = quickSort(tablicaWiekszych);
    
    var tablicaPosortowana = tabliaMnijszychPosortowana.concat(firstElement, tablicaWiekszychPosortowana);
    //tablicaPosortowana = tablicaPosortowana.concat(tablicaWiekszychPosortowana);
    
    return tablicaPosortowana;
    
}

function campare(zestaw1, zestaw2) {
    var wartosc1 = getNameByZestaw(zestaw1);
    var wartosc2 = getNameByZestaw(zestaw2);
    //console.log("compare (" + wartosc1 + ", " + wartosc2 +")");
    //console.log("return " + wartosc1.localeCompare(wartosc2));
    
    return wartosc1.localeCompare(wartosc2);
}

function getNameByZestaw(zestaw) {
    //console.log("ENTRY getNameByZestaw("+zestaw+")");
    //console.log("RETURN " + zestaw.firstChild.firstChild.innerHTML);
    return zestaw.firstChild.firstChild.innerHTML;
}

function cleanArray(actual) {
  var newArray = new Array();
  for (var i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i]);
    }
  }
  return newArray;
}
