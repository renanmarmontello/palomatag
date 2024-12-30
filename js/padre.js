var arPadres = []
padres();
function padres() {
    
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    } else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var datos = JSON.parse(this.responseText);
            for (let i = 0; i < datos.length; i++) {
                arPadres.push(datos[i]);
            }
            
        }
    };
    xmlhttp.open("GET", "php/padre.php", true);
    xmlhttp.send();
};

var ARsuarios = []
usuarios()
function usuarios() {
    
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    } else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var datos = JSON.parse(this.responseText);
            for (let i = 0; i < datos.length; i++) {
                ARsuarios.push(datos[i]);
            }
            rellenarUsu()
        }
    };
    xmlhttp.open("GET", "php/usuarios.php", true);
    xmlhttp.send();
};

function rellenarUsu(){
    var str=''; // variable to store the options
    
    for (var i=0; i < ARsuarios.length;++i){
    str += '<option value="'+ARsuarios[i].Name+' '+ARsuarios[i].SecondName1+' '+ARsuarios[i].SecondName2+' '+'" />'; // Storing options in variable
    }
    var my_list=document.getElementById("personas");
my_list.innerHTML = str;
}