<?php
    $requestData = array();
    $datafilepath = 'http://mahkor.000webhostapp.com/veetaseEllu.txt';
    array_push($requestData, json_decode(file_get_contents($datafilepath))); 
    echo json_encode($requestData);

?>