<?php
    // Devuevlve el nombre del DOMINIO
        echo "<br>";
       		echo  $_SERVER['SERVER_NAME'];
        echo "<br>";
    // Devuevlve el nombre del HOST
        echo "<br>";
        	echo gethostname();
        echo "<br>";
        echo "<br>";
    //Devuelve un array indexado de todos los nombres de los modulos.
    	echo "Extensiones Activas <br>";
    		print_r(get_loaded_extensions());
    	echo "<br><br>";
    // Devuelve si esta activada o desactivada allow url fopen
    	if( ini_get('allow_url_fopen') ) {
    		echo 'La directiva allow_url_fopen esta Activada';
    	} 
        echo "<br><br>";
    //Informacion de la version de PHP Actual
	    phpinfo();
?>