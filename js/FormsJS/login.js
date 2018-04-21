
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

$("#formModalUsuario").validate({

  rules: {
   
       NombreUsuarioRegistro: {
      required: true,
      minlength: 3,
       maxlength: 20,
       //lettersonly: true
        //,number: true
    },
    PasswordRegistro: {
      required: true,
      minlength: 6,
       maxlength: 15
       
    //   ,number: true
    },
    Password2Registro: {
       
      required: true,
      minlength: 6,
       maxlength: 15
       
    //   ,number: true
    },
       CedulaRifRegistro: {
      required: true,
      minlength: 6,
       maxlength: 8,
       //lettersonly: true
        number: true
    },
      EmailRegistro: {
      required: true,
      minlength: 6,
       maxlength: 30,
       email: true
       
    },
       NombreRegistro: {
      required: true,
      minlength: 3,
       maxlength: 20,
       lettersonly: true
        //,number: true
    },
    ApellidoRegistro: {
      required: true,
      minlength: 3,
       maxlength: 20,
       lettersonly: true
    //   ,number: true
    },
      SexoRegistro: {
       
      required: true,
     
    },
       TelefonoRegistro: {
           
      required: true,
      minlength: 7,
       maxlength: 7,
       //lettersonly: true
        number: true
    },
   
       ParroquiaRegistro: {
      required: true
    },
       Estado: {
      required: true
      
    },
    MunicipioRegistro: {
      required: true
          },
       Email: {
        minlength: 14,
       maxlength: 100,
      required: true
     
    },
      
    PreguntaSecretaRegistro: {
      required: true,
         minlength: 4,
       maxlength: 100
        
          },
      
       RespuestaRegistro: {
      required: true,
            minlength: 1,
       maxlength: 100
          }
       }
});


//Eventos en botones de el formulario
$('#btnLogin').on("click",function(e) {
  // Cuando hago clic guardar, si el form es valido
  if ($("#form").valid()) {
    e.preventDefault();
    Login();
  }

}); 

$('#btnAgregarUsuarioNuevo').on("click",function(e) {
  // Cuando hago clic guardar, si el form es valido
  if ($("#formModalUsuario").valid()) {
    e.preventDefault();
    var password1= document.getElementById("txtPasswordRegistro").value;
    var password2= document.getElementById("txtPassword2Registro").value;
    if (password1 != password2)
    {
       bootbox.alert("Las contraseñas no coinciden, por favor compruebe", function() {
           });
       
   }
   else
   {
     ConfirmGuardar();
   }
   
  }

});

//CUANDO EL ESTADO CAMBIA OBTENGO EL VALOR Y ENVIO A CARGAR EL MUNICIPIO
 $("#cmbEstadoRegistro").change(function() {
    var idn =$("#cmbEstadoRegistro :selected").attr('value');
        CargarComboMunicipio(idn);
    });
//CUANDO EL MUNICIPIO CAMBIA OBTENGO EL VALOR y ENVIO A CARGAR LA PARROQUIA
$("#cmbMunicipioRegistro").change(function() {
     
    var idn = $("#cmbMunicipioRegistro :selected").attr('value');
    CargarComboParroquia(idn);
    });


   
  });
    //=========== FIN DEL DOCUMENT READY================
function AbrirModalRegistro()
{
  //alert('Hola');
  $("#ModalAgregarUsuario").modal();
}
    //Guardar elementos en DataBase
     function GuardarUsuario() {        
      //Capturar datos del formulario
      var UserName = document.getElementById("txtUserRegistro").value;
      var Password = document.getElementById("txtPasswordRegistro").value;
      var Password2 = document.getElementById("txtPassword2Registro").value;
      var PreguntaSecreta =document.getElementById("txtPreguntaSecretaRegistro").value;
      var Respuesta =document.getElementById("txtRespuestaRegistro").value;
     
       var CedulaRif =document.getElementById("txtCedulaRifRegistro").value;
       var EstatusLaboral = {Idn:1};
       var Rol = {Idn:1};
      var Email = document.getElementById("txtEmailRegistro").value ;
        
      var Nombre =document.getElementById("txtNombreRegistro").value;
        var Apellido =document.getElementById("txtApellidoRegistro").value;
            var CodigoArea = $("#cmbCodigoArea :selected").attr('value');
          var Telefono = CodigoArea + "" + document.getElementById("txtTelefonoRegistro").value;
          // var IdnEstatus= $("#CmbEstatusLaboral :selected").attr('value');
         var IdnParroquia = $("#cmbParroquiaRegistro :selected").attr('value');
         var  Sexo = $("#cmbSexoRegistro :selected").attr('value');
        //  var IdnRol =  $("#CmbRol :selected").attr('value');
         
        //var EstatusLaboral = {Idn:IdnEstatus};
         var Parroquia = {Idn:IdnParroquia};
      //var Rol = {Idn:IdnRol};
      //Agregamos los datos capturados a un arreglo => arr
      var arr = {CedulaRif:CedulaRif,UserName:UserName,Password:Password,
                 Nombre:Nombre,
                 Apellido:Apellido,Sexo:Sexo,
                 Email:Email,Telefono:Telefono,Parroquia:Parroquia
                 ,EstatusLaboral:EstatusLaboral,Rol:Rol,PreguntaSecreta:PreguntaSecreta,Respuesta:Respuesta};
      //Evento ajax para enviar los datos
      $.ajax({
        //Ruta para enviar el servicio
        url: ''+ global + '/Usuario',
        type: 'POST',
        //Enviamos el arreglo ar
        data: JSON.stringify(arr),
        contentType: 'application/json; charset=utf-8',
           async: false,
          //Si todo funciona bien entra al sucess
          statusCode: {
           409: function (response) {
            bootbox.alert("Un elemento con el mismo nombre ya existe en el sistema", function() {

            });

          },
          400: function (response) {
           bootbox.alert("Ocurrio un Error al almacenar los datos", function() {
           });

         } 
       },
       success: function(msg) {
        bootbox.alert("Usuario Registrado Correctamente", function() {
        });
             // e.preventDefault();
            //Actualiza la datatable automáticamente
            $('#ModalAgregarUsuario').modal('toggle');
                        LimpiarCamposModal();
                      }


                    });
    }

    //Guardar elementos en DataBase
     function Login() {        
      //Capturar datos del formulario
        var UserName = document.getElementById("txtUser").value;
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


                    });
    }
    
