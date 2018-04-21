
//=======INICIO DE DOCUMENT READY==============

 //EVENTO CUANDO CARGA TODO EL DOCUMENTO
    window.global = 'http://localhost:60211/api/v1';
    $(document).ready(function() {

    //Al iniciar la ventana, se obtiene el token de parametro
  //  window.token = getUrlParameter("token");
    //Se envia un post para comprobar el token
  //  ComprobarAutorizacion(token);
    

LimpiarCampos();
cargarcomboAlmacen();
//Validar documento, configurar
$("#form").validate({

  rules: {
    Nombre: {
      required: true,
      minlength: 4,
       maxlength: 40,
       lettersonly: true
        //,number: true
    },
      TipoInsumo: {
      required: true,
      minlength: 4,
       maxlength: 40,
       lettersonly: true
        //,number: true
    },

    Descripcion: {
      required: true,
      minlength: 4,
       maxlength: 150
      
    //   ,number: true
    },

    Cantidad: {
      required: true,
      minlength: 1,
       maxlength: 4
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
      var table = $("#TablaInsumos").DataTable({
         //Especificacion de Ancho y Alto de la tabla
         "rowCallback": function( row, data, index ) {
             if ( data.Activo == "1" ) 
            {
            $('td:eq(7)', row).html( '<b>Activo</b>' );
            $('td:eq(7)', row).css('background-color', '#98FEE6');
            }
            else
            {
            $('td:eq(7)', row).html( '<b>Inactivo</b>' );
            $('td:eq(7)', row).css('background-color', '#FEE698');
            }
            $('td:eq(0)', row).css('background-color', '#ECECEC');
          },
        "scrollY":        "200px",
        "scrollX":        "600px",
           //Especificaciones de las Columnas que vienen y deben mostrarse
           "columns" : [
           { data : 'Idn' },
           { data : 'Nombre' },
             { data : 'TipoInsumo' },
           { data : 'Descripcion' },
             { data : 'GAlmacen.Nombre' },
              { data : 'Cantidad' },
               { data : 'Accesibilidad' },
           { data : 'Activo' }
           ],    
           //Especificaciones de la URL del servicio para cargar la tabla
           "ajax": {
            url: ""+ global + "/GInsumos",
            dataSrc : ''
          }

        });  
      //Al hacer clic en la tabla carga los campos en los TXT
      $('#TablaInsumos tbody').on( 'click', 'tr', function () {
        
       var Activo = table.row( this ).data().Activo;
        FormatoEstatus(Activo);

      var Idn = table.row( this ).data().Idn;
        var Nombre = table.row( this ).data().Nombre;
          var TipoInsumo = table.row( this ).data().TipoInsumo;
        var Descripcion = table.row( this ).data().Descripcion;
         var Almacen =table.row( this ).data().GAlmacen.Idn;
         var Cantidad = table.row( this ).data().Cantidad;
             var Accesibilidad = table.row( this ).data().Accesibilidad;
      

        document.getElementById("txtIdn").value = Idn;
        document.getElementById("txtNombre").value = Nombre;
        document.getElementById("txtTipoInsumo").value = TipoInsumo;
        document.getElementById("txtDescripcion").value = Descripcion;
       document.getElementById("txtCantidad").value = Cantidad;
         $("#cmbAlmacen").val(Almacen);
          $("#cmbAccesibilidad").val(Accesibilidad);

      } );

    }
    //FUNCION PARA OBTENER ELEMENTOS PARTICULARES DEL SERVICIO

    function GetElementos() {
      jQuery.support.cors = true;
      $.ajax({
        url: ''+ global + '/GInsumos',
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
     function GuardarInsumo() {        
      //Capturar datos del formulario
      var Nombre = document.getElementById("txtNombre").value;
      var TipoInsumo = document.getElementById("txtTipoInsumo").value;
      var Descripcion = document.getElementById("txtDescripcion").value;
       var IdnAlmacen =$("#cmbAlmacen :selected").attr('value');
        var Cantidad = document.getElementById("txtCantidad").value;
  var Accesibilidad=$("#cmbAccesibilidad :selected").attr('value');
          var GAlmacen = {Idn:IdnAlmacen};

      //Agregamos los datos capturados a un arreglo => arr
      var arr = { Nombre:Nombre,TipoInsumo:TipoInsumo,Descripcion:Descripcion,GAlmacen:GAlmacen,Cantidad:Cantidad,Accesibilidad:Accesibilidad };
      //Evento ajax para enviar los datos
      $.ajax({
        //Ruta para enviar el servicio
        url: ''+ global + '/GInsumo',
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
            var table = $('#TablaInsumos').dataTable();
                        // Example call to reload from original file
                        table.fnReloadAjax();
                        LimpiarCampos();
                      }


                    });
    }
    

    function ModificarInsumo() {        

        var Nombre = document.getElementById("txtNombre").value;
      var TipoInsumo = document.getElementById("txtTipoInsumo").value;
      var Descripcion = document.getElementById("txtDescripcion").value;
       var IdnAlmacen =$("#cmbAlmacen :selected").attr('value');
            var Cantidad = document.getElementById("txtCantidad").value;
        var Accesibilidad=$("#cmbAccesibilidad :selected").attr('value');
          var GAlmacen = {Idn:IdnAlmacen};
      var Idn = document.getElementById("txtIdn").value;
      //Agregamos los datos capturados a un arreglo => arr
      var arr = { Idn:Idn,Nombre:Nombre,TipoInsumo:TipoInsumo,Descripcion:Descripcion,GAlmacen:GAlmacen,Cantidad:Cantidad,Accesibilidad:Accesibilidad };
      
      //Evento ajax para enviar los datos
      $.ajax({
        //Ruta para enviar el servicio
        url: ''+ global + '/GInsumo/',
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
            var table = $('#TablaInsumos').dataTable();
                        // Example call to reload from original file
                        table.fnReloadAjax();
                        LimpiarCampos();
                      }


                    });
    }

    function EliminarInsumo() {        

            var Nombre = document.getElementById("txtNombre").value;
      var TipoInsumo = document.getElementById("txtTipoInsumo").value;
      var Descripcion = document.getElementById("txtDescripcion").value;
       var IdnAlmacen =$("#cmbAlmacen :selected").attr('value');
            var Cantidad = document.getElementById("txtCantidad").value;
        var Accesibilidad=$("#cmbAccesibilidad :selected").attr('value');
          var GAlmacen = {Idn:IdnAlmacen};
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
      var arr = { Idn:Idn,Nombre:Nombre,TipoInsumo:TipoInsumo,Descripcion:Descripcion,GAlmacen:GAlmacen,Cantidad:Cantidad,Accesibilidad:Accesibilidad };
      
      //Evento ajax para enviar los datos
      $.ajax({
        //Ruta para enviar el servicio
        url: ''+ global + '/GInsumo/'+Idn+'',
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
          var table = $('#TablaInsumos').dataTable();
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
    var Nombre = document.getElementById("txtNombre").value="";
      var Descripcion = document.getElementById("txtDescripcion").value="";

      var TipoInsumo = document.getElementById("txtTipoInsumo").value="";
           var Cantidad = document.getElementById("txtCantidad").value="";
      var Idn = document.getElementById("txtIdn").value="";
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
        url:'http://localhost:60211/api/v1/GInsumo/'+Idn+'',
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
          var table = $('#TablaInsumo').dataTable();
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
  message: "¿Está seguro de guardar este insumo?",
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
        GuardarInsumo();
      }
          }
      
    }
  
});
     
    }

      function ConfirmModificar() {     
     bootbox.dialog({
  message: "¿Está seguro de modificar este Insumo?",
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
        ModificarInsumo();
      }
          }
      
    }
  
});
     
    }

     function ConfirmEliminar() {     
     bootbox.dialog({
  message: "¿Está seguro de Eliminar este Insumo?",
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
        EliminarInsumo();
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

     function cargarcomboAlmacen()
    {
       jQuery.support.cors = true;
        $.ajax({
            url: ''+ global + '/GAlmacenesActivos',
            type: 'GET',
            dataType: 'json',            
            success: function (data) {                


               var listItems="";

                for (var i=0; i< data.length; i++)
                {
                  listItems+="<option value='" + data[i].Idn+"'>" + data[i].Nombre + "</option>";

                }
                $("#cmbAlmacen").html(listItems);
            },
            error: function (x, y, z) {
                alert(x + '\n' + y + '\n' + z);
            }
        }); 
      

     
                                                                                                                                                                                                            }
//============FIN DE LAS FUNCIONES============