var Activarscaner = true;
var codigo = '';

startScanner();
var _scannerIsRunning = false;

function startScanner() {
    Quagga.init({
            inputStream: {
                name: "Live",
                type: "LiveStream",
                // Or '#yourElement' (optional)
                target: document.querySelector('#scanner-container')},
                
            decoder: {
                readers: ["code_128_reader"]
            }
        },
        function (err) {
            if (err) {
                console.log(err);
                return
            }
            console.log("Initialization finished. Ready to start");
            Quagga.start();
            _scannerIsRunning = true;
        });
    Quagga.onProcessed(function (result) {
        var drawingCtx = Quagga.canvas.ctx.overlay,
            drawingCanvas = Quagga.canvas.dom.overlay;
        if (result) {
            if (result.boxes) {
                drawingCtx.clearRect(0, 0, parseInt(drawingCanvas.getAttribute("width")), parseInt(
                    drawingCanvas.getAttribute("height")));
                result.boxes.filter(function (box) {
                    return box !== result.box;
                }).forEach(function (box) {
                    Quagga.ImageDebug.drawPath(box, {
                        x: 0,
                        y: 1
                    }, drawingCtx, {
                        color: "green",
                        lineWidth: 2
                    });
                });
            }
            if (result.box) {
                Quagga.ImageDebug.drawPath(result.box, {
                    x: 0,
                    y: 1
                }, drawingCtx, {
                    color: "#00F",
                    lineWidth: 2
                });
            }
            if (result.codeResult && result.codeResult.code) {
                Quagga.ImageDebug.drawPath(result.line, {
                    x: 'x',
                    y: 'y'
                }, drawingCtx, {
                    color: 'red',
                    lineWidth: 3
                });
            }
        }
    });
    Quagga.onDetected(function (result) {
        if (rellenarTT) {
rellenarTT = false;
            var tt = result.codeResult.code
            selPadre.innerHTML = parseInt(tt.substring(6, 13)).toString();
            selhab.innerHTML = parseInt(tt.substring(6, 13)).toString();
            on.style = 'display:none;'
activofijos(codigo);
        }
        if (Activarscaner) {
            Activarscaner = false;
            on.style = 'display:none;'
            console.log("Barcode detected and processed : [" + result.codeResult.code + "]", result);
            document.getElementById('imprime').innerHTML = result.codeResult.code;
            var codigo = result.codeResult.code;

            activofijos(codigo)
        }
if(!rellenarTT || !Activarscaner){
on.style = 'display:none;'
            console.log("Barcode detected and processed : [" + result.codeResult.code + "]", result);
            document.getElementById('imprime').innerHTML = result.codeResult.code;
            var codigo = result.codeResult.code;
activofijos(codigo)
}
    });
}

var on = document.getElementById('scanner-container');
// Start/stop scanner
document.getElementById("btn").addEventListener("click", function () {
    Activarscaner = true;
    on.style = 'display:block;'
    $("html, body").animate({
        scrollTop: 0
    }, 500);
}, false);


var ArAF = [];
//var m = 'S01P180000006';
var resultadoFinal = '';
//activofijos(m);

function activofijos(codigo) {
    m = codigo;
    var datos = {
        datos: codigo.toString()
    };

    $.ajax({
        url: "php/activofijo.php",
        type: "get", //send it through get method
        data: datos,
        success: function (result) {
            var m = JSON.parse(result)
            resultadoFinal = m[0];
            if (resultadoFinal == undefined) {
                //  rellenar()
            } else {
                rellenar(resultadoFinal)
            }
        },
        error: function () {
            alert('error');
        }
    });
}

