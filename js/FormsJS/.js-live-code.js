//=======INICIO DE DOCUMENT READY==============

 //EVENTO CUANDO CARGA TODO EL DOCUMENTO
    window.global = 'http://localhost:60211/api/v1';
    $(document).ready(function() {

    //Al iniciar la ventana, se obtiene el token de parametro
    window.token = getUrlParameter("token");
    //Se envia un post para comprobar el token
    ComprobarAutorizacion(token);
LimpiarCampos();
cargarcomboCampana();
cargarcomboEstatusLlamada();
cargarcomboProceso();
cargarcomboAnimo();


//Validar documento, configurar
$("#form").validate({

  rules: {
   
    Observaciones: {
      required: true,
      minlength: 4,
       maxlength: 255,
       lettersonly: true
    //   ,number: true
    }
   
  }
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
  if ($("#form").valid()) {
    e.preventDefault();
    ConfirmEliminar();
  }
}); 
$('#Limpiar').on("click",function(e) {
  // Cuando hago clic en Eliminar si el form es valido
 
    e.preventDefault();
    LimpiarCampos();
  
});  
$('#txtFecha').datepicker({
 
    format: 'dd/mm/yyyy',
    autoclose: true,
    language: 'es'

}); 


//Cargar DataTable
CargarTabla();

   
  });
    //=========== FIN DEL DOCUMENT READY================

    //======INICIO DE TipoPagoES ============

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
      var table = $("#TablaLlamada").DataTable({
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
           //Especificaciones de las Columnas que vienen y deben mostrarse
           "columns" :  [
            { data : 'Idn' },
            { data : 'Campana.Nombre' },
            { data : 'EstatusLlamada.Nombre' },
            { data : 'Proceso.Nombre' },
            { data : 'Cedula' },
            { data : 'Observaciones' },
            { data : 'Animo.Nombre' },
            { data : 'Fecha' }
            
          ,
           { data : 'Activo' }
           ],    
           //Especificaciones de la URL del servicio para cargar la tabla
           "ajax": {
            url: ""+ global + "/Llamadas",
            dataSrc : ''
          }

        });  
      //Al hacer clic en la tabla carga los campos en los TXT
      $('#TablaLlamada tbody').on( 'click', 'tr', function () {
        
       var Activo = table.row( this ).data().Activo;
        FormatoEstatus(Activo);


            var Idn = table.row( this ).data().Idn;
      var Campana = table.row( this ).data().Campana.Idn;
      var EstatusLlamada = table.row( this ).data().EstatusLlamada.Idn;
      var Proceso = table.row( this ).data().Proceso.Idn;
      var Cedula = table.row( this ).data().Cedula;
      var Observaciones = table.row( this ).data().Observaciones;
      var Animo = table.row( this ).data().Animo.Idn;
      var Fecha = table.row( this ).data().Fecha;
      


  $("#CmbCampana").val(Campana);
     $("#CmbEstatusLlamada").val(EstatusLlamada);
      $("#CmbProceso").val(Proceso);
      $("#CmbAnimo").val(Animo);
     
    document.getElementById("txtCliente").value = Cedula;
     document.getElementById("txtObservaciones").value = Observaciones;
     document.getElementById("txtFecha").value = Fecha;
     document.getElementById("txtIdn").value = Idn;

      } );

    }
    //TipoPago PARA OBTENER ELEMENTOS PARTICULARES DEL SERVICIO

    function GetElementos() {
      jQuery.support.cors = true;
      $.ajax({
        url: ''+ global + '/Llamadas',
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
  

    //Guardar elementos en DataBase
     function GuardarLlamada() {        
      //Capturar datos del formulario
      var IdnCampana =$("#CmbCampana :selected").attr('value');
      var IdnEstatusLlamada = $("#CmbEstatusLlamada :selected").attr('value');
      var Observaciones = document.getElementById("txtObservaciones").value;
      var Cedula = document.getElementById("txtCliente").value;
      var IdnProceso = $("#CmbProceso :selected").attr('value');
      //var IdnCliente = $("#CmbCliente :selected").attr('value');
      var IdnAnimo = $("#CmbAnimo :selected").attr('value');
      var Fecha = document.getElementById("txtFecha").value;
      
      var Idn = document.getElementById("txtIdn").value;

  var Campana= {Idn:IdnCampana}; 
  var EstatusLlamada = {Idn:IdnEstatusLlamada}; 
  var Proceso = {Idn:IdnProceso}; 
  
  var Animo = {Idn:IdnAnimo}; 
      //Agregamos los datos capturados a un arreglo => arr
      var arr = {Fecha:Fecha,Campana:Campana,
                  EstatusLlamada:EstatusLlamada,
                  Proceso:Proceso,
                  Cedula:Cedula,
                  Animo:Animo
                  };
      //Evento ajax para enviar los datos
      $.ajax({
        //Ruta para enviar el servicio
        url: ''+ global + '/Llamada/',
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
            var table = $('#TablaLlamada').dataTable();
                        // Example call to reload from original file
                        table.fnReloadAjax();
                        LimpiarCampos();
                      }


                    });
    }

    function ModificarLlamada() {        

         var IdnCampana =$("#CmbCampana :selected").attr('value');
      var IdnEstatusLlamada = $("#CmbEstatusLlamada :selected").attr('value');
      var Observaciones = document.getElementById("txtObservaciones").value;
      var Cedula = document.getElementById("txtCliente").value;
      var IdnProceso = $("#CmbProceso :selected").attr('value');
      var IdnCliente = $("#CmbCliente :selected").attr('value');
      var IdnAnimo = $("#CmbAnimo :selected").attr('value');
      var Fecha = document.getElementById("txtFecha").value;
      
      var Idn = document.getElementById("txtIdn").value;

  var Campana= {Idn:IdnCampana}; 
  var EstatusLlamada = {Idn:IdnEstatusLlamada}; 
  var Proceso = {Idn:IdnProceso}; 
  
  var Animo = {Idn:IdnAnimo}; 
      //Agregamos los datos capturados a un arreglo => arr
      var arr = {Idn:Idn,Fecha:Fecha,Campana:Campana,
                  EstatusLlamada:EstatusLlamada,
                  Proceso:Proceso,
                  Cedula:Cedula,
                  Animo:Animo
                  };
      //Evento ajax para enviar los datos
      $.ajax({
        //Ruta para enviar el servicio
        url: ''+ global + '/Llamada/',
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
            var table = $('#TablaLlamada').dataTable();
                        // Example call to reload from original file
                        table.fnReloadAjax();
                        LimpiarCampos();
                      }


                    });
    }

    function EliminarLlamada() {     

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
     
     
   // alert(''+ global + '/Bono/'+Idn+'');
      //Evento ajax para enviar los datos
      $.ajax({
        //Ruta para enviar el servicio
        url: ''+ global + '/Llamada/'+Idn+'',
        type: 'DELETE',
        //Enviamos el arreglo ar
        data: JSON.stringify(arr),
        contentType: 'application/json; charset=utf-8',
        async: false,
        //Si todo TipoPagoa bien entra al sucess
        success: function(msg) {
          bootbox.alert("Datos Eliminados", function() {
          
          });
          
          //Actualiza la datatable automáticamente
          var table = $('#TablaLlamada').dataTable();
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
// ========== TipoPagoES PARA MENSAJE DE CONFIRMACION ================
function LimpiarCampos()
{
        var Cedula = document.getElementById("txtCliente").value="";
      var Observaciones = document.getElementById("txtObservaciones").value="";
      var Fecha = document.getElementById("txtFecha").value="";
     
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
  message: "¿Está seguro de guardar este Bono?",
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
        GuardarLlamada();
      }
          }
      
    }
  
});
     
    }

      function ConfirmModificar() {     
     bootbox.dialog({
  message: "¿Está seguro de modificar este Bono?",
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
        ModificarLlamada();
      }
          }
      
    }
  
});
     
    }

     function ConfirmEliminar() {     
     bootbox.dialog({
  message: "¿Está seguro de Eliminar este Bono?",
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
        EliminarLlamada();
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


     function cargarcomboCampana()
    {
       jQuery.support.cors = true;
        $.ajax({
            url: ''+ global + '/Campannas',
            type: 'GET',
            dataType: 'json',            
            success: function (data) {                


               var listItems="";

                for (var i=0; i< data.length; i++)
                {
                  listItems+="<option value='" + data[i].Idn+"'>" + data[i].Nombre + "</option>";

                }
                $("#CmbCampana").html(listItems);
            },
            error: function (x, y, z) {
                alert(x + '\n' + y + '\n' + z);
            }
        }); 
      }

 function cargarcomboEstatusLlamada()
    {
       jQuery.support.cors = true;
        $.ajax({
            url: ''+ global + '/EstatusLlamadas',
            type: 'GET',
            dataType: 'json',            
            success: function (data) {                


               var listItems="";

                for (var i=0; i< data.length; i++)
                {
                  listItems+="<option value='" + data[i].Idn+"'>" + data[i].Nombre + "</option>";

                }
                $("#CmbEstatusLlamada").html(listItems);
            },
            error: function (x, y, z) {
                alert(x + '\n' + y + '\n' + z);
            }
        }); 
      }
       

         function cargarcomboProceso()
    {
       jQuery.support.cors = true;
        $.ajax({
            url: ''+ global + '/Procesos',
            type: 'GET',
            dataType: 'json',            
            success: function (data) {                


               var listItems="";

                for (var i=0; i< data.length; i++)
                {
                  listItems+="<option value='" + data[i].Idn+"'>" + data[i].Nombre + "</option>";

                }
                $("#CmbProceso").html(listItems);
            },
            error: function (x, y, z) {
                alert(x + '\n' + y + '\n' + z);
            }
        }); 
      }      

       function cargarcomboAnimo()
    {
       jQuery.support.cors = true;
        $.ajax({
            url: ''+ global + '/Animos',
            type: 'GET',
console.log(type)
            dataType: 'json',            
            success: function (data) {                


               var listItems="";

                for (var i=0; i< data.length; i++)
                {
                  listItems+="<option value='" + data[i].Idn+"'>" + data[i].Nombre + "</option>";

                }
                $("#CmbAnimo").html(listItems);
            },
            error: function (x, y, z) {
                alert(x + '\n' + y + '\n' + z);
            }
        }); 
      }  

   