<?php
header('Content-Type: application/JSON');
$metodo = $_SERVER['REQUEST_METHOD'];
switch($metodo){
    case 'GET':
    if($_GET['accion']=='contacto'){
        try{
            $DBH = new PDO ("mysql:host=localhost;dbname=achikual_contacs","achikual_wp","pupi123.root");
        }catch(PDOException $e){
            echo $e->getMessage();
        }
        if(isset($_GET['id'])){
            $resultado=$DBH->prepare ('SELECT * FROM people WHERE id = :p');
            $resultado->bindParam(':p',$_GET['id']);
            $resultado->execute();
            $response = $resultado->fetchALL(PDO::FETCH_ASSOC);
            echo json_encode ($response, JSON_PRETTY_PRINT);
        }else{
            $resultado = $DBH->prepare ('SELECT * FROM people');
            $resultado->execute();
            $response = $resultado->fetchALL(PDO::FETCH_ASSOC);
            echo json_encode($response, JSON_PRETTY_PRINT);
        }
    }

    break;


    case 'POST':
    $data = json_decode(file_get_contents("php://input")); //JSON
    $name = isset($data->name)?$data->name:null;
    $age = isset($data->age)?$data->age:0;
    $height = isset($data->height)?$data->height:0.0;
    $status = isset($data->status)?$data->status:0;

    //if(!is_null($name) && $age!=0 && height !=0.0){
	    if($age >=10 && $age<=120){
	        try{
                        $DBH = new PDO ("mysql:host=localhost;dbname=achikual_contacs","achikual_wp","pupi123.root");
                    }catch(PDOException $e){
                        echo $e->getMessage();
                    }
                            $resultado=$DBH->prepare ('INSERT INTO people VALUES (NULL, :name, :age, :height, :status)');
                            $resultado->bindParam(':name',$name);
                            $resultado->bindParam(':age',$age);
                            $resultado->bindParam(':height',$height);
                            $resultado->bindParam(':status',$status);
                                $ok = $resultado->execute();
                           if($ok){
                                $response = array("status" => 200, "message"=>"Contacto creado");
                                echo json_encode($response, JSON_PRETTY_PRINT);
                           }
	    }else{
	        $response = array("status"=>200, "message"=>"Error, edad incorrecta");
	        echo json_encode($response, JSON_PRETTY_PRINT);
	        break;
	    }
	    break;
	    
   /* }else{
        $response = array("status"=>400,"message"=>"ERROR: DATOS INCORRECTOS");
        echo json_encode ($response, JSON_PRETTY_PRINT);
        break;
    }
    */
	   
   




    case 'PUT':
    
    echo ('PUT');


    $data = json_decode(file_get_contents("php://input")); //JSON
    $name = $data->name;
    $age = $data->age;
    $height = $data->height;
    $status = $data->status;
    $id = $data->id;

    try{
        $DBH = new PDO ("mysql:host=localhost;dbname=achikual_contacs","achikual_wp","pupi123.root");
    }catch(PDOException $e){
        echo $e->getMessage();
    }
    $resultado=$DBH->prepare ('UPDATE people SET name=:name, age = :age, height = :height, status = :status WHERE id = :id');
    $resultado->bindParam(':name',$name);
    $resultado->bindParam(':age',$age);
    $resultado->bindParam(':height',$height);
    $resultado->bindParam(':status',$status);
    $resultado->bindParam(':id',$id);
    if($resultado->execute()){
        $response = array("status"=>200, "message"=>"USUARIO ACTUALIZADO");
    echo json_encode($response, JSON_PRETTY_PRINT);
    } else {
        $response = array("status"=>400, "message"=>"USUARIO NO ACTUALIZADO");
    echo json_encode($response, JSON_PRETTY_PRINT);
    }



    break;
    case 'DELETE':

    if($_GET['accion']=='contacto'){
        try{
            $DBH = new PDO ("mysql:host=localhost;dbname=achikual_contacs","achikual_wp","pupi123.root");
        }catch(PDOException $e){
            echo $e->getMessage();
        }
        if(isset($_GET['id'])){
            $resultado=$DBH->prepare ('DELETE FROM people WHERE id = :p');
            $resultado->bindParam(':p',$_GET['id']);
            if($resultado->execute()){
                $response = array("status"=>200, "message"=>"USUARIO ELIMINADO");
            echo json_encode($response, JSON_PRETTY_PRINT);
            } else {
                $response = array("status"=>400, "message"=>"USUARIO NO ELIMINADO");
            echo json_encode($response, JSON_PRETTY_PRINT);
            }
            
        }
    }

    break;
    default :
    echo'Método no soportado';
    break;
}
?>