var contscaner = document.getElementById('contenedor');
var continfo = document.getElementById('contenedorinfo');
var Activofijo = document.getElementById('Activofijo');
var TipoAF = document.getElementById('TipoAF');
var Sociedad = document.getElementById('Sociedad');
var Departamento = document.getElementById('Departamento');
var Ejercicio = document.getElementById('Ejercicio');
var selSubtipoAf = document.getElementById('selSubtipoAf');
var selMarca = document.getElementById('selMarca');
var selModelo = document.getElementById('selModelo');
var selSO = document.getElementById('selSO');
var selDisco1 = document.getElementById('selDisco1');
var selDisco2 = document.getElementById('selDisco2');
var selDescripcion = document.getElementById('selDescripcion');
var selMemoria = document.getElementById('selMemoria');
var selNumserie = document.getElementById('selNumserie');
var conMostrar = document.getElementById('conMostrar');
var contPuesto = document.getElementById('contPuesto');
var contHabitacion = document.getElementById('contHabitacion');
var selPadre = document.getElementById('selPadre');
var selhab = document.getElementById('selhab');
var usuarioElegido = document.getElementById('usuarioElegido');
var selDescripcionPadre = document.getElementById('selDescripcionPadre');

function rellenar(dato) {
    $("html, body").animate({
        scrollTop: 790
    }, 500);

    Activofijo.innerHTML = '';
    Sociedad.innerHTML = '';
    Departamento.innerHTML = '';
    Ejercicio.innerHTML = '';
    TipoAF.innerHTML = '';
    selDescripcion.value = '';
    selMemoria.value = '';
    selNumserie.value = '';
    selPadre.innerHTML = 'Click!';
    selhab.innerHTML = 'Click!';
    selDescripcionPadre.value = '';
    usuarioElegido.value = '';
    //contPuesto.innerHTML = '';
    //contHabitacion.innerHTML = '';

    $("#selSubtipoAf").empty()
    $("#selMarca").empty()
    $("#selModelo").empty()
    $("#selSO").empty()
    $("#selDisco1").empty()
    $("#selDisco2").empty()

    Activofijo.innerHTML = dato.ACTIVOFIJO;
    Sociedad.innerHTML = dato.NOMBRESOCIEDAD;
    Departamento.innerHTML = dato.NOMBREDEPARTAMENTO;
    Ejercicio.innerHTML = dato.EJERCICIO;
    TipoAF.innerHTML = dato.NOMBRETIPOAF;
    selDescripcionPadre.value = dato.DESCRIPCIONS;
    if (dato.LETRAEAN == 'L') {

selDescripcionPadre.value = dato.DESCRIPCIONS;
document.getElementById('divUsuario').style = 'display:block;'
        conMostrar.style = 'display:none';
contHabitacion.style = 'display:none';
if(dato.PADRE == ''  || dato.PADRE == null){
selhab.innerHTML = 'Click!';
}else{
selhab.innerHTML = dato.PADRE;
}
        
contPuesto.style = 'display:block';
        document.getElementById('infoPadre').style = 'display:block;'
buscarPadre(dato);
    }
    if (dato.LETRAEAN == 'H') {
contHabitacion.style = 'display:block';
document.getElementById('divUsuario').style = 'display:none;'
selDescripcionPadre.value = dato.DESCRIPCIONS;
        conMostrar.style = 'display:none';
contPuesto.style = 'display:none';
        document.getElementById('infoPadre').style = 'display:block;'
        buscarHab(dato)
    }
    if (dato.LETRAEAN != 'L' && dato.LETRAEAN != 'H') {
        conMostrar.style = 'display:block;'
        selDescripcion.value = dato.DESCRIPCIONS;
        selMemoria.value = dato.MEMORIA;
        selNumserie.value = dato.NUMSERIE;
        if (dato.PADRE == dato.ACTIVOFIJO || dato.PADRE == "" || !dato.PADRE) {
            selPadre.innerHTML = 'Asignarle puesto';
        } else {

            selPadre.innerHTML = dato.PADRE;
        }
        document.getElementById('infoPadre').style = 'display:none;'

        for (let i = 0; i < Arsubtipo.length; i++) {
            if (parseInt(Arsubtipo[i].TIPOAF) == parseInt(dato.TIPOAF)) {
                if (Arsubtipo[i].SUBTIPOAF == dato.SUBTIPOAF) {
                    var option = document.createElement("option");
                    option.text = Arsubtipo[i].NOMBRE;
                    option.setAttribute('value', Arsubtipo[i].SUBTIPOAF)
                    option.selected = true;
                    selSubtipoAf.add(option);
                } else {
                    var option = document.createElement("option");
                    option.text = Arsubtipo[i].NOMBRE;
                    option.setAttribute('value', Arsubtipo[i].SUBTIPOAF)
                    selSubtipoAf.add(option);
                }
            }
        }

        for (let i = 0; i < ArMarca.length; i++) {
            if (ArMarca[i].MARCA == dato.MARCA && dato.MARCA != null) {
                var option = document.createElement("option");
                option.text = ArMarca[i].MARCA;
                option.setAttribute('value', ArMarca[i].MARCA)
                option.selected = true;
                selMarca.add(option);
            } else {
                var option = document.createElement("option");
                option.text = ArMarca[i].MARCA;
                option.setAttribute('value', ArMarca[i].MARCA)
                selMarca.add(option);
            }
        }




        selMarca.addEventListener('change', function () {
            selModelo.innerHTML = '';
            for (let i = 0; i < ArModelo.length; i++) {

                if (ArModelo[i].MARCA == selMarca.value) {
                    var option = document.createElement("option");
                    option.text = ArModelo[i].MODELO;
                    option.setAttribute('value', ArModelo[i].MODELO)
                    selModelo.add(option);
                }

            }
        });

        for (let i = 0; i < ArSO.length; i++) {
            if (ArSO[i].SISTEMAOPERATIVO == dato.SISTEMAOPERATIVO && dato.SISTEMAOPERATIVO != null) {
                var option = document.createElement("option");
                option.text = ArSO[i].SISTEMAOPERATIVO;
                option.setAttribute('value', ArSO[i].SISTEMAOPERATIVO)
                option.selected = true;
                selSO.add(option);
            } else {
                var option = document.createElement("option");
                option.text = ArSO[i].SISTEMAOPERATIVO;
                option.setAttribute('value', ArSO[i].SISTEMAOPERATIVO)
                selSO.add(option);
            }
        }

        for (let i = 0; i < ArDisco.length; i++) {
            if (ArDisco[i].TIPO + ' ' + ArDisco[i].CAPACIDAD == dato.DISCO1 && dato.DISCO1 != null) {
                var option = document.createElement("option");
                option.text = ArDisco[i].TIPO + ' ' + ArDisco[i].CAPACIDAD;
                option.setAttribute('value', ArDisco[i].TIPO + ' ' + ArDisco[i].CAPACIDAD)
                option.selected = true;
                selDisco1.add(option);
            } else {
                var option = document.createElement("option");
                option.text = ArDisco[i].TIPO + ' ' + ArDisco[i].CAPACIDAD;
                option.setAttribute('value', ArDisco[i].TIPO + ' ' + ArDisco[i].CAPACIDAD)
                selDisco1.add(option);
            }


        }

        for (let i = 0; i < ArDisco.length; i++) {
            if (ArDisco[i].TIPO + ' ' + ArDisco[i].CAPACIDAD == dato.DISCO2 && dato.DISCO2 != null) {
                var option = document.createElement("option");
                option.text = ArDisco[i].TIPO + ' ' + ArDisco[i].CAPACIDAD;
                option.setAttribute('value', ArDisco[i].TIPO + ' ' + ArDisco[i].CAPACIDAD)
                option.selected = true;
                selDisco2.add(option);
            } else {
                var option = document.createElement("option");
                option.text = ArDisco[i].TIPO + ' ' + ArDisco[i].CAPACIDAD;
                option.setAttribute('value', ArDisco[i].TIPO + ' ' + ArDisco[i].CAPACIDAD)
                selDisco2.add(option);
            }
        }

        for (let i = 0; i < ArModelo.length; i++) {
            if (ArModelo[i].MARCA == selMarca.value) {
                var option = document.createElement("option");
                option.text = ArModelo[i].MODELO;
                option.setAttribute('value', ArModelo[i].MODELO)
                option.selected = true;
                selModelo.add(option);
            }
        }


        if (dato.SISTEMAOPERATIVO == null || dato.SISTEMAOPERATIVO == '') {
            var option = document.createElement("option");
            option.text = '--SO--'
            option.setAttribute('value', '')
            option.selected = true;
            selSO.add(option);
        }
        if (dato.DISCO1 == null || dato.DISCO1 == '') {
            var option = document.createElement("option");
            option.text = '--DISCO1--'
            option.setAttribute('value', '')
            option.selected = true;
            selDisco1.add(option);
        }
        if (dato.DISCO2 == null  || dato.DISCO2 == '') {
            var option = document.createElement("option");
            option.text = '--DISCO2--'
            option.setAttribute('value', '')
            option.selected = true;
            selDisco2.add(option);
        }
        if (dato.MARCA == null || dato.MARCA == '') {
            var option = document.createElement("option");
            option.text = '--Marca--'
            option.setAttribute('value', '')
            option.selected = true;
            selMarca.add(option);
        }
        if (dato.MARCA == null || dato.MARCA == '') {
            var option = document.createElement("option");
            option.text = '--Modelo--'
            option.setAttribute('value', '')
            option.selected = true;
            selModelo.add(option);
        }
    }


}

