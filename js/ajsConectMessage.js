var mApp = angular.module("contact-app", [])


mApp.controller("controllerMessage", function ($scope, $http) {


    $scope.putEmploy = function (cliente) {
        console.log("CLICK")

        var clienteX = cliente
        $http({
            method: 'POST',
            url: "https://www.achikuali.com/servicios/contacto",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            data: {
                "name": clienteX.nombre,
                "age": "19",
                "height": "1.8",
                "status": 1
            }
        })
            .then(async function (response) {
                await Swal.fire({
                    title: clienteX.nombre + ' excelente!',
                    text: ' te contactaremos a la brevedad',
                    width: 600,
                    icon: 'success',
                    padding: '3em',
                    background: "#fff",
                    showConfirmButton: false,// There won't be any confirm button
                    timer: 3000,
                    backdrop: `
                                          rgba(75, 137, 152,0.6)
                                          left top
                                          no-repeat
                                        `
                })
                //redirige al inicio
                    
                location.href = "/"
            })
    }


    $http({
        method: 'GET',
        url: "https://www.achikuali.com/servicios/contacto"
    })
        .then(function (response) {
            let employes = response.data;
            console.log(employes)
        })
})

/*


    [

        '$scope', function ($scope,$http) {

            $scope.enviarMensaje = function () {

                var params = {
                    "name": "juanCho",
                    "age": "3",
                    "height": "1.7",
                    "status": "0"
                }

                var req = {
                    method: 'POST',
                    url: "https://www.achikuali.com/servicios/contacto",
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    data: {
                        "name": "juanCho",
                        "age": "3",
                        "height": "1.7",
                        "status": "0"
                    }
                }


                    $http({
                        method:'GET',
                        url: "https://www.achikuali.com/servicios/contacto",

                    }).then(function(response){
                        console.log(JSON.parse(response))
                    })


            }
        }

*/