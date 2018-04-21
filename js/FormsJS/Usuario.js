//=======INICIO DE DOCUMENT READY==============

 //EVENTO CUANDO CARGA TODO EL DOCUMENTO
    window.global = 'http://localhost:60211/api/v1';
    $(document).ready(function() {

    //Al iniciar la ventana, se obtiene el token de parametro
   // window.token = getUrlParameter("token");

    FormatoEstatus(2);
    //Se envia un post para comprobar el token
   // ComprobarAutorizacion(token);
DeshabilitarCampos();

cargarcomboRoles();

//Validar documento, configurar
$("#form").validate({

  rules: {
    NombreUsuario: {
      required: true,
      minlength: 4,
       maxlength: 10,
       lettersonly: true
        ,number: true
    },
    Contrasena: {
      required: true,
      minlength: 3,
       maxlength: 20
       
    //   ,number: true
    },
    Cedula: {
      required: true,
      minlength: 6,
       maxlength: 8,
       
    number: true
    },
Contrasena2: {
       
      required: true,
      minlength: 3,
       maxlength: 20
       
    //   ,number: true
    
    },
       Nombre: {
      required: true,
      minlength: 3,
       maxlength: 15,
       lettersonly: true
        //,number: true
    },
    Apellido: {
      required: true,
      minlength: 3,
       maxlength: 15,
       lettersonly: true
   

    },
       Rol: {
      required: true
        
    }

  }
})
//CUANDO EL ESTADO CAMBIA OBTENGO EL VALOR Y ENVIO A CARGAR EL MUNICIPIO

//======== FIN DE CONFIGURACION DE UBICACION Y COMBOS =========     
//Eventos en botones de el formulario
$('#Guardar').on("click",function(e) {
  // Cuando hago clic guardar, si el form es valido
  if ($("#form").valid()) {
     var Password = document.getElementById("txtPassword").value;
      var Password2 = document.getElementById("txtPassword2").value;
    if (Password == Password2)
    {
    e.preventDefault();
    ConfirmGuardar();
    }
    else
    {
    e.preventDefault();
    bootbox.alert("Las contraseñas deben ser iguales", function() {          
          });
    }
  }
}); 
$('#Modificar').on("click",function(e) {
  // Cuando hago clic guardar, si el form es valido
  if ($("#form").valid()) {
     var Password = document.getElementById("txtPassword").value;
      var Password2 = document.getElementById("txtPassword2").value;
    if (Password == Password2)
    {
    e.preventDefault();
    ConfirmModificar();
    }
    else
    {
    e.preventDefault();
    bootbox.alert("Las contraseñas deben ser iguales", function() {          
          });
    }
  }
}); 
$('#Limpiar').on("click",function(e) {
  //Hacer click en limpiar
 
    e.preventDefault();
    LimpiarCampos();
  
});  
$('#Reactivar').on("click",function(e) {
  // Cuando hago clic en Eliminar si el form es valido
 var Idn = document.getElementById("txtIdn").value;
  if (Idn==""){
    e.preventDefault();
   bootbox.alert("Selecciona un Item de la Lista antes de reactivar", function() {          
          });
  }
  else
  {
    e.preventDefault();
    ConfirmReactivar();
  }
 
}); 
$('#Eliminar').on("click",function(e) {
  // Cuando hago clic en Eliminar si el form es valido
  var Nombre = document.getElementById("txtNombre").value;
  if (Nombre==""){
   e.preventDefault();
   bootbox.alert("Selecciona un Item de la Lista antes de eliminar", function() {          
          });
  }
  else
  {
    e.preventDefault();
    ConfirmEliminar();
  }
}); 
$('#Limpiar').on("click",function(e) {
  // Cuando hago clic en Eliminar si el form es valido
  if ($("#form").valid()) {
    e.preventDefault();
    LimpiarCampos();
  }
 
  
}); 

      
   
//Cargar DataTable
CargarTabla();
//Cargar el combobox


  });
 function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};
