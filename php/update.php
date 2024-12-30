<?php
$Activofijo = $_POST['Activofijo'];
$selSubtipoAf = $_POST['selSubtipoAf'];
$selMarca = $_POST['selMarca'];
$selModelo = $_POST['selModelo'];
$selSO = $_POST['selSO'];
$selDisco1 = $_POST['selDisco1'];
$selDisco2 = $_POST['selDisco2'];
$selDescripcion = $_POST['selDescripcion'];
$selMemoria = $_POST['selMemoria'];
$selNumserie = $_POST['selNumserie'];
$selPadre = $_POST['selPadre'];

$serverName = "172.26.11.13,49188";
$connectionOptions = array(
    "Database" => "InventarioAF",
    "UID" => "sa",
    "PWD" => "Monte01!"
);
$arr = array();
$conn = sqlsrv_connect($serverName, $connectionOptions);
if($conn){
    $tsql = "UPDATE [dbo].[ACTIVOFIJO]
    SET [SUBTIPOAF] = '$selSubtipoAf',
    [MARCA] = '$selMarca',
    [MODELO] = '$selModelo',
    [SISTEMAOPERATIVO] = '$selSO',
    [DISCO1] ='$selDisco1',
    [DISCO2] ='$selDisco2',
    [DESCRIPCION] ='$selDescripcion',
    [MEMORIA] ='$selMemoria',
    [NUMSERIE] ='$selNumserie',
[PADRE] = '$selPadre'
    WHERE [CODEBAR] = '$Activofijo'";

    $getResults = sqlsrv_query($conn,$tsql);
    if($getResults == False){
    }else{
        while ($row = sqlsrv_fetch_array($getResults, SQLSRV_FETCH_ASSOC)) {

array_push($arr,$row);

        }
        sqlsrv_free_stmt($getResults);
    }
    echo json_encode($arr, JSON_UNESCAPED_UNICODE);
}
?>
