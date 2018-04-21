//=======INICIO DE DOCUMENT READY==============

 //EVENTO CUANDO CARGA TODO EL DOCUMENTO
    window.global = 'http://localhost:60211/api/v1';
    $(document).ready(function() {

    //Al iniciar la ventana, se obtiene el token de parametro
    window.token = getUrlParameter("token");
    //Se envia un post para comprobar el token
    ComprobarAutorizacion(token);
LimpiarCampos();
//Validar documento, configurar
FormatoTabla(); 


$('#txtFecha1').datepicker({
 
    format: 'yyyy/mm/dd' ,
    autoclose: true,
    language: 'es'
});

$('#txtFecha2').datepicker({
 
    format: 'yyyy/mm/dd' ,
    autoclose: true,
    language: 'es'
});  


 
}); 

//Cargar DataTable


    //=========== FIN DEL DOCUMENT READY================

    //======INICIO DE TipoPagoES ============

    function CargarTablaPorFechasEmision()
    {
      var table = $("#TablaPolizaPorFecha").DataTable({
         //Especificacion de Ancho y Alto de la tabla
         "rowCallback": function( row, data, index ) {
             if ( data.Activo == "1" ) 
            {
            $('td:eq(3)', row).html( '<b>Activo</b>' );
            $('td:eq(3)', row).css('background-color', '#98FEE6');
            }
            else
            {
            $('td:eq(3)', row).html( '<b>Inactivo</b>' );
            $('td:eq(3)', row).css('background-color', '#FEE698');
            }
            $('td:eq(0)', row).css('background-color', '#ECECEC');
          },
        "scrollY":        "200px",
        "scrollX":        "600px",
        "destroy": true,
           //Especificaciones de las Columnas que vienen y deben mostrarse
           "columns" : [
           { data : 'Idn' },
           { data : 'Codigo' },
           { data : 'Cliente.CedulaRif' },
           { data : 'Cliente.Nombre' },
           { data : 'Cliente.Apellido' },
           { data : 'Analista.CedulaRif' },
           { data : 'Analista.Nombre' },
           { data : 'Aseguradora.Nombre' },
           { data : 'Relacionado.Cedula' },
           { data : 'Relacionado.Nombre' },
           { data : 'Relacionado.Apellido' },
           { data : 'Producto.Nombre' },
           { data : 'Productor.RIF' },
           { data : 'Productor.Nombre' },
           { data : 'Moneda.Nombre' },
           { data : 'TipoPoliza.Nombre' },
           { data : 'TipoPago.Nombre' },
           { data : 'EstatusPoliza.Nombre' },
           { data : 'Comision' },
           { data : 'FechaEmision' },
           { data : 'FechaInicio' },
           { data : 'FechaRegistro' },
           { data : 'FechaVencimiento' },
           { data : 'Observacion' },
           { data : 'Deducible' },
           { data : 'SumaAseguradora' },
           { data : 'PrimaAseguradora' }
          
          ,
           { data : 'Activo' }
           ],    
           //Especificaciones de la URL del servicio para cargar la tabla
           "ajax": {
            url:''+ global + '/Poliza/Fecha',
            dataSrc : ''
          }

        });  
      //Al hacer clic en la tabla carga los campos en los TXT
}

    function CompararFechas() {        
      //Capturar datos del formulario
      var Fecha1 = document.getElementById("txtFecha1").value;
      var Fecha2 = document.getElementById("txtFecha2").value;
      
      alert(Fecha1);
      alert(Fecha2);
      //Agregamos los datos capturados a un arreglo => arr
      var arr = { Fecha1:Fecha1, Fecha2:Fecha2};
      //Evento ajax para enviar los datos
      $.ajax({
        //Ruta para enviar el servicio
        url: ''+ global + '/Poliza/Fecha',
        type: 'POST',
        //Enviamos el arreglo ar
        data: JSON.stringify(arr),
        contentType: 'application/json; charset=utf-8',
          async: false,
          //Si todo funciona bien entra al sucess
          statusCode: {
           409: function (response) {
            bootbox.alert("", function() {

            });

          },
          400: function (response) {
           bootbox.alert("Ocurrio un Error al comparar las fechas", function() {
           });

         } 
       },
       success: function(msg) {
        bootbox.alert("", function() {
        });


             // e.preventDefault();
            //Actualiza la datatable automáticamente
            var table = $('#TablaPolizaPorFecha').dataTable();
                        // Example call to reload from original file
                        table.fnReloadAjax();
                         CargarTablaPorFechasEmision();
                        LimpiarCampos();
                      }


                    });
    }

 function FormatoTabla()
    {
      var table = $("#TablaPolizaPorFecha").DataTable({
         //Especificacion de Ancho y Alto de la tabla
         "rowCallback": function( row, data, index ) {
             if ( data.Activo == "1" ) 
            {
            $('td:eq(3)', row).html( '<b>Activo</b>' );
            $('td:eq(3)', row).css('background-color', '#98FEE6');
            }
            else
            {
            $('td:eq(3)', row).html( '<b>Inactivo</b>' );
            $('td:eq(3)', row).css('background-color', '#FEE698');
            }
            $('td:eq(0)', row).css('background-color', '#ECECEC');
          },
        "scrollY":        "200px",
        "scrollX":        "600px",
        "destroy": true,
           //Especificaciones de las Columnas que vienen y deben mostrarse
           "columns" : [
           { data : 'Idn' },
           { data : 'Codigo' },
           { data : 'Cliente.CedulaRif' },
           { data : 'Cliente.Nombre' },
           { data : 'Cliente.Apellido' },
           { data : 'Analista.CedulaRif' },
           { data : 'Analista.Nombre' },
           { data : 'Aseguradora.Nombre' },
           { data : 'Relacionado.Cedula' },
           { data : 'Relacionado.Nombre' },
           { data : 'Relacionado.Apellido' },
           { data : 'Producto.Nombre' },
           { data : 'Productor.RIF' },
           { data : 'Productor.Nombre' },
           { data : 'Moneda.Nombre' },
           { data : 'TipoPoliza.Nombre' },
           { data : 'TipoPago.Nombre' },
           { data : 'EstatusPoliza.Nombre' },
           { data : 'Comision' },
           { data : 'FechaEmision' },
           { data : 'FechaInicio' },
           { data : 'FechaRegistro' },
           { data : 'FechaVencimiento' },
           { data : 'Observacion' },
           { data : 'Deducible' },
           { data : 'SumaAsegurada' },
           { data : 'PrimaAsegurada' }
          
           ]   
          // Especificaciones de la URL del servicio para cargar la tabla
           //"ajax": {
            //url: ""+ global + "/Polizas/FechaEmision",
            //dataSrc : ''
         // }

        }); 


    }

        function CargarTablaPorFechasInicio()
    {
      var table = $("#TablaPolizaPorFecha").DataTable({
         //Especificacion de Ancho y Alto de la tabla
         "rowCallback": function( row, data, index ) {
             if ( data.Activo == "1" ) 
            {
            $('td:eq(3)', row).html( '<b>Activo</b>' );
            $('td:eq(3)', row).css('background-color', '#98FEE6');
            }
            else
            {
            $('td:eq(3)', row).html( '<b>Inactivo</b>' );
            $('td:eq(3)', row).css('background-color', '#FEE698');
            }
            $('td:eq(0)', row).css('background-color', '#ECECEC');
          },
        "scrollY":        "200px",
        "scrollX":        "600px",
        "destroy": true,
           //Especificaciones de las Columnas que vienen y deben mostrarse
           "columns" : [
           { data : 'Idn' },
           { data : 'Codigo' },
           { data : 'Cliente.CedulaRif' },
           { data : 'Cliente.Nombre' },
           { data : 'Cliente.Apellido' },
           { data : 'Analista.CedulaRif' },
           { data : 'Analista.Nombre' },
           { data : 'Aseguradora.Nombre' },
           { data : 'Relacionado.Cedula' },
           { data : 'Relacionado.Nombre' },
           { data : 'Relacionado.Apellido' },
           { data : 'Producto.Nombre' },
           { data : 'Productor.RIF' },
           { data : 'Productor.Nombre' },
           { data : 'Moneda.Nombre' },
           { data : 'TipoPoliza.Nombre' },
           { data : 'TipoPago.Nombre' },
           { data : 'EstatusPoliza.Nombre' },
           { data : 'Comision' },
           { data : 'FechaEmision' },
           { data : 'FechaInicio' },
           { data : 'FechaRegistro' },
           { data : 'FechaVencimiento' },
           { data : 'Observacion' },
           { data : 'Deducible' },
           { data : 'SumaAseguradora' },
           { data : 'PrimaAseguradora' }
          
          ,
           { data : 'Activo' }
           ],    
           //Especificaciones de la URL del servicio para cargar la tabla
           "ajax": {
            url: ""+ global + "/Polizas/FechaEmision",
            dataSrc : ''
          }

        });  
      //Al hacer clic en la tabla carga los campos en los TXT


    }

        function CargarTablaPorFechasVencimiento()
    {
      var table = $("#TablaPolizaPorFecha").DataTable({
         //Especificacion de Ancho y Alto de la tabla
         "rowCallback": function( row, data, index ) {
             if ( data.Activo == "1" ) 
            {
            $('td:eq(3)', row).html( '<b>Activo</b>' );
            $('td:eq(3)', row).css('background-color', '#98FEE6');
            }
            else
            {
            $('td:eq(3)', row).html( '<b>Inactivo</b>' );
            $('td:eq(3)', row).css('background-color', '#FEE698');
            }
            $('td:eq(0)', row).css('background-color', '#ECECEC');
          },
        "scrollY":        "200px",
        "scrollX":        "600px",
        "destroy": true,
           //Especificaciones de las Columnas que vienen y deben mostrarse
           "columns" : [
           { data : 'Idn' },
           { data : 'Codigo' },
           { data : 'Cliente.CedulaRif' },
           { data : 'Cliente.Nombre' },
           { data : 'Cliente.Apellido' },
           { data : 'Analista.CedulaRif' },
           { data : 'Analista.Nombre' },
           { data : 'Aseguradora.Nombre' },
           { data : 'Relacionado.Cedula' },
           { data : 'Relacionado.Nombre' },
           { data : 'Relacionado.Apellido' },
           { data : 'Producto.Nombre' },
           { data : 'Productor.RIF' },
           { data : 'Productor.Nombre' },
           { data : 'Moneda.Nombre' },
           { data : 'TipoPoliza.Nombre' },
           { data : 'TipoPago.Nombre' },
           { data : 'EstatusPoliza.Nombre' },
           { data : 'Comision' },
           { data : 'FechaEmision' },
           { data : 'FechaInicio' },
           { data : 'FechaRegistro' },
           { data : 'FechaVencimiento' },
           { data : 'Observacion' },
           { data : 'Deducible' },
           { data : 'SumaAseguradora' },
           { data : 'PrimaAseguradora' }
          
          ,
           { data : 'Activo' }
           ],    
           //Especificaciones de la URL del servicio para cargar la tabla
           "ajax": {
            url: ""+ global + "/Polizas/FechaEmision",
            dataSrc : ''
          }

        });  
      //Al hacer clic en la tabla carga los campos en los TXT


    }
    //TipoPago PARA OBTENER ELEMENTOS PARTICULARES DEL SERVICIO

    function CargarTablaPorFechasRegistro()
    {
      var table = $("#TablaPolizaPorFecha").DataTable({
         //Especificacion de Ancho y Alto de la tabla
         "rowCallback": function( row, data, index ) {
             if ( data.Activo == "1" ) 
            {
            $('td:eq(3)', row).html( '<b>Activo</b>' );
            $('td:eq(3)', row).css('background-color', '#98FEE6');
            }
            else
            {
            $('td:eq(3)', row).html( '<b>Inactivo</b>' );
            $('td:eq(3)', row).css('background-color', '#FEE698');
            }
            $('td:eq(0)', row).css('background-color', '#ECECEC');
          },
        "scrollY":        "200px",
        "scrollX":        "600px",
        "destroy": true,
           //Especificaciones de las Columnas que vienen y deben mostrarse
           "columns" : [
           { data : 'Idn' },
           { data : 'Codigo' },
           { data : 'Cliente.CedulaRif' },
           { data : 'Cliente.Nombre' },
           { data : 'Cliente.Apellido' },
           { data : 'Analista.CedulaRif' },
           { data : 'Analista.Nombre' },
           { data : 'Aseguradora.Nombre' },
           { data : 'Relacionado.Cedula' },
           { data : 'Relacionado.Nombre' },
           { data : 'Relacionado.Apellido' },
           { data : 'Producto.Nombre' },
           { data : 'Productor.RIF' },
           { data : 'Productor.Nombre' },
           { data : 'Moneda.Nombre' },
           { data : 'TipoPoliza.Nombre' },
           { data : 'TipoPago.Nombre' },
           { data : 'EstatusPoliza.Nombre' },
           { data : 'Comision' },
           { data : 'FechaEmision' },
           { data : 'FechaInicio' },
           { data : 'FechaRegistro' },
           { data : 'FechaVencimiento' },
           { data : 'Observacion' },
           { data : 'Deducible' },
           { data : 'SumaAseguradora' },
           { data : 'PrimaAseguradora' }
          
          ,
           { data : 'Activo' }
           ],    
           //Especificaciones de la URL del servicio para cargar la tabla
           "ajax": {
            url: ""+ global + "/Polizas/FechaEmision",
            dataSrc : ''
          }

        });  
      //Al hacer clic en la tabla carga los campos en los TXT


    }

    function GetElementos() {
      jQuery.support.cors = true;
      $.ajax({
        url: ''+ global + '/Polizas',
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
           // Luego de obtener el JSON esta TipoPago lo escribe donde pidamos
  

// ========== TipoPagoES PARA MENSAJE DE CONFIRMACION ================


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
  message: "¿Está seguro de guardar este Color?",
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
        GuardarColor();
      }
          }
      
    }
  
});
     
    }

      function ConfirmModificar() {     
     bootbox.dialog({
  message: "¿Está seguro de modificar este Color?",
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
        ModificarColor();
      }
          }
      
    }
  
});
     
    }

     function ConfirmEliminar() {     
     bootbox.dialog({
  message: "¿Está seguro de Eliminar este Color?",
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
        EliminarColor();
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
        
      }
          }
      
    }
  
});
     
    }
  