function LimpiarCamposModal(){
        var UserName = document.getElementById("txtUserNameRegistro").value="";
      var Password = document.getElementById("txtPasswordRegistro").value="";
      var Password2 =document.getElementById("txtPassword2Registro").value="";
         var Idn = document.getElementById("txtIdnRegistro").value="";
     var UserName = document.getElementById("txtUserNameRegistro").value="";
      var Password = document.getElementById("txtPasswordRegistro").value="";
      var Nombre =document.getElementById("txtNombreRegistro").value="";
        var Apellido =document.getElementById("txtApellidoRegistro").value="";
         var Telefono =document.getElementById("txtTelefonoRegistro").value="";
    var PreguntaSecreta =document.getElementById("txtPreguntaSecretaRegistro").value="";
        var Respuesta =document.getElementById("txtRespuestaRegistro").value="";
      var CedulaRif = document.getElementById("txtCedulaRifRegistro").value="" ;
          var Email = document.getElementById("txtEmailRegistro").value="" ; 

CargarComboEstado();
CargarComboMunicipio(1,1);
CargarComboParroquia(1,1);

}
  
function LimpiarCampos(){
      var UserName = document.getElementById("txtUser").value="";
      var Password = document.getElementById("txtPassword").value="";
}

//==== CONFIGURACION DE COMBOS DE UBICACIÓN=========
     function CargarComboEstado()
    {
       jQuery.support.cors = true;
        $.ajax({
            url: ''+ global + '/EstadosActivos',
            type: 'GET',
            dataType: 'json',            
            success: function (data) {                


               var listItems="";

                for (var i=0; i< data.length; i++)
                {
                  listItems+="<option value='" + data[i].Idn+"'>" + data[i].Nombre + "</option>";

                }
                $("#cmbEstadoRegistro").html(listItems);
          
               
            },
            error: function (x, y, z) {
                //alert(x + '\n' + y + '\n' + z);
            }
            
        }); 
           
      }

 
       function CargarComboMunicipio(idn,municipio)
    {
      
       jQuery.support.cors = true;

        $.ajax({
            url: ''+ global + '/Municipios/Estado/'+idn+'',
            type: 'GET',
            dataType: 'json',            
            success: function (data) {                
              

               var listItems="";

                for (var i=0; i< data.length; i++)
                {
                  listItems+="<option value='" + data[i].Idn+"'>" + data[i].Nombre + "</option>";
                 
                }
                $("#cmbMunicipioRegistro").html(listItems);
                $("#cmbMunicipioRegistro").val(municipio);
             
            },
            error: function (x, y, z) {
                //alert(x + '\n' + y + '\n' + z);
            }
        }); 
      }

 function CargarComboParroquia(IdnMunicipio,Parroquia)
    {
       jQuery.support.cors = true;
        $.ajax({
            url: ''+ global + '/Parroquias/Municipio/'+IdnMunicipio+'',
            type: 'GET',
            dataType: 'json',            
            success: function (data) {                


               var listItems="";

                for (var i=0; i< data.length; i++)
                {
                  listItems+="<option value='" + data[i].Idn+"'>" + data[i].Nombre + "</option>";

                }
                $("#cmbParroquiaRegistro").html(listItems);
            $("#cmbParroquiaRegistro").val(Parroquia);
            },
            error: function (x, y, z) {
                //alert(x + '\n' + y + '\n' + z);
            }
        }); 
      }
      function ReactivarElemento() {        

    //Capturar datos del formulario
      var Idn = document.getElementById("txtIdn").value;
    
        
    if (Idn=="")
       {
         bootbox.alert("Por favor Selecciona un item a reactivar de la lista", function() {

       });
         return false;
       }
         else
      {
      
      //Agregamos los datos capturados a un arreglo => arr
      var arr = {Idn:Idn};
      
      //Evento ajax para enviar los datos
      $.ajax({
        //Ruta para enviar el servicio
        url:'http://localhost:60211/api/v1/Marca/'+Idn+'',
        type: 'PUT',
        //Enviamos el arreglo ar
        data: JSON.stringify(arr),
        contentType: 'application/json; charset=utf-8',
        async: false,
        //Si todo Pantallaa bien entra al sucess
        success: function(msg) {
          bootbox.alert("Elemento Reactivado correctamente", function() {
          
          });
          
          //Actualiza la datatable automáticamente
          var table = $('#TablaMarca').dataTable();
                      // Example call to reload from original file
                      table.fnReloadAjax();
                      LimpiarCampos();
                    },
        //Si algo falla en el API indica
        error: function() {
          bootbox.alert("Error al reactivar los datos", function() {
          
          });
                   }
                  });
    }
    }
function ConfirmReactivar() {      
     bootbox.dialog({
  message: "¿Está seguro de Reactivar este Elemento?",
  title: "Reactivación",
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
        ReactivarElemento();
      }
          }
      
    }
  
});
     
    }

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