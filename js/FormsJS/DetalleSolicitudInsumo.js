//=======INICIO DE DOCUMENT READY==============

 //EVENTO CUANDO CARGA TODO EL DOCUMENTO
    window.global = 'http://localhost:60211/api/v1';
    $(document).ready(function() {

    //Al iniciar la ventana, se obtiene el token de parametro
   // window.token = getUrlParameter("token");
    //Se envia un post para comprobar el token
   // ComprobarAutorizacion(token);
CargarComboInsumo();
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
   Cantidad:{
       required: true,
       minlength: 6,
       maxlength: 8,
       number: true
    }


  }
 
})


$("#BtnListadoSolicitudInsumo").click(function(){

         // return false;
          $("#ModalSolicitudInsumo").modal();
      
   CargarTablaModalListado();
   
       
});

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

function CargarTablaModalListado()
   {
      var Idn = document.getElementById("txtIdn").value
      var table1 = $("#TablaModalSolicitudInsumo").DataTable({

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
          "destroy": true,
       //Especificaciones de las Columnas que vienen y deben mostrarse
     "columns" : [
           { data : 'Idn' },
           { data : 'CedulaEmpleado' },
           { data : 'Descripcion' },
           { data : 'FechaSolicitud' },
           { data : 'TipoSolicitud' },
           { data : 'Activo' }
           ],
          "columnDefs": [
                { type: "Idn", targets: 0 }
            ], 

       //Especificaciones de la URL del servicio
        "ajax": {
            url: ''+ global + '/GDetalleSolicitudInsumos/GSolicitudInsumo/'+Idn+'',
            dataSrc : ''


        }
        
  });  
$('#TablaModalSolicitudInsumo tbody').on('click', 'tr', function () {
         //var Idn = table.row(this).data().Idn;
         var Idn = table.row(this).data().Idn;
        
         document.getElementById("txtSolicitudInsumo").value = Idn;
         
         //HabilitarCampos();
        
//$('#ModalAgregarSolicitudInsumo').modal('hide');
     });
}


 function CargarTabla()
    {
      var table = $("#TablaDetalleInsumo").DataTable({
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
           { data : 'SolicitudInsumo.Idn' },
           { data : 'Insumo.Idn' },
           { data : 'Descripcion' },
           { data : 'Cantidad' },
           { data : 'Activo' }
           ],    
           //Especificaciones de la URL del servicio para cargar la tabla
           "ajax": {
            url: ""+ global + "/GDetalleSolicitudInsumos",
            dataSrc : ''
          }

        });  
      //Al hacer clic en la tabla carga los campos en los TXT
      $('#TablaDetalleInsumo tbody').on( 'click', 'tr', function () {
        
       var Activo = table.row( this ).data().Activo;
        FormatoEstatus(Activo);


        var SolicitudInsumo = table.row( this ).data().SolicitudInsumo;
        var Descripcion = table.row( this ).data().Descripcion;
        var Insumo = table.row( this ).data().Insumo;
        var Cantidad = table.row( this ).data().Cantidad;
        var Idn = table.row( this ).data().Idn;

        document.getElementById("txtSolicitudInsumo").value = SolicitudInsumo;
        document.getElementById("txtDescripcion").value = Descripcion;
        document.getElementById("txtCantidad").value = Cantidad;
        document.getElementById("txtIdn").value = Idn;
        $("#cmbInsumo").val(Insumo);

      } );

    }


    //FUNCION PARA OBTENER ELEMENTOS PARTICULARES DEL SERVICIO




    function GetElementos() {
      jQuery.support.cors = true;
      $.ajax({
        url: ''+ global + '/DetalleSolicitudInsumos',
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
  

    //Guardar elementos en DataBase
     function GuardarDetalleSolicitudInsumo() {        
      //Capturar datos del formulario
      var IdnSolicitudInsumo = document.getElementById("txtSolicitudInsumo").value;
      var Descripcion = document.getElementById("txtDescripcion").value;
      var IdnInsumo =$("#cmbInsumo :selected").attr('value'); 
      var Cantidad = document.getElementById("txtCantidad").value;
      var SolicitudInsumo = {Idn:IdnSolicitudInsumo}; 
      var Insumo = {Idn:IdnInsumo};
      
    
      //Agregamos los datos capturados a un arreglo => arr
      var arr = {SolicitudInsumo:SolicitudInsumo,Descripcion:Descripcion,Insumo:Insumo,Cantidad:Cantidad};
      //Evento ajax para enviar los datos
      $.ajax({
        //Ruta para enviar el servicio
        url: ''+ global + '/GDetalleSolicitudInsumo',
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
            var table = $('#TablaDetalleInsumo').dataTable();
                        // Example call to reload from original file
                        table.fnReloadAjax();
                        LimpiarCampos();
                      }


                    });
    }
    

    function ModificarDetalleSolicitudInsumo() {        

     
      var IdnSolicitudInsumo = document.getElementById("txtSolicitudInsumo").value;
      var Descripcion = document.getElementById("txtDescripcion").value;
      var IdnInsumo =$("#cmbInsumo :selected").attr('value'); 
      var Cantidad = document.getElementById("txtCantidad").value;
      var SolicitudInsumo = {Idn:IdnSolicitudInsumo}; 
      var Insumo = {Idn:IdnInsumo};
    
       var Idn = document.getElementById("txtIdn").value;

      //Agregamos los datos capturados a un arreglo => arr
      var arr = { Idn:Idn,SolicitudInsumo:SolicitudInsumo,Descripcion:Descripcion,Insumo:Insumo,Cantidad:Cantidad};
      
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
            var table = $('#TablaDetalleInsumo').dataTable();
                        // Example call to reload from original file
                        table.fnReloadAjax();
                        LimpiarCampos();
                      }


                    });
    }

    function EliminarDetalleSolicitudInsumo() {        

      var IdnSolicitudInsumo = document.getElementById("txtSolicitudInsumo").value;
      var Descripcion = document.getElementById("txtDescripcion").value;
      var IdnInsumo =$("#cmbInsumo :selected").attr('value'); 
      var Cantidad = document.getElementById("txtCantidad").value;
      var SolicitudInsumo = {Idn:IdnSolicitudInsumo}; 
      var Insumo = {Idn:IdnInsumo};
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
      var arr = {Idn:Idn,SolicitudInsumo:SolicitudInsumo,Descripcion:Descripcion,Insumo:Insumo,Cantidad:Cantidad};
      
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
          var table = $('#TablaDetalleInsumo').dataTable();
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
      var Insumo = document.getElementById("txtSolicitudInsumo").value = "";
      var Cantidad = document.getElementById("txtCantidad").value = "";
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
          var table = $('#TablaDetalleInsumo').dataTable();
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
  message: "¿Está seguro de guardar este Detalle Solitud Insumo?",
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
        GuardarDetalleSolicitudInsumo();
      }
          }
      
    }
  
});
     
    }

      function ConfirmModificar() {     
     bootbox.dialog({
  message: "¿Está seguro de modificar este Detalle Solicitud de Insumo?",
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
        ModificarDetalleSolicitudInsumo();
      }
          }
      
    }
  
});
     
    }

     function ConfirmEliminar() {     
     bootbox.dialog({
  message: "¿Está seguro de Eliminar este Detalle Solicitud Insumo?",
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
        EliminarDetalleSolicitudInsumo();
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

         function CargarComboInsumo()
    {
       jQuery.support.cors = true;
        $.ajax({
            url: ''+ global + '/GInsumos',
            type: 'GET',
            dataType: 'json',            
            success: function (data) {                


               var listItems="";

                for (var i=0; i< data.length; i++)
                {
                  listItems+="<option value='" + data[i].Idn+"'>" + data[i].Nombre + "</option>";

                }
                $("#cmbInsumo").html(listItems);
            },
            error: function (x, y, z) {
                alert(x + '\n' + y + '\n' + z);
            }
        }); 
      }
//============FIN DE LAS FUNCIONES============