//Indica una disposicion de los elementos para un acceso personalizado
function DisposicionPersonalizada()
{

}



       


 
function FormatoEstatus(activo)
{
  if (activo == 1)
  {
    $("#Reactivar").hide();
    $("#Eliminar").show();
    $("#txtEstatus").val("Activo");
    $("#txtEstatus").css({'background-color' : '#98FEE6'});
  }
  else if (activo == 0)
  {
    $("#Reactivar").show();
    $("#Eliminar").hide();
    $("#txtEstatus").val("Inactivo");
    $("#txtEstatus").css({'background-color' : '#FEE698'});
  }
   else if (activo == 2)
  {
    $("#Reactivar").hide();
    $("#Eliminar").show();
    $("#txtEstatus").val("");
    $("#txtEstatus").css({'background-color' : '#ECECEC'});
  }

}
    //======INICIO DE FUNCIONES ============
 function CargarTabla()
    {
      var table = $("#TablaUsuario").DataTable({
         //Especificacion de Ancho y Alto de la tabla
         "rowCallback": function( row, data, index ) {
             if ( data.Activo == "1" ) 
            {
            $('td:eq(6)', row).html( '<b>Activo</b>' );
            $('td:eq(6)', row).css('background-color', '#98FEE6');
            }
            else
            {
            $('td:eq(6)', row).html( '<b>Inactivo</b>' );
            $('td:eq(6)', row).css('background-color', '#FEE698');
            }
            $('td:eq(0)', row).css('background-color', '#ECECEC');
          },
        "scrollY":        "200px",
        "scrollX":        "600px",
           //Especificaciones de las Columnas que vienen y deben mostrarse
           "columns" : [
                { data : 'Idn' },
                { data : 'Cedula' },
                { data : 'Contrasenna' },
                { data : 'Nombre' },
                { data : 'Apellido' },
                { data : 'Grol.Nombre' },
                { data : 'Activo' }
           ],    
           //Especificaciones de la URL del servicio para cargar la tabla
           "ajax": {
            url: ""+ global + "/GUsuarios",
            dataSrc : ''
          }

        });  
       //Al Hacer clic en la tabla, obtengo los datos y los cargo a los TextBox
     $('#TablaUsuario tbody').on( 'click', 'tr', function () {
        
       var Activo = table.row( this ).data().Activo;
        FormatoEstatus(Activo);

      var Cedula = table.row( this ).data().Cedula;
      var Contrasenna = table.row( this ).data().Contrasenna;
      var Nombre = table.row( this ).data().Nombre;
      var Apellido = table.row( this ).data().Apellido;
      var Rol = table.row( this ).data().Grol.Idn;
      var Idn = table.row( this ).data().Idn;

        var tipo = Cedula.substring(0,1)
        var Ced = Cedula.substr(2);
        $("#CmbRol").val(Rol);
   
      document.getElementById("txtCedula").value = Ced;
      document.getElementById("txtPassword").value = Contrasenna;
      document.getElementById("txtPassword2").value = Contrasenna;
     document.getElementById("txtNombre").value = Nombre;
     document.getElementById("txtApellido").value = Apellido;
    $("#cmbCedula").val(tipo);
             HabilitarCampos();
    // document.getElementById("CmbRol").value = Rol;
     document.getElementById("txtIdn").value = Idn;
     } );
    }


   // Funcion que lee el JSON para utilizarlos en Inputs o combobox
 function GetElementos() {
      jQuery.support.cors = true;
      $.ajax({
        url: ''+ global + '/GUsuarios',
        type: 'GET',
        dataType: 'json',            
        success: function (data) {                
          WriteResponse(data);
        },
        error: function (x, y, z) {
          alert(x + '\n' + y + '\n' + z);
        }
      });        
    }
       // Luego de obtener el JSON esta funcion lo escribe donde pidamos
        

