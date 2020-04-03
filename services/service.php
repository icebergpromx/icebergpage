<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
    header("Allow: GET, POST, OPTIONS, PUT, DELETE");
    $method = $_SERVER['REQUEST_METHOD'];
    if($method == "OPTIONS") {
        die();
    }
    

    $metodo = $_SERVER['REQUEST_METHOD'];
    switch($metodo){
        case 'GET':
            if($_GET['accion']=='dataCovid'){
                try {
                    $DBH = new PDO("mysql:host=localhost;dbname=achikual_covid_19","achikual_wp","pupi123.root");

                } catch (PDOException $e) {
                    echo $e ->getMessage();
                }

                if(isset($_GET['id'])){
                    $resultado = $DBH->prepare("SELECT * FROM historico_general WHERE id = :p");
                    $resultado->bindParam(':p',$_GET['id']);
                    $resultado->execute();
                    $response = $resultado->fetchALL(PDO::FETCH_ASSOC);
                    echo json_encode ($response,JSON_PRETTY_PRINT);
                }else{
                    $resultado = $DBH->prepare("SELECT * FROM  historico_general");
                    $resultado ->execute();
                    $response =  $resultado->fetchALL(PDO::FETCH_ASSOC);
                    echo json_encode ($response,JSON_PRETTY_PRINT);
                }
            
        break;

       } 
    }
?>