function guardar() {

    var infoParaEnviar = {
        Activofijo: m,
        selSubtipoAf: selSubtipoAf.value,
        selMarca: selMarca.value,
        selModelo: selModelo.value,
        selSO: selSO.value,
        selDisco1: selDisco1.value,
        selDisco2: selDisco2.value,
        selDescripcion: selDescripcion.value,
        selMemoria: selMemoria.value,
        selNumserie: selNumserie.value,
        selPadre: selPadre.textContent
    }
    $.ajax({
        type: "POST",
        url: "php/update.php",
        data: infoParaEnviar,
        dataType: "text",
        asycn: true,
        success: function (result) {

            swal({
                title: "GUARDADO CORRECTAMENTE ",
                text: 'Los datos se han actualizado',
                icon: "success",
                button: "Cerrar",
            }).then(function (value) {
                datosAR()
            });

}
});
}


var infoPadre = [];
btn_guardar = document.getElementById('btn_guardar')

function buscarPadre(padre) {
infoPadre = [];
    document.getElementById('divUsuario').style = 'display:block';
    document.getElementById('dvDescripcionPadre').style = 'display:block';
    document.getElementById('dvhab').style = 'display:block';
if(padre.PADRE == '' || padre.PADRE == null){
selhab.innerHTML = 'Click!';
}else{
selhab.innerHTML = padre.PADRE;
}
    
    selDescripcionPadre.value = padre.DESCRIPCIONS;
    usuarioElegido.value = padre.USUARIO;
    var infoParaEnviar = {
        padre: padre.ACTIVOFIJO
    }
    $.ajax({
        type: "POST",
        url: "php/infopadre.php",
        data: infoParaEnviar,
        dataType: "text",
        asycn: true,
        success: function (result) {
            var dato = JSON.parse(result);
            for (let i = 0; i < dato.length; i++) {
                infoPadre.push(dato[i]);
            }
            btn_guardar.setAttribute('onclick', 'guardarPadre()')
            rellenarPadre();
        }
    });
}

