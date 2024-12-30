<?php

$data = $_GET['datos'];

$serverName = "172.26.11.13,49188";
$connectionOptions = array(
    "Database" => "InventarioAF",
    "UID" => "sa",
    "PWD" => "Monte01!"
);
$arr = array();
$conn = sqlsrv_connect($serverName, $connectionOptions);
if ($conn) {

    $tsql = "SELECT * ,
    [ACTIVOFIJO].[DESCRIPCION]  as DESCRIPCIONS,
    [SOCIEDADES].[NOMBRE] as NOMBRESOCIEDAD, 
    [DEPARTAMENTO].[NOMBRE] as NOMBREDEPARTAMENTO,
    [TIPOACTIVOFIJO].[NOMBRE] as NOMBRETIPOAF
    FROM [dbo].[ACTIVOFIJO] 
    INNER JOIN [SOCIEDADES] ON [ACTIVOFIJO].[SOCIEDAD] = [SOCIEDADES].[VALOR]
    INNER JOIN [DEPARTAMENTO] ON [ACTIVOFIJO].[DEPARTAMENTO] = [DEPARTAMENTO].[LETRA]
    INNER JOIN [TIPOACTIVOFIJO] ON [ACTIVOFIJO].[TIPOAF] = [TIPOACTIVOFIJO].[TIPOAF]
    WHERE [CODEBAR] = '" . $data ."'";

    $getResults = sqlsrv_query($conn, $tsql);

    if ($getResults == false) {

        die(FormatErrors(sqlsrv_errors()));

    } else {
        while ($row = sqlsrv_fetch_array($getResults, SQLSRV_FETCH_ASSOC)) {

            array_push($arr, $row);

        }
        sqlsrv_free_stmt($getResults);

    }
    echo json_encode($arr, JSON_UNESCAPED_UNICODE);

    if (empty($arr)) {
        $tsql = "SELECT [ACTIVOFIJO] as ID,
        [CODEBAR],
        [SOCIEDAD] as VALORSOCIEDAD, 
        [DEPARTAMENTO] as VALORDEPARTAMENTO,
        [EJERCICIO] as ANIO,
        [TIPOAF] as TIPO,
        [SOCIEDADES].[NOMBRE] as NOMBRESOCIEDAD, 
        [DEPARTAMENTO].[NOMBRE] as NOMBREDEPARTAMENTO
        FROM [ACTIVOFIJOSINASIGNAR]
        INNER JOIN [SOCIEDADES] ON [ACTIVOFIJOSINASIGNAR].[SOCIEDAD] = [SOCIEDADES].[VALOR]
        INNER JOIN [DEPARTAMENTO] ON [ACTIVOFIJOSINASIGNAR].[DEPARTAMENTO] = [DEPARTAMENTO].[LETRA]
        WHERE [CODEBAR] = '" . $data ."'";
        $getResults = sqlsrv_query($conn, $tsql);

        if ($getResults == false) {

            die(FormatErrors(sqlsrv_errors()));
        } else {
while ($row = sqlsrv_fetch_array($getResults, SQLSRV_FETCH_ASSOC)) {

            array_push($arr, $row);

        }
        sqlsrv_free_stmt($getResults);
            $tsql = "INSERT INTO ACTIVOFIJO ([ACTIVOFIJO], [SOCIEDAD], [DEPARTAMENTO], [EJERCICIO], [TIPOAF], [CODEBAR] )
            VALUES ('" . $arr[0]['ID'] . "','" . $arr[0]['VALORSOCIEDAD'] . "','" . $arr[0]['VALORDEPARTAMENTO'] . "','" . $arr[0]['ANIO'] . "','" . $arr[0]['TIPO'] . "','" . $arr[0]['CODEBAR'] . "')";
            $getResults = sqlsrv_query($conn, $tsql);

            if ($getResults == false) {
                die(FormatErrors(sqlsrv_errors()));
            } else {
               
            }
        }

        echo json_encode($arr, JSON_UNESCAPED_UNICODE);
    }
}
?>
