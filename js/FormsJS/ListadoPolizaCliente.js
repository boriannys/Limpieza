//=======INICIO DE DOCUMENT READY==============

 //EVENTO CUANDO CARGA TODO EL DOCUMENTO
    window.global = 'http://localhost:60211/api/v1';
    $(document).ready(function() {

    //Al iniciar la ventana, se obtiene el token de parametro
    window.token = getUrlParameter("token");
    //Se envia un post para comprobar el token
    ComprobarAutorizacion(token);
 LimpiarCampos();
 cargarcomboAseguradora();
 cargarcomboAseguradora1();
 cargarcomboProducto(1,1);

$("#form").validate({

  rules: {
    CedulaCliente: {
      minlength: 6,
       maxlength: 8,
       number: true
        //,number: true
    
  },
  CedulaRelacionado: {
      minlength: 6,
       maxlength: 8,
       number: true
        //,number: true
    
  }
}
});

FormatoTabla(); 
$("#cmbAseguradora1").change(function() {
    var idn =$("#cmbAseguradora1 :selected").attr('value');
        cargarcomboProducto(idn);
    });
// BuscarPolizaPorCliente(); 
/* BuscarPolizaPorRelacionado();
 BuscarPolizaPorProducto();
 BuscarPolizaPorAseguradora();*/
});



function FormatoTabla()
    {
      var table = $("#TablaPoliza").DataTable({
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

    function CargarTablaCliente() 
    {

      var ValorCedula =$("#cmbCedulaCliente :selected").attr('value');
  var cedula = document.getElementById("txtCedulaCliente").value ;
          var CedulaRif = ValorCedula + "-" + document.getElementById("txtCedulaCliente").value ;
      
if (cedula== "")
{
bootbox.alert("Debe escribir una Cédula/Rif del Cliente",function() {
               });
}else
{

      var table = $("#TablaPoliza").DataTable({
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
          ,
           { data : 'Activo' }
           ],    
           //Especificaciones de la URL del servicio para cargar la tabla
           "ajax": {
            url: ''+ global + '/Polizas/Cliente/'+CedulaRif+'',
            dataSrc : ''

            
          },

          "language": {
            "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/German.json"
        }
        });  
var table = $('#TablaPoliza').DataTable();
              table.clear().draw();
      }
    }




 function BuscarPorCliente()
      {
        var ValorCedula =$("#cmbCedulaCliente :selected").attr('value');
  var cedula = document.getElementById("txtCedulaCliente").value ;
          var CedulaRif = ValorCedula + "-" + document.getElementById("txtCedulaCliente").value ;
      
if (cedula== "")
{
bootbox.alert("Debe escribir una Cédula/Rif del Cliente",function() {
               });
}else
{
                    jQuery.support.cors = true;
                     $.ajax({
                    url: ''+ global + '/Polizas/Cliente/'+CedulaRif+'',
                    type: 'GET',
                    dataType: 'json',  
                    async: false,

                    statusCode: {
                    404: function (response) {
                    bootbox.alert("Este Cliente no tiene polizas asignadas", function() {
                    var table = $('#TablaPoliza').DataTable();
              table.clear().draw();
                   });

                 }
              },
    
          success: function (msg) { 
                     bootbox.alert("Busqueda Exitosa ", function() {
                         CargarTablaCliente();
        }); 
          }
        })
                   }
                 }

              
    function BuscarPorRelacionado()
  {

      var ValorCedula =$("#cmbCedulaRelacionado :selected").attr('value');
  var cedula = document.getElementById("txtCedulaRelacionado").value ;
          var CedulaRif = ValorCedula + "-" + document.getElementById("txtCedulaRelacionado").value ;

if (cedula== "")
{
bootbox.alert("Debe escribir una Cédula/Rif del Relacionado",function() {
               });
}else
{
                    jQuery.support.cors = true;
                     $.ajax({
                    url: ''+ global + '/Polizas/Relacionado/'+CedulaRif+'',
                    type: 'GET',
                    dataType: 'json',  
                    async: false,

                    statusCode: {
                    404: function (response) {
                    bootbox.alert("Este Relacionado no tiene polizas asignadas", function() {
                     var table = $('#TablaPoliza').DataTable();
              table.clear().draw();
                   });

                 }
              },
    
          success: function (msg) { 
                     bootbox.alert("Busqueda Exitosa ", function() {
                         CargarTablaRelacionado();
        }); 
          }
        })
                   }
                 }
   
function CargarTablaRelacionado() 
    {

      var ValorCedula =$("#cmbCedulaRelacionado :selected").attr('value');
  var cedula = document.getElementById("txtCedulaRelacionado").value ;
          var CedulaRif = ValorCedula + "-" + document.getElementById("txtCedulaRelacionado").value ;

if (cedula== "")
{
bootbox.alert("Debe escribir una Cédula/Rif del Relacionado",function() {
               });
}else
{
      var table = $("#TablaPoliza").DataTable({
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
          ,
           { data : 'Activo' }
           ],    
           //Especificaciones de la URL del servicio para cargar la tabla
           "ajax": {
            url: ''+ global + '/Polizas/Relacionado/'+CedulaRif+'',
            dataSrc : '',
            
          },
          "language": {
            "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/German.json"
        }
        });  
 var table = $('#TablaPoliza').DataTable();
              table.clear().draw();
}
    }



  function BuscarPorProducto()
  {

     var idn =$("#cmbProducto :selected").attr('value');

                    jQuery.support.cors = true;
                     $.ajax({
                    url: ''+ global + '/Polizas/Producto/'+idn+'',
                    type: 'GET',
                    dataType: 'json',  
                    async: false,

                    statusCode: {
                    404: function (response) {
                    bootbox.alert("Este Producto no tiene polizas asignadas", function() {
                     var table = $('#TablaPoliza').DataTable();
              table.clear().draw();
                   });

                 }
              },
    
          success: function (msg) { 
                     bootbox.alert("Busqueda Exitosa ", function() {
                         CargarTablaProducto();
        }); 
          }
        })
                   }
                 

   
function CargarTablaProducto() 
    {

      var idn =$("#cmbProducto :selected").attr('value');

          //var CedulaRif = ValorCedula + "-" + document.getElementById("txtCedulaCliente").value ;
      var table = $("#TablaPoliza").DataTable({
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
          ,
           { data : 'Activo' }
           ],    
           //Especificaciones de la URL del servicio para cargar la tabla
           "ajax": {
            url: ''+ global + '/Polizas/Producto/'+idn+'',
            dataSrc : ''
          },
          "language": {
            "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/German.json"
        }
        });  
var table = $('#TablaPoliza').DataTable();
              table.clear().draw();
    }
   


  function BuscarPorAseguradora()
  {

    var idn =$("#cmbAseguradora :selected").attr('value');

                    jQuery.support.cors = true;
                     $.ajax({
                    url: ''+ global + '/Polizas/Aseguradora/'+idn+'',
                    type: 'GET',
                    dataType: 'json',  
                    async: false,

                    statusCode: {
                    404: function (response) {
                    bootbox.alert("Estea Aseguradora no tiene polizas asignadas", function() {
                     var table = $('#TablaPoliza').DataTable();
              table.clear().draw();
                   });

                 }
              },
    
          success: function (msg) { 
                     bootbox.alert("Busqueda Exitosa ", function() {
                         CargarTablaAseguradora();
        }); 
          }
        })
                   }




    function CargarTablaAseguradora() 
    {

      var idn =$("#cmbAseguradora :selected").attr('value');

         // var CedulaRif = ValorCedula + "-" + document.getElementById("txtCedulaCliente").value ;
      var table = $("#TablaPoliza").DataTable({
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
          ,
           { data : 'Activo' }
           ],    
           //Especificaciones de la URL del servicio para cargar la tabla
           "ajax": {
            url: ''+ global + '/Polizas/Aseguradora/'+idn+'',
            dataSrc : ''
          },
          "language": {
            "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/German.json"
        }
        });  