function rellenarPadre() {
    contPuesto.style = 'display:block';

    for (let i = 0; i < infoPadre.length; i++) {

        var ico = document.createElement('i');
        ico.setAttribute('class', 'fas fa-chevron-circle-down');
        var b = document.createElement('b');
        b.setAttribute('onclick', 'mostrarInfo(info' + i + ')')
        b.appendChild(ico);
        b.innerHTML += ' ' + infoPadre[i].DESCRIPCION + '</br>';
        var p = document.createElement('p');
        p.setAttribute('id', 'info' + i);
        p.style = 'display:none;'
        p.innerHTML = 'Marca ' + infoPadre[i].MARCA + '</br>' +
            'Modelo ' + infoPadre[i].MODELO + '</br>' +
            'Numserie ' + infoPadre[i].MODELO + '</br>';

        contPuesto.appendChild(b);
        contPuesto.appendChild(p);


    }
infoPadre = [];

}

function mostrarInfo(e) {
    var mostrar = document.getElementById(e.id);

    if (mostrar.getAttribute('style') == 'display: block;') {
        mostrar.style = 'display: none;'
    } else {
        mostrar.style = 'display: block;'
    }

}

var infoHab = []

function buscarHab(padre) {
document.getElementById('divUsuario').style = 'display:none';
    document.getElementById('dvhab').style = 'display:none';

infoHab = []
    selhab.innerHTML = 'Click me!';
    
    usuarioElegido.value = '';
    var infoParaEnviar = {
        padre: padre.ACTIVOFIJO
    }
    $.ajax({
        type: "POST",
        url: "php/infopadre.php",
        data: infoParaEnviar,
        dataType: "text",
        asycn: true,
        success: function (result) {
            var dato = JSON.parse(result);
            for (let i = 0; i < dato.length; i++) {
                infoHab.push(dato[i]);
            }
            selecinfo();
        }
    });
}
var n = 0;
var material = []

