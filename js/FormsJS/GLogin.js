
//=======INICIO DE DOCUMENT READY==============

 //EVENTO CUANDO CARGA TODO EL DOCUMENTO
    window.global = 'http://localhost:5414/api/v1';
    $(document).ready(function() {

    //Al iniciar la ventana, se obtiene el token de parametro
    
LimpiarCampos();
//CargarComboEstado();
//CargarComboMunicipio(1,1);
//CargarComboParroquia(1,1);
//Validar documento, configurar
$("#form").validate({

  rules: {
    user: {
      required: true,
      minlength: 4,
       maxlength: 40,
      // lettersonly: true
        //,number: true
    },
    password: {
      required: true,
      minlength: 4,
       maxlength: 20,
      
    //   ,number: true
    }


  }
 
})

});


//Eventos en botones de el formulario
/*$('#btnLogin').on("click",function(e) {
  // Cuando hago clic guardar, si el form es valido
  if ($("#form").valid()) {
    e.preventDefault();
    Login();
  }

}); */

/*$('#Login').on("click",function(e) {
  // Cuando hago clic guardar, si el form es valido
  if ($("#form").valid()) {
    e.preventDefault();
    Login();*/



    }


   

    //=========== FIN DEL DOCUMENT READY================


    //Guardar elementos en DataBase
     function Login() {        
      //Capturar datos del formulario
        var UserName = document.getElementById("txtUser").value;
      var PassWordUser= document.getElementById("txtPassword").value;
alert(hola);
if (UserName ='123456' and PassWordUser='123456')
     {
      
       location.href = 'Bienvenida.html';
     }
      //alert('Voy a Logearme');
      //var IdnRol =  "";
      //var Rol = {Idn:IdnRol};
      //Agregamos los datos capturados a un arreglo => arr
     /* var arr = {UserName:UserName,PassWordUser:PassWordUser};
      //var arr = {usuario};
      //Evento ajax para enviar los datos
      jQuery.support.cors = true;
      $.ajax({
        //Ruta para enviar el servicio
        url: 'http://localhost:53441/api/ApiAutorizador/Authorization',
        type: 'POST',
        //Enviamos el arreglo ar
        data: JSON.stringify(usuario),
        contentType: 'application/json; charset=utf-8',
            async: false,
        
          //Si todo funciona bien entra al sucess
          statusCode: {
           404: function (response) {
            bootbox.alert("Credenciales Invalidas", function() {
            LimpiarCampos();
            });

          },
          500: function (response) {
           bootbox.alert("Ocurrio un Error Interno", function() {
           });

         } 
       },
       success: function(data) {
        bootbox.alert("Bienvenido", function() {
          var token = data.Token;
          alert(token);
        location.href = 'Bienvenida.html?token='+token+'';

        });
             // e.preventDefault();
            //Actualiza la datatable automáticamente
            //var table = $('#TablaFuncion').dataTable();
                        // Example call to reload from original file
                       // table.fnReloadAjax();
                        //LimpiarCampos();
                      }


                    });*/
    }
    

function LimpiarCampos(){
      var UserName = document.getElementById("txtUser").value="";
      var Password = document.getElementById("txtPassword").value="";
}

//==== CONFIGURACION DE COMBOS DE UBICACIÓN=========



  function ConfirmGuardar() {     
     bootbox.dialog({
  message: "¿Está seguro de registrar este usuario?",
  title: "Confirmar Registro",
  buttons: {
     danger: {
      label: "No",
      className: "btn-danger",
      callback: function() {
                
      }
    },
    success: {
      label: "Si",
      className: "btn-success",
      callback: function() {
        
        bootbox.hideAll();
        GuardarUsuario();
      }
          }
      
    }
  
});
     
    }