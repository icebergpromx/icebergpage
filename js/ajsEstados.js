var app = angular.module("cv19-app", []);


let estadosNombres = [
    { "id_estado": "1", "nombre": "Morelos" },
    { "id_estado": "2", "nombre": "México" },
    { "id_estado": "3", "nombre": "Puebla" },
    { "id_estado": "4", "nombre": "Aguascalientes" },
    { "id_estado": "5", "nombre": "Baja California" },
    { "id_estado": "6", "nombre": "Campeche" },
    { "id_estado": "7", "nombre": "Chiapas" },
    { "id_estado": "8", "nombre": "Chihuahua" },
    { "id_estado": "9", "nombre": "Coahuila" },
    { "id_estado": "10", "nombre": "Colima" },
    { "id_estado": "11", "nombre": "Durango" },
    { "id_estado": "12", "nombre": "Guanajuato" },
    { "id_estado": "13", "nombre": "Guerrero" },
    { "id_estado": "14", "nombre": "Hidalgo" },
    { "id_estado": "15", "nombre": "Jalisco" },
    { "id_estado": "16", "nombre": "Michoacán" },
    { "id_estado": "17", "nombre": "Nayarit" },
    { "id_estado": "18", "nombre": "Nuevo León" },
    { "id_estado": "19", "nombre": "Oaxaca" },
    { "id_estado": "20", "nombre": "Querétaro" },
    { "id_estado": "21", "nombre": "Quintana Roo" },
    { "id_estado": "22", "nombre": "San Luis Potosí" },
    { "id_estado": "23", "nombre": "Sinaloa" },
    { "id_estado": "24", "nombre": "Sonora" },
    { "id_estado": "25", "nombre": "Tabasco" },
    { "id_estado": "26", "nombre": "Tamaulipas" },
    { "id_estado": "27", "nombre": "Tlaxcala" },
    { "id_estado": "28", "nombre": "Veracruz" },
    { "id_estado": "29", "nombre": "Yucatán" },
    { "id_estado": "30", "nombre": "Zacatecas" },
    { "id_estado": "31", "nombre": "Baja California Sur" },
    { "id_estado": "32", "nombre": "CDMX" }
]


let consejos = [
    {
        consejo: "Evita el contacto físico al saludar",
        imagen: "./../resources/dont-touch.png"
    },
    {
        consejo: "Lávate las manos, al menos durante 20 segundos",
        imagen: "./../resources/clean.png"
    },
    {
        consejo: "Evita ir a lugares concurridos",
        imagen: "./../resources/meeting-point.png"
    },
    {
        consejo: "No hagas compras de pánico, por favor, piensa en las  demás familias",
        imagen: "./../resources/cart.png"
    },
    {
        consejo: "Si llegas a casa, báñate antes de ir a saludar a tus abuelos, o a los niños en casa",
        imagen: "./../resources/bath.png"
    },
    {
        consejo: "Toma un baño al regresar a casa",
        imagen: "./../resources/bath.png"
    },
    {
        consejo: "No gastes de más",
        imagen: "./../resources/pay.png"
    },

    {
        consejo: "No te automediques, ve al médico, no tengas miedo",
        imagen: "./../resources/healthcare-and-medical.png"
    },
    {
        consejo: "No fumes, porque este virus,  quema tus pulmones, no los desgastes más",
        imagen: "./../resources/smoke.png"
    }
]




app.controller("estadosController", function ($scope, $http) {

    $scope.getEstados = function () {

      /*
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();

        today = dd + '/' + mm + '/' + yyyy;
*/
               var currentdate = new Date(); 
                var datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " | "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() +" HRS";


        $scope.fechaActualizacion = datetime;

        $http({
            method: 'GET',
            url: "https://www.icebergpro.mx/estados",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            },
        }).then(function (response) {
            console.log("respuesta")
            console.log(response.data)
            



            let estados = response.data;

            let listaEstados = []


            console.log(estados.length +" dimension")
            
            for (let i = 0; i <= estados.length-1; i++) {

                let estado = {
                    estado: null,
                    confirmados: null,
                    negativos: null,
                    sospechosos: null,
                    defunciones: null
                }                

                var id = estados[i].id_estado
                let idAux = (id-1);
                console.log(id);
                console.log(estadosNombres[idAux].nombre)


                estado.estado = estadosNombres[idAux].nombre;
                estado.confirmados = estados[i].confirmed;
                estado.negativos = estados[i].negative;
                estado.sospechosos = estados[i].suspeats;
                estado.defunciones = estados[i].deaths;

            
                listaEstados.push(estado);
      

            }

            console.log("data el lista")
            console.log(listaEstados);



            $scope.estados = listaEstados;



        })
        $scope.darConsejo = function () {



            let numero = Math.floor(Math.random() * consejos.length - 1);
            Swal.fire({
    
                title: consejos[numero].consejo,
                html: '<i style="font-weight:700;color:#5BC0D6;font-size:15">Por tu salud y la de tus amados</i>',
                imageUrl: '' + consejos[numero].imagen,
                imageWidth: 100,
                imageHeight: 100,
                padding: '3em',
                imageAlt: 'Custom image',
                showConfirmButton: false,// There won't be any confirm button
                timer: 7000,
                backdrop: `
                                      rgba(75, 137, 152,0.6)
                                      left top
                                      no-repeat
                                    `
            })
    
    
        }


    }
})