function selecinfo() {
material = []
    if (infoHab.length == 0) {
        var infoParaEnviar = {
            padre: ''
        }
    } else {
        var infoParaEnviar = {
            padre: infoHab[n].ACTIVOFIJO
        }
    }
    $.ajax({
        type: "POST",
        url: "php/infopadre.php",
        data: infoParaEnviar,
        dataType: "text",
        asycn: true,
        success: function (result) {
            var dato = JSON.parse(result);
            n++;
            for (let i = 0; i < dato.length; i++) {
                material.push(dato[i]);
            }
            if (n < infoHab.length) {
                selecinfo();
            } else {
                btn_guardar.setAttribute('onclick', 'guardarPadreHab()');
                rellenarhab();
            }

        }
    });
}

function rellenarhab() {

    contHabitacion.style = 'display:block';
    document.getElementById('dvDescripcionPadre').style = 'display:block';
    for (let i = 0; i < infoHab.length; i++) {
        var ico = document.createElement('i');
        ico.setAttribute('class', 'fas fa-chevron-circle-down');
        var b = document.createElement('b');
        b.setAttribute('onclick', 'mostrarInfo(info' + i + ')')
        b.appendChild(ico);
        b.innerHTML += ' ' + infoHab[i].DESCRIPCION + '</br>';

        var dv = document.createElement('div');
        dv.setAttribute('id', 'info' + i);
        dv.style = 'display:none;'
        for (let j = 0; j < material.length; j++) {
            if (infoHab[i].ACTIVOFIJO == material[j].PADRE) {
                var p = document.createElement('p');
                p.innerHTML = material[j].DESCRIPCION + '</br>';
                dv.appendChild(p)
            }
        }
        b.appendChild(dv);
        contHabitacion.appendChild(b);


    }
}
var usuarioElegido = document.getElementById('usuarioElegido');
var selDescripcionPadre = document.getElementById('selDescripcionPadre');

function guardarPadre() {
if(selhab.textContent == "Click!"){
selhab.textContent = '';
}
    var infoParaEnviar = {
        Activofijo: m,
        usuarioElegido: usuarioElegido.value,
        selDescripcionPadre: selDescripcionPadre.value,
        selhab: selhab.textContent
    }
    $.ajax({
        type: "POST",
        url: "php/updatehab.php",
        data: infoParaEnviar,
        dataType: "text",
        asycn: true,
        success: function (result) {
            swal({
                title: "GUARDADO CORRECTAMENTE ",
                text: 'Los datos se han actualizado',
                icon: "success",
                button: "Cerrar",
            }).then(function (value) {
                activofijos(m);
            });
        }
    });

}

function guardarPadreHab() {
    var infoParaEnviar = {
        Activofijo: m,
        selDescripcionPadre: selDescripcionPadre.value
    }
    $.ajax({
        type: "POST",
        url: "php/upHab.php",
        data: infoParaEnviar,
        dataType: "text",
        asycn: true,
        success: function (result) {
            swal({
                title: "GUARDADO CORRECTAMENTE ",
                text: 'Los datos se han actualizado',
                icon: "success",
                button: "Cerrar",
            }).then(function (value) {
activofijos(m);
                //location.reload();
            });
        }
    });
}

var rellenarTT = false;
document.getElementById("selPadre").addEventListener("click", function () {
    on.style = 'display:block;'
    rellenarTT = true;
    $("html, body").animate({
        scrollTop: 0
    }, 500);

}, false);
document.getElementById("selhab").addEventListener("click", function () {
    on.style = 'display:block;'
    rellenarTT = true;
    $("html, body").animate({
        scrollTop: 0
    }, 500);

}, false);

document.getElementById("btn").addEventListener("click", () => {
    document.getElementById("scanner-container").style.display = "block";
    startScanner();
});