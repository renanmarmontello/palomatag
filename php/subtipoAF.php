<?php
$serverName = "172.26.11.13,49188";
$connectionOptions = array(
    "Database" => "InventarioAF",
    "UID" => "sa",
    "PWD" => "Monte01!"
);
$arr = array();
$conn = sqlsrv_connect($serverName, $connectionOptions);
if ($conn) {
    $tsql = "SELECT * FROM [dbo].[SUBTIPOACTIVOFIJO]";

    $getResults = sqlsrv_query($conn, $tsql);
    if ($getResults == false) {
        die(FormatErrors(sqlsrv_errors()));
    } else {
        while ($row = sqlsrv_fetch_array($getResults, SQLSRV_FETCH_ASSOC)) {

            array_push($arr, $row);

        }
        sqlsrv_free_stmt($getResults);
    }

}
if ($conn) {
    $tsql = "SELECT * FROM [dbo].[MARCA]";

    $getResults = sqlsrv_query($conn, $tsql);
    if ($getResults == false) {
        die(FormatErrors(sqlsrv_errors()));
    } else {
        while ($row = sqlsrv_fetch_array($getResults, SQLSRV_FETCH_ASSOC)) {

            array_push($arr, $row);

        }
        sqlsrv_free_stmt($getResults);
    }

}
if ($conn) {
    $tsql = "SELECT * FROM [dbo].[MODELO]";

    $getResults = sqlsrv_query($conn, $tsql);
    if ($getResults == false) {
        die(FormatErrors(sqlsrv_errors()));
    } else {
        while ($row = sqlsrv_fetch_array($getResults, SQLSRV_FETCH_ASSOC)) {

            array_push($arr, $row);

        }
        sqlsrv_free_stmt($getResults);
    }

}
if ($conn) {
    $tsql = "SELECT * FROM [dbo].[SISTEMAOPERATIVO]";

    $getResults = sqlsrv_query($conn, $tsql);
    if ($getResults == false) {
        die(FormatErrors(sqlsrv_errors()));
    } else {
        while ($row = sqlsrv_fetch_array($getResults, SQLSRV_FETCH_ASSOC)) {

            array_push($arr, $row);

        }
        sqlsrv_free_stmt($getResults);
    }

}
if ($conn) {
    $tsql = "SELECT * FROM [dbo].[DISCO]";

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
}


?>