function BuscarUsuarioPorCedula()
      {
          var ValorCedula =$("#cmbCedula :selected").attr('value');

          var CedulaRif = ValorCedula + "-" + document.getElementById("txtCedula").value ;
          var cedula = document.getElementById("txtCedula").value;
            if (cedula == "")
              {
                bootbox.alert("Debe escribir una Cédula del Usuario",function() {
               });
                  }else{
                     if ( document.getElementById("txtCedula").disabled==true)
                        {
                          bootbox.alert("En estos momentos esta cargada la información de esta Cédula",function() {
                       });
                  }else{
                    jQuery.support.cors = true;
                     $.ajax({
                    url: ''+ global + '/GUsuario/Existe/'+CedulaRif+'',
                    type: 'GET',
                    dataType: 'json',  
                    async: false,

           statusCode: {
                    404: function (response) {
                    bootbox.alert("Este Usuario no ha sido registrado", function() {
                    //document.getElementById("txtCedula").disabled=true;
                    //document.getElementById("cmbCedula").disabled=true;
              // var Cedula =  document.getElementById("txtCodigoBeneficiario").value="";
          //DeshabilitarCampos();

                   HabilitarCampos();
                   });

                 }
              },
    

          success: function (data) {    bootbox.dialog({
                    message: "¿Este Usuario ya existe, desea Modificar sus datos?",
                    title: "Mensaje",
                    buttons: {
                    danger: {
                    label: "No",
                    className: "btn-danger",
              callback: function() {
                    var cedula= document.getElementById("txtCedula").value="";     
                     }
                     },
              success: {
                  label: "Si",
                  className: "btn-success",
                  callback: function() {
        
                   bootbox.hideAll();
                   //document.getElementById("txtCedula").disabled=true;
                   //document.getElementById("cmbCedula").disabled=true;

                   HabilitarCampos();
                   var Idn = data.Idn;
                   var Nombre = data.Nombre;
                   var Apellido = data.Apellido;
                   var Contrasenna = data.Contrasenna;
                  var Rol = data.Grol.Idn;
                   

                   document.getElementById("txtNombre").value = Nombre;
                   document.getElementById("txtApellido").value = Apellido;
                 
                  document.getElementById("txtPassword").value = Contrasenna;

                   $("#CmbRol").val(Rol);
             }
          }
      
         }
  
      });
               
              //alert(txtPlacaVehiculo);

               // WriteResponse(data);
            }
           /* error: function (x, y, z) {
                alert(x + '\n' + y + '\n' + z);*/
            //}
        });        
    }
  }

}
function HabilitarCampos()
{
        var Cedula = document.getElementById("txtCedula").disabled=true ;
    
    
          var Nombre = document.getElementById("txtNombre").disabled=false ;
          var Apellido = document.getElementById("txtApellido").disabled=false ;
          var Rol = document.getElementById("CmbRol").disabled=false ;
           var Contrasenna = document.getElementById("txtPassword").disabled=false ;
          var Contrasena2 = document.getElementById("txtPassword2").disabled=false ;
         
  }

function DeshabilitarCampos()
{
        var Cedula = document.getElementById("txtCedula").disabled=false ;
    
    
          var Nombre = document.getElementById("txtNombre").disabled=true ;
          var Apellido = document.getElementById("txtApellido").disabled=true ;
          var Rol = document.getElementById("CmbRol").disabled=true ;
           var Contrasenna = document.getElementById("txtPassword").disabled=true ;
          var Contrasena2 = document.getElementById("txtPassword2").disabled=true ;
         
  }
 //Guardar elementos en DataBase
     function GuardarUsuario() {        
      //Capturar datos del formulario
      var ValorCedula =$("#cmbCedula :selected").attr('value');

          var Cedula = ValorCedula + "-" + document.getElementById("txtCedula").value ;
          
     var Contrasenna = document.getElementById("txtPassword").value;
      var Nombre =document.getElementById("txtNombre").value;
      var Apellido =document.getElementById("txtApellido").value;
      var IdnRol =  $("#CmbRol :selected").attr('value');
       var ValorCedula =$("#cmbCedula :selected").attr('value');
      var Cedula = ValorCedula + "-" + document.getElementById("txtCedula").value;  
        
      var GRol = {Idn:IdnRol};
      //Agregamos los datos capturados a un arreglo => arr
      var arr = {Cedula:Cedula,Contrasenna:Contrasenna,
                 Nombre:Nombre,Apellido:Apellido, GRol:GRol};
      //Evento ajax para enviar los datos
      $.ajax({
        //Ruta para enviar el servicio
        url: ''+ global + '/GUsuario',
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
        bootbox.alert("Datos Almacenados Correctamente", function() {
        });
             // e.preventDefault();
            //Actualiza la datatable automáticamente
            var table = $('#TablaUsuario').dataTable();
                        // Example call to reload from original file
                        table.fnReloadAjax();
                        LimpiarCampos();
                      }


                    });
    }
   function ModificarUsuario() {  
        
        var Idn = document.getElementById("txtIdn").value;
          var ValorCedula =$("#cmbCedula :selected").attr('value');

          var Cedula = ValorCedula + "-" + document.getElementById("txtCedula").value ;
          
     var Contrasenna = document.getElementById("txtPassword").value;
      var Nombre =document.getElementById("txtNombre").value;
        var Apellido =document.getElementById("txtApellido").value;
        var ValorCedula =$("#cmbCedula :selected").attr('value');
        var Cedula = ValorCedula + "-" + document.getElementById("txtCedula").value;
        var IdnRol =  $("#CmbRol :selected").attr('value');

      var GRol = {Idn:IdnRol};
      //Agregamos los datos capturados a un arreglo => arr
      var arr = {Idn:Idn,Cedula:Cedula,Contrasenna:Contrasenna,
                 Nombre:Nombre,
                 Apellido:Apellido,GRol:GRol};
      //Evento ajax para enviar los datos
      $.ajax({
        //Ruta para enviar el servicio
        url: ''+ global + '/GUsuario/',
        type: 'PUT',
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
        bootbox.alert("Datos Modificados Correctamente", function() {
        });
             // e.preventDefault();
            //Actualiza la datatable automáticamente
            var table = $('#TablaUsuario').dataTable();
                        // Example call to reload from original file
                        table.fnReloadAjax();
                        LimpiarCampos();
                      }


                    });
    }

    function EliminarUsuario() {        

     var Idn = document.getElementById("txtIdn").value;
       
       var arr = {Idn:Idn};
       
  if (Idn=="")
       {
         bootbox.alert("Por favor Selecciona un item a eliminar de la lista", function() {

       });
         return false;
       }
         else
      {

      //Agregamos los datos capturados a un arreglo => arr
     
      //Evento ajax para enviar los datos
      $.ajax({
        //Ruta para enviar el servicio
        url: ''+ global + '/GUsuario/'+Idn+'',
        type: 'DELETE',
        //Enviamos el arreglo ar
        data: JSON.stringify(arr),
        contentType: 'application/json; charset=utf-8',
        async: false,
        //Si todo Pantallaa bien entra al sucess
        success: function(msg) {
          bootbox.alert("Datos Eliminados", function() {
          
          });
          
          //Actualiza la datatable automáticamente
          var table = $('#TablaUsuario').dataTable();
                      // Example call to reload from original file
                      table.fnReloadAjax();
                      LimpiarCampos();
                    },
        //Si algo falla en el API indica
        error: function() {
          bootbox.alert("Error al eliminar los datos", function() {
          
          });
                   }
                  });
    }
  }

