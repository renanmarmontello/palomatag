<?php
$serverName = "172.26.7.192";
$connectionOptions = array(
    "Database" => "A3LABORAL",
    "UID" => "consulta",
    "PWD" => "Monte00!"
);
$arr = array();
$conn = sqlsrv_connect($serverName, $connectionOptions);
if($conn){
    $tsql = "select * from [master].[dbo].[ZMontesano_Vista_Agenda]";

    $getResults = sqlsrv_query($conn,$tsql);
    if($getResults == False){
        die(FormatErrors(sqlsrv_errors()));
    }else{
        while ($row = sqlsrv_fetch_array($getResults, SQLSRV_FETCH_ASSOC)) {

array_push($arr,$row);

        }
        sqlsrv_free_stmt($getResults);
    }
    echo json_encode($arr, JSON_UNESCAPED_UNICODE);
}
?>
