<?php
    header('Content-Type: application/JSON');
    $metodo = $_SERVER['REQUEST_METHOD'];
    switch($metodo){
        case 'GET':
             try {
                    $DBH = new PDO("mysql:host=localhost;dbname=achikual_covid_19","achikual_wp","pupi123.root");

                } catch (PDOException $e) {
                    echo $e ->getMessage();
                }
                    
                    $resultado = $DBH->prepare("SELECT e.id_estado, confirmed,deaths,recovered,negative,suspeats FROM historico_covid hc INNER JOIN estado e ON hc.id_estado = e.id_estado");
                    $resultado->execute();
                    $response = $resultado->fetchALL(PDO::FETCH_ASSOC);
                    echo json_encode($response,JSON_PRETTY_PRINT);
              
        break;
    }
?>