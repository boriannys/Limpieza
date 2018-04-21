  window.global = 'http://localhost:60211/api/v1';
    $(document).ready(function() {

    //Al iniciar la ventana, se obtiene el token de parametro
   // window.token = getUrlParameter("token");
    //Se envia un post para comprobar el token
   // ComprobarAutorizacion(token);
cargarcomboMotivo();
LimpiarCampos();
//Validar documento, configurar
$("#form").validate({

  rules: {
   Cedula: {
       required: true,
       minlength: 6,
       maxlength: 8,
       number: true
    

     },
    
    Descripcion: {
      required: true,
      minlength: 4,
       maxlength: 150,
      
    //   ,number: true
    },
     FechaPerm:
    {
       required: true
    },
     FechaVenc:
    {
       required: true
    }


  }
 
})


$('#txtFechaVenc').datepicker({
 
    format: 'yyyy/mm/dd',
    autoclose: true,
    language: 'es'


});
$('#txtFechaPerm').datepicker({
 
    format: 'yyyy/mm/dd',
    autoclose: true,
    language: 'es'


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

    /* function getUrlParameter(sParam) {
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
};*/
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
      var table = $("#TablaPermiso").DataTable({
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
           { data : 'GEmpleado.CedulaRif' },
           { data : 'GMotivo.Nombre'},
           { data : 'Descripcion' },
           { data : 'FechaPermiso'},
           { data : 'FechaVencimiento'},
           { data : 'Activo' }
           ],    
           //Especificaciones de la URL del servicio para cargar la tabla
           "ajax": {
            url: ""+ global + "/GPermisos",
            dataSrc : ''
          }

        });  
      //Al hacer clic en la tabla carga los campos en los TXT
      $('#TablaPermiso tbody').on( 'click', 'tr', function () {
        
       var Activo = table.row( this ).data().Activo;
        FormatoEstatus(Activo);


        var Cedula = table.row( this ).data().GEmpleado.CedulaRif;
        var Descripcion = table.row( this ).data().Descripcion;
        var FechaPermiso = table.row( this ).data().FechaPermiso;
        var FechaVencimiento = table.row( this ).data().FechaVencimiento;
        var Idn = table.row( this ).data().Idn;
        var Nombre = table.row( this ).data().GEmpleado.Nombre;
        var Apellido = table.row( this ).data().GEmpleado.Apellido;
        //var Motivo = table.row( this ).data().GMotivo.Nombre;

        var tipo = Cedula.substring(0,1)
        var ced = Cedula.substr(2);

        document.getElementById("txtCedula").value = ced;
        document.getElementById("txtDescripcion").value = Descripcion;
        document.getElementById("txtFechaPerm").value = FechaPermiso;
        document.getElementById("txtFechaVenc").value = FechaVencimiento;
        document.getElementById("txtIdn").value = Idn;
        document.getElementById("txtNombres").value = Nombre;
        document.getElementById("txtApellidos").value = Apellido;
          HabilitarCampos();
           document.getElementById("txtCedula").disabled=true;
                   document.getElementById("cmbCedula").disabled=true;
           //$("#cmbMotivoPermiso").val(Motivo);
           $("#cmbCedula").val(tipo);
      } );

    }
    //FUNCION PARA OBTENER ELEMENTOS PARTICULARES DEL SERVICIO

    function GetElementos() {
      jQuery.support.cors = true;
      $.ajax({
        url: ''+ global + '/GPermisos',
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

   function CargarDatosEmpleado(data)
{


                   document.getElementById("txtCedula").disabled=true;
                   document.getElementById("cmbCedula").disabled=true;

                   HabilitarCampos();
                   var Idn = data.Idn;
                
                   var NombreEmpleado= data.Nombre;
                   var apellido = data.Apellido;
                   
                  
                   document.getElementById("txtNombres").value = NombreEmpleado;
                   document.getElementById("txtApellidos").value = apellido;
                  
                   document.getElementById("txtIdn").value = Idn;
                
                  
}


function BuscarEmpleadoPorCedula()
{
          var ValorCedula =$("#cmbCedula :selected").attr('value');

          var CedulaRif = ValorCedula + "-" + document.getElementById("txtCedula").value ;
          var cedula = document.getElementById("txtCedula").value;
            if (cedula == "")
              {
                bootbox.alert("Debe escribir una Cédula/Rif del Empleado",function() {
               });
                  }
                  else
                  {
                     if ( document.getElementById("txtCedula").disabled==true)
                        {
                          bootbox.alert("En estos momentos esta cargada la información de esta Cédula/Rif",function() {
                       });
                  }
                  else
                  {
                    jQuery.support.cors = true;
                     $.ajax({
                    url: ''+ global + '/GEmpleados/Existe/'+CedulaRif+'',
                    type: 'GET',
                    dataType: 'json',  
                    async: false,

           statusCode: {
                    404: function (response) {
                    bootbox.alert("Este Empleado no ha sido registrado", function() {
                   

                   
                   });

                 }
              },
    

          success: function (data) { 
                    bootbox.hideAll();
                   //document.getElementById("txtCedula").disabled=true;
                   //document.getElementById("cmbCedula").disabled=true;

                   HabilitarCampos();
                   var Idn = data.Idn;
                   var Nombre = data.Nombre;
                   var Apellido = data.Apellido;
                 

                   document.getElementById("txtNombres").value = Nombre;
                   document.getElementById("txtApellidos").value = Apellido;
                 
                  

                                }
            
                              });
              }

}

}
function HabilitarCampos()
{
        var Cedula = document.getElementById("txtCedula").disabled=true ;   
         var ValorCedula = document.getElementById("cmbCedula").disabled=true ;  
          var Nombre = document.getElementById("txtNombres").disabled=false ;
          var Apellido = document.getElementById("txtApellidos").disabled=false ;
          var Motivo = document.getElementById("cmbMotivoPermiso").disabled=false ;
           var Descripcion = document.getElementById("txtDescripcion").disabled=false ;
          var FechaPermiso = document.getElementById("txtFechaPerm").disabled=false ;
            var FechaVencimiento = document.getElementById("txtFechaVenc").disabled=false ;
         
  }

function DeshabilitarCampos()
{
        var Cedula = document.getElementById("txtCedula").disabled=false ; 
        var ValorCedula = document.getElementById("cmbCedula").disabled=false ;  
          var Nombre = document.getElementById("txtNombres").disabled=true ;
          var Apellido = document.getElementById("txtApellidos").disabled=true ;
          var Motivo = document.getElementById("cmbMotivoPermiso").disabled=true ;
           var Descripcion = document.getElementById("txtDescripcion").disabled=true ;
          var FechaPermiso = document.getElementById("txtFechaPerm").disabled=true ;
            var FechaVencimiento = document.getElementById("txtFechaVenc").disabled=true ;
  }
     function GuardarPermiso() {        
      //Capturar datos del formulario
     // var Cedula = document.getElementById("txtCedula").value;
      var Descripcion = document.getElementById("txtDescripcion").value;
      var FechaPermiso = document.getElementById("txtFechaPerm").value;
      var FechaVencimiento = document.getElementById("txtFechaVenc").value;
      var ValorCedula =$("#cmbCedula :selected").attr('value');
      var IdnMotivo = $("#cmbMotivoPermiso :selected").attr('value');
      var CedulaEmpleado = ValorCedula + "-" + document.getElementById("txtCedula").value ;
      var GEmpleado = {CedulaRif:CedulaEmpleado};
      var GMotivo = {Idn:IdnMotivo};
      //Agregamos los datos capturados a un arreglo => arr
      var arr = {GEmpleado:GEmpleado, GMotivo:GMotivo ,Descripcion:Descripcion, FechaPermiso:FechaPermiso, FechaVencimiento:FechaVencimiento };
      //Evento ajax para enviar los datos
      $.ajax({
        //Ruta para enviar el servicio
        url: ''+ global + '/GPermiso',
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
            var table = $('#TablaPermiso').dataTable();
                        // Example call to reload from original file
                        table.fnReloadAjax();
                        LimpiarCampos();
                      }


                    });
    }
    

    function ModificarPermiso() {        

      var Descripcion = document.getElementById("txtDescripcion").value;
      var FechaPermiso = document.getElementById("txtFechaPerm").value;
      var FechaVencimiento = document.getElementById("txtFechaVenc").value;
      var ValorCedula =$("#cmbCedula :selected").attr('value');
      var IdnMotivo = $("#cmbMotivoPermiso :selected").attr('value');
     
      var CedulaEmpleado = ValorCedula + "-" + document.getElementById("txtCedula").value;
      var Idn = document.getElementById("txtIdn").value;
        var GEmpleado = {CedulaRif:CedulaEmpleado};
      var GMotivo = {Idn:IdnMotivo};
      //Agregamos los datos capturados a un arreglo => arr
      var arr = { Idn:Idn,GEmpleado:GEmpleado, GMotivo:GMotivo ,Descripcion:Descripcion, FechaPermiso:FechaPermiso, FechaVencimiento:FechaVencimiento};
      
      //Evento ajax para enviar los datos
      $.ajax({
        //Ruta para enviar el servicio
        url: ''+ global + '/GPermiso/',
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
            var table = $('#TablaPermiso').dataTable();
                        // Example call to reload from original file
                        table.fnReloadAjax();
                        LimpiarCampos();
                      }


                    });
    }

    function EliminarPermiso() {        

     var Descripcion = document.getElementById("txtDescripcion").value;
      var FechaPermiso = document.getElementById("txtFechaPerm").value;
      var FechaVencimiento = document.getElementById("txtFechaVenc").value;
      var ValorCedula =$("#cmbCedula :selected").attr('value');
      var Motivo = $("#cmbMotivoPermiso :selected").attr('value');
      var CedulaEmpleado = ValorCedula + "-" + document.getElementById("txtCedula").value;
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
      var arr = {Idn:Idn,CedulaEmpleado:CedulaEmpleado, Motivo:Motivo ,Descripcion:Descripcion, FechaPermiso:FechaPermiso, FechaVencimiento:FechaVencimiento};
      
      //Evento ajax para enviar los datos
      $.ajax({
        //Ruta para enviar el servicio
        url: ''+ global + '/GPermiso/'+Idn+'',
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
          var table = $('#TablaFuncion').dataTable();
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

var cedula = document.getElementById("txtCedula").value="" ;
     var Nombre = document.getElementById("txtNombres").value="" ;
          var Apellido = document.getElementById("txtApellidos").value="" ;
         // var Motivo = document.getElementById("cmbMotivoPermiso").value="" ;
           var Descripcion = document.getElementById("txtDescripcion").value="" ;
          var FechaPermiso = document.getElementById("txtFechaPerm").value="" ;
            var FechaVencimiento = document.getElementById("txtFechaVenc").value="" ;
      FormatoEstatus(2);
      DeshabilitarCampos();

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
        url:'http://localhost:60211/api/v1/GPermiso/'+Idn+'',
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
          var table = $('#TablaPermiso').dataTable();
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
  message: "¿Está seguro de guardar esta Función?",
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
        GuardarPermiso();
      }
          }
      
    }
  
});
     
    }

      function ConfirmModificar() {     
     bootbox.dialog({
  message: "¿Está seguro de modificar esta función?",
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
        ModificarPermiso();
      }
          }
      
    }
  
});
     
    }

     function ConfirmEliminar() {     
     bootbox.dialog({
  message: "¿Está seguro de Eliminar esta Función?",
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
        EliminarPermiso();
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
    function cargarcomboMotivo()
    {
       jQuery.support.cors = true;
        $.ajax({
            url: ''+ global + '/GMotivosActivos',
            type: 'GET',
            dataType: 'json',            
            success: function (data) {                


               var listItems="";

                for (var i=0; i< data.length; i++)
                {
                  listItems+="<option value='" + data[i].Idn+"'>" + data[i].Nombre + "</option>";

                }
                $("#cmbMotivoPermiso").html(listItems);
            },
            error: function (x, y, z) {
                alert(x + '\n' + y + '\n' + z);
            }
            });
    }

//============FIN DE LAS FUNCIONES============