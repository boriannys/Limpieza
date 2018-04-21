
//=======INICIO DE DOCUMENT READY==============

 //EVENTO CUANDO CARGA TODO EL DOCUMENTO
    window.global = 'http://localhost:60211/api/v1';
    $(document).ready(function() {

    //Al iniciar la ventana, se obtiene el token de parametro
   // window.token = getUrlParameter("token");
    //Se envia un post para comprobar el token
   // ComprobarAutorizacion(token);

LimpiarCampos();
//Validar documento, configurar
$("#form").validate({

  rules: {
    Descripcion: {
      required: true,
      minlength: 4,
       maxlength: 150
      
    //   ,number: true
    },
    Fecha:{
      required: true
    },
    Cedula:
    {
      required: true,
       minlength: 6,
       maxlength: 8,
       number: true
    }


  }
 
})

//Eventos en botones de el formulario
$('#Guardar').on("click",function(e) {
  // Cuando hago clic guardar, si el form es valido
  if ($("#form").valid()) {
    e.preventDefault();
    ConfirmGuardar();
  }
}); 
$('#Modificar').on("click",function(e) {
  // Cuando hago clic en modificar si el form es valido
  if ($("#form").valid()) {
    e.preventDefault();
    ConfirmModificar();
  }
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
  }else{
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



 $('#txtFechaSolicitud').datepicker({
 
    format: 'dd/mm/yyyy',
    autoclose: true,
    language: 'es'


}); 
//Cargar DataTable
CargarTabla();

   
  });
    //=========== FIN DEL DOCUMENT READY================

    //======INICIO DE FUNCIONES ============

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
      var table = $("#TablaSolicitudInsumo").DataTable({
         //Especificacion de Ancho y Alto de la tabla
         "rowCallback": function( row, data, index ) {
             if ( data.Activo == "1" ) 
            {
            $('td:eq(5)', row).html( '<b>Activo</b>' );
            $('td:eq(5)', row).css('background-color', '#98FEE6');
            }
            else
            {
            $('td:eq(5)', row).html( '<b>Inactivo</b>' );
            $('td:eq(5)', row).css('background-color', '#FEE698');
            }
            $('td:eq(0)', row).css('background-color', '#ECECEC');
          },
        "scrollY":        "200px",
        "scrollX":        "600px",
           //Especificaciones de las Columnas que vienen y deben mostrarse
           "columns" : [
           { data : 'Idn' },
           { data : 'CedulaEmpleado' },
           { data : 'Descripcion' },
           { data : 'FechaSolicitud' },
           { data : 'TipoSolicitud' },
           { data : 'Activo' }
           ],    
           //Especificaciones de la URL del servicio para cargar la tabla
           "ajax": {
            url: ""+ global + "/GSolicitudInsumos",
            dataSrc : ''
          }

        });  
      //Al hacer clic en la tabla carga los campos en los TXT
      $('#TablaSolicitudInsumo tbody').on( 'click', 'tr', function () {
        
       var Activo = table.row( this ).data().Activo;
        FormatoEstatus(Activo);


        var CedulaEmpleado = table.row( this ).data().CedulaEmpleado;
        var Descripcion = table.row( this ).data().Descripcion;
        var FechaSolicitud = table.row( this ).data().FechaSolicitud;
        var TipoSolicitud = table.row( this ).data().TipoSolicitud;
        var Idn = table.row( this ).data().Idn;
        var NombreEmpleado = table.row( this ).data().Empleado.Nombre;
        var ApellidoEmpleado = table.row( this ).data().Empleado.Apellido;

        document.getElementById("txtCedulaEmpleado").value = Nombre;
        document.getElementById("txtDescripcion").value = Descripcion;
        document.getElementById("txtFechaSolicitud").value = FechaSolicitud;
        document.getElementById("txtIdn").value = Idn;
        document.getElementById("cmbTipoSolicitud").value = TipoSolicitud;
        document.getElementById("txtNombre").value = NombreEmpleado;
        document.getElementById("txtApellido").value = ApellidoEmpleado;

      } );

    }
    //FUNCION PARA OBTENER ELEMENTOS PARTICULARES DEL SERVICIO

    function GetElementos() {
      jQuery.support.cors = true;
      $.ajax({
        url: ''+ global + '/SolicitudInsumos',
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
  
function BuscarCedulaPorEmpleado()
{
var Idn = document.getElementById("txtCedulaEmpleado").value;
 
 if (Idn == "")
 {
  bootbox.alert("Debe escribir la Cédula del Empleado",function() {
    });
 }else{

     jQuery.support.cors = true;
        $.ajax({
            url: ''+ global + '/Empleado/'+Idn+'',
            type: 'GET',
            dataType: 'json',  

            async: false,

            statusCode: {
           404: function (response) {
            bootbox.alert("Este Empleado no ha sido registrado", function() {
               //var Placa =  document.getElementById("txtPlacaVehiculo").value="";
          //DeshabilitarCampos();

            });

          }
        },

            success: function (data) {    
                //document.getElementById("txtIncidente").disabled=true;
              //HabilitarCampos();
              var Cedula = data.CedulaRif;
              var Nombre = data.Nombre;
              var Apellido = data.Apellido

               document.getElementById("txtCedulaEmpleado").value = Cedula;
               document.getElementById("txtNombre").value = Nombre;
               document.getElementById("txtApellido").value = Apellido;
              //alert(txtPlacaVehiculo);

               // WriteResponse(data);
            }
           /* error: function (x, y, z) {
                alert(x + '\n' + y + '\n' + z);*/
            //}
        });        
    }
  }


    //Guardar elementos en DataBase
     function GuardarSolicitudInsumo() {        
      //Capturar datos del formulario
      var TipoSolicitud = document.getElementById("cmbTipoSolicitud").value;
      var FechaSolicitud = document.getElementById("txtFechaSolicitud").value;
      var CedulaEmpleado = document.getElementById("txtCedulaEmpleado").value;
      var Descripcion = document.getElementById("txtDescripcion").value;
    

      //Agregamos los datos capturados a un arreglo => arr
      var arr = {CedulaEmpleado:CedulaEmpleado,Descripcion:Descripcion,FechaSolicitud:FechaSolicitud,TipoSolicitud:TipoSolicitud};
      //Evento ajax para enviar los datos
      $.ajax({
        //Ruta para enviar el servicio
        url: ''+ global + '/GSolicitudInsumo',
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
            var table = $('#TablaSolicitudInsumo').dataTable();
                        // Example call to reload from original file
                        table.fnReloadAjax();
                        LimpiarCampos();
                      }


                    });
    }
    

    function ModificarSolicitudInsumo() {        

       var TipoSolicitud = document.getElementById("cmbTipoSolicitud").value;
      var FechaSolicitud = document.getElementById("txtFechaSolicitud").value;
      var CedulaEmpleado = document.getElementById("txtCedulaEmpleado").value;
      var Descripcion = document.getElementById("txtDescripcion").value;
    
       var Idn = document.getElementById("txtIdn").value;

      //Agregamos los datos capturados a un arreglo => arr
      var arr = { Idn:Idn,CedulaEmpleado:CedulaEmpleado,Descripcion:Descripcion,FechaSolicitud:FechaSolicitud,TipoSolicitud:TipoSolicitud};
      
      //Evento ajax para enviar los datos
      $.ajax({
        //Ruta para enviar el servicio
        url: ''+ global + '/GSolicitudInsumo/',
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
            var table = $('#TablaSolicitudInsumo').dataTable();
                        // Example call to reload from original file
                        table.fnReloadAjax();
                        LimpiarCampos();
                      }


                    });
    }

    function EliminarSolicitudInsumo() {        

     var TipoSolicitud = document.getElementById("cmbTipoSolicitud").value;
      var FechaSolicitud = document.getElementById("txtFechaSolicitud").value;
      var CedulaEmpleado = document.getElementById("txtCedulaEmpleado").value;
      var Descripcion = document.getElementById("txtDescripcion").value;
       var Idn = document.getElementById("txtIdn").value;
  if (Idn=="")
       {
         bootbox.alert("Por favor Selecciona un item a eliminar de la lista", function() {

       });
         return false;
       }
         else
      {
      //Agregamos los datos capturados a un arreglo => arr
      var arr = { Idn:Idn,CedulaEmpleado:CedulaEmpleado,Descripcion:Descripcion,FechaSolicitud:FechaSolicitud,TipoSolicitud:TipoSolicitud};
      
      //Evento ajax para enviar los datos
      $.ajax({
        //Ruta para enviar el servicio
        url: ''+ global + '/GSolicitudInsumo/'+Idn+'',
        type: 'DELETE',
        //Enviamos el arreglo ar
        data: JSON.stringify(arr),
        contentType: 'application/json; charset=utf-8',
        async: false,
        //Si todo funciona bien entra al sucess
        success: function(msg) {
          bootbox.alert("Datos Eliminados", function() {
          
          });
          
          //Actualiza la datatable automáticamente
          var table = $('#TablaSolicitudInsumo').dataTable();
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

// ========== FUNCIONES PARA MENSAJE DE CONFIRMACION ================
function LimpiarCampos()
{
      var FechaSolicitud = document.getElementById("txtFechaSolicitud").value = "";
      var CedulaEmpleado = document.getElementById("txtCedulaEmpleado").value = "";
      var Descripcion = document.getElementById("txtDescripcion").value = "";
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
        url:'http://localhost:60211/api/v1/GSolicitudInsumo/'+Idn+'',
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
          var table = $('#TablaSolicitudInsumo').dataTable();
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
  message: "¿Está seguro de guardar esta Solitud Insumo?",
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
        GuardarSolicitudInsumo();
      }
          }
      
    }
  
});
     
    }

      function ConfirmModificar() {     
     bootbox.dialog({
  message: "¿Está seguro de modificar esta Solicitud de Insumo?",
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
        ModificarSolicitudInsumo();
      }
          }
      
    }
  
});
     
    }

     function ConfirmEliminar() {     
     bootbox.dialog({
  message: "¿Está seguro de Eliminar esta Solicitud Insumo?",
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
        EliminarSolicitudInsumo();
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
                return true;
      }
    },
    success: {
      label: "Si",
      className: "btn-success",
      callback: function() {
        
        bootbox.hideAll();
          window.location.href = 'Bienvenida.html?token='+token+'';
       // return true;
      }
          }
      
    }
  
});
     
    }
//============FIN DE LAS FUNCIONES============