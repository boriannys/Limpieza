
//=======INICIO DE DOCUMENT READY==============

 //EVENTO CUANDO CARGA TODO EL DOCUMENTO
    window.global = 'http://localhost:60211/api/v1';
    $(document).ready(function() {

    //Al iniciar la ventana, se obtiene el token de parametro
    
LimpiarCampos();
//CargarComboEstado();
//CargarComboMunicipio(1,1);
//CargarComboParroquia(1,1);
//Validar documento, configurar
$("#form").validate({

  rules: {
    UserName: {
      required: true,
      minlength: 4,
       maxlength: 40,
      // lettersonly: true
        //,number: true
    },
    Password: {
      required: true,
      minlength: 4,
       maxlength: 20,
      
    //   ,number: true
    }


  }
 
});

});

//Eventos en botones de el formulario
$('#btnLogin').on("click",function(e) {
  // Cuando hago clic guardar, si el form es valido
  if ($("#form").valid()) {
    e.preventDefault();
    Login();
  }

}); 
$('#btnInicio').on("click",function(e) {
  // Cuando hago clic guardar, si el form es valido
  if ($("#form").valid()) {
    e.preventDefault();
    location.href = 'Login.html';
  }

}); 
    //Guardar elementos en DataBase
     function Login() {        
      //Capturar datos del formulario
        var UserName = document.getElementById("txtUserName").value;
      var PassWordUser= document.getElementById("txtPassword").value;
      //alert('Voy a Logearme');
      var IdnRol =  "";
      var Rol = {Idn:IdnRol};
      //Agregamos los datos capturados a un arreglo => arr
      var usuario = {UserName:UserName,PassWordUser:PassWordUser};
      var arr = {usuario};
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
           

          },
          500: function (response) {
           bootbox.alert("Ocurrio un Error Interno", function() {
           });

         } 
       },
       success: function(data) {

        var Autorizado = data.Autorizado;

        if (Autorizado == false)
          {
            bootbox.alert("Credenciales Invalidas", function() { });
            LimpiarCampos();
            return false;
            
          }
         else
          {
          bootbox.alert("Bienvenido", function() {
              var token = data.Token;
              location.href = 'Bienvenida.html?token='+token+'';
           });
          
       
          
          }
       }
        

        });
             // e.preventDefault();
            //Actualiza la datatable automáticamente
            //var table = $('#TablaFuncion').dataTable();
                        // Example call to reload from original file
                       // table.fnReloadAjax();
                        //LimpiarCampos();
                      }


function getAbsolutePath() {
    var loc = window.location;
    var pathName = loc.pathname.substring(0, loc.pathname.lastIndexOf('/') + 1);
    return loc.href.substring(0, loc.href.length - ((loc.pathname + loc.search + loc.hash).length - pathName.length));
}
  
function LimpiarCampos(){
      var UserName = document.getElementById("txtUserName").value="";
      var Password = document.getElementById("txtPassword").value="";
}
