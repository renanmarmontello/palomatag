var ArDatos = [];
var Arsubtipo = [];
var ArMarca = [];
var ArModelo = [];
var ArSO = [];
var ArDisco = [];
datosAR();

function datosAR() {
    ArDisco = [];
ArSO = [];
ArModelo = [];
ArMarca = [];
Arsubtipo = [];
ArDatos = [];
    if (window.XMLHttpRequest) {
        xmlhttp = new XMLHttpRequest();
    } else {
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var datos = JSON.parse(this.responseText);
            for (let i = 0; i < datos.length; i++) {
                ArDatos.push(datos[i]);
                if(datos[i].SUBTIPOAF != undefined){
                    Arsubtipo.push(datos[i]);
                }
                if(datos[i].MARCA != undefined && datos[i].MODELO == undefined ){
                    ArMarca.push(datos[i]);
                }
                if(datos[i].MODELO != undefined){
                    ArModelo.push(datos[i]);
                }
                if(datos[i].SISTEMAOPERATIVO != undefined){
                    ArSO.push(datos[i]);
                }
                if(datos[i].CAPACIDAD != undefined){
                    ArDisco.push(datos[i]);
                }
            }
            
        }
    };
    xmlhttp.open("GET", "php/subtipoAF.php", true);
    xmlhttp.send();
};