// ========== PantallaES PARA MENSAJE DE CONFIRMACION ================
function LimpiarCampos()
{
      var Password = document.getElementById("txtPassword").value="";
      var Password2 =document.getElementById("txtPassword2").value="";
      var Idn = document.getElementById("txtIdn").value="";
      var UserName = document.getElementById("txtCedula").value="";
      var Nombre =document.getElementById("txtNombre").value="";
      var Apellido =document.getElementById("txtApellido").value="";
DeshabilitarCampos();

FormatoEstatus(2);


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
        url:'http://localhost:60211/api/v1/GUsuario/'+Idn+'',
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
          var table = $('#TablaUsuario').dataTable();
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
  message: "¿Está seguro de guardar este Usuario?",
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

      function ConfirmModificar() {     
     bootbox.dialog({
  message: "¿Está seguro de modificar este Usuario?",
  title: "Confirmar Modificación",
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
        ModificarUsuario();
      }
          }
      
    }
  
});
     
    }

     function ConfirmEliminar() {     
     bootbox.dialog({
  message: "¿Está seguro de Eliminar este Usuario?",
  title: "Confirmar Eliminación",
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
        EliminarUsuario();
      }
          }
      
    }
  
});
     
    }
     function ConfirmSalir() {     
     bootbox.dialog({
  message: "¿Está seguro de salir de esta Ventana?",
  title: "Salir al Menu Principal",
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
         window.location.href = 'Bienvenida.html?token='+token+'';
        
      }
          }
      
    }
  
});
     
    }
//============FIN DE LAS PantallaES============
     function cargarcomboRoles()
    {
       jQuery.support.cors = true;
        $.ajax({
            url: ''+ global + '/GRolesActivos',
            type: 'GET',
            dataType: 'json',            
            success: function (data) {                


               var listItems="";

                for (var i=0; i< data.length; i++)
                {
                  listItems+="<option value='" + data[i].Idn+"'>" + data[i].Nombre + "</option>";

                }
                $("#CmbRol").html(listItems);
            },
            error: function (x, y, z) {
                alert(x + '\n' + y + '\n' + z);
            }
        }); 
      }