var table = $('#TablaPoliza').DataTable();
              table.clear().draw();
    }


     function cargarcomboAseguradora1()
    {
       jQuery.support.cors = true;
        $.ajax({
            url: ''+ global + '/AseguradorasActivos',
            type: 'GET',
            dataType: 'json',            
            success: function (data) {                


               var listItems="";

                for (var i=0; i< data.length; i++)
                {
                  listItems+="<option value='" + data[i].Idn+"'>" + data[i].Nombre + "</option>";

                }
                $("#cmbAseguradora1").html(listItems);
            },
            error: function (x, y, z) {
                alert(x + '\n' + y + '\n' + z);
            }
        }); 
      }

function cargarcomboAseguradora()
    {
       jQuery.support.cors = true;
        $.ajax({
            url: ''+ global + '/AseguradorasActivos',
            type: 'GET',
            dataType: 'json',            
            success: function (data) {                


               var listItems="";

                for (var i=0; i< data.length; i++)
                {
                  listItems+="<option value='" + data[i].Idn+"'>" + data[i].Nombre + "</option>";

                }
                $("#cmbAseguradora").html(listItems);
            },
            error: function (x, y, z) {
                alert(x + '\n' + y + '\n' + z);
            }
        }); 
      }
      function cargarcomboProducto(idn,producto)
    {
       jQuery.support.cors = true;
        $.ajax({
            url: ''+ global + '/Productos/Aseguradora/'+idn+'',
            type: 'GET',
            dataType: 'json',            
            success: function (data) {                


               var listItems="";

                for (var i=0; i< data.length; i++)
                {
                  listItems+="<option value='" + data[i].Idn+"'>" + data[i].Nombre + "</option>";

                }
                $("#cmbProducto").html(listItems);
               // $("#cmbProducto").val(producto);
            },
            error: function (x, y, z) {
                alert(x + '\n' + y + '\n' + z);
            }
        }); 
      }

      /*---------------------Boton salir---------------------*/

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
