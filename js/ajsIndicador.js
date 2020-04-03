var app = angular.module("cv19-app", [])

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



app.controller("counterController", function ($scope, $http) {


    $scope.getData = function () {

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
            url: "https://www.icebergpro.mx/services/dataCovid",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            },
        }).then(function (response) {
            let dataCounter = response;
            console.log(dataCounter.data[0])


            $scope.confirmedCases = dataCounter.data[0].confirmed;
            $scope.negativeCases = dataCounter.data[0].negative;
            $scope.deaths = dataCounter.data[0].deaths;
            $scope.recoveredLifes = dataCounter.data[0].recovered;
        })
    }

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
            timer: 5000,
            backdrop: `
                                  rgba(75, 137, 152,0.6)
                                  left top
                                  no-repeat
                                `
        })


    }


})