
//=======INICIO DE DOCUMENT READY==============

 //EVENTO CUANDO CARGA TODO EL DOCUMENTO
    window.global = 'http://localhost:60211/api/v1';
    $(document).ready(function() {

    //Al iniciar la ventana, se obtiene el token de parametro
    //window.token = getUrlParameter("token");
    //Se envia un post para comprobar el token
  //  ComprobarAutorizacion(token);
LimpiarCampos();
DeshabilitarCampos();
cargarcomboCargos();
       FormatoEstatus(2);
//Validar documento, configurar
$("#form").validate({

  rules: {
    Cedula: {
      required: true,
      minlength: 6,
       maxlength: 8,
       lettersonly: false,
        number: true
    },
    Nombres: {
      required: true,
      minlength: 4,
       maxlength: 50,
       lettersonly: true
        //,number: true
    },
    Apellidos:{
      required: true,
      minlength: 2,
       maxlength: 30,
       lettersonly: true
    //   ,number: true
    },
        Email:{
      required:false,
      minlength: 5,
       email: true
       //lettersonly: true
       
    },
    Telefono:{
       required: true,
      minlength: 11,
       maxlength: 11,
       //lettersonly: true
        number: true
    },
     Direccion:{
      required:false,
      minlength: 5
       //lettersonly: true
       
    },

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
     var Nombre = document.getElementById("txtNombres").value;
  if (Nombre=="")
  {
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
 
    e.preventDefault();
    LimpiarCampos();
  
});  

    $('#Salir').on("click",function(e) {
  // Cuando hago clic en Eliminar si el form es valido
  e.preventDefault();
        ConfirmSalir();
});
//Cargar DataTable
CargarTabla();

   
  });
    //=========== FIN DEL DOCUMENT READY================

    //======INICIO DE AnalistaES ============

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
      var table = $("#TablaEmpleado").DataTable({
         //Especificacion de Ancho y Alto de la tabla
         "rowCallback": function( row, data, index ) {
             if ( data.Activo == "1" ) 
            {
            $('td:eq(10)', row).html( '<b>Activo</b>' );
            $('td:eq(10)', row).css('background-color', '#98FEE6');
            }
            else
            {
            $('td:eq(10)', row).html( '<b>Inactivo</b>' );
            $('td:eq(10)', row).css('background-color', '#FEE698');
            }
            $('td:eq(0)', row).css('background-color', '#ECECEC');
          },
        "scrollY":        "200px",
        "scrollX":        "800px",
           //Especificaciones de las Columnas que vienen y deben mostrarse
           "columns" : [
           { data : 'Idn' },
            { data : 'CedulaRif' },
            { data : 'Nombre' },
            { data : 'Apellido' },
            { data : 'Sexo' },
            { data : 'Email' },
             { data : 'Telefono' },
            { data : 'Direccion' },
            { data : 'Turno' },
             { data : 'GCargo.Nombre' },
           { data : 'Activo' }
           ],    
           //Especificaciones de la URL del servicio para cargar la tabla
           "ajax": {
            url: ""+ global + "/GEmpleados",
            dataSrc : ''
          }

        });  
      //Al hacer clic en la tabla carga los campos en los TXT
      $('#TablaEmpleado tbody').on( 'click', 'tr', function () {
        
       var Activo = table.row( this ).data().Activo;
        FormatoEstatus(Activo);


      var Idn = table.row( this ).data().Idn;
      var CedulaRif = table.row( this ).data().CedulaRif;
      var Nombre = table.row( this ).data().Nombre;
      var Apellido = table.row( this ).data().Apellido;
      var Sexo = table.row( this ).data().Sexo;
      var Email = table.row( this ).data().Email;
      var Telefono = table.row( this ).data().Telefono;
          var Direccion = table.row( this ).data().Direccion;
           var  Cargo = table.row( this ).data().GCargo.Idn;
              var Turno = table.row( this ).data().Turno;

      $("#cmbSexo").val(Sexo.toUpperCase());
            $("#cmbTurno").val(Turno.toUpperCase());

  $("#CmbCargo").val(Cargo);
 var tipo = CedulaRif.substring(0,1)
    
    //Quitar los dos primeros caracteres de un string
    var ced = CedulaRif.substr(2);

      document.getElementById("txtCedula").value = ced;
      document.getElementById("txtNombres").value = Nombre;
      document.getElementById("txtApellidos").value = Apellido;
      document.getElementById("txtEmail").value = Email;
      document.getElementById("txtTelefono").value = Telefono;
        document.getElementById("txtDireccion").value = Direccion;
      document.getElementById("txtIdn").value= Idn;
 $("#cmbCedula").val(tipo);
      document.getElementById("txtCedula").disabled=true;
              document.getElementById("cmbCedula").disabled=true;
              HabilitarCampos();
      });

    }

    
    //Analista PARA OBTENER ELEMENTOS PARTICULARES DEL SERVICIO

    function GetElementos() {
      jQuery.support.cors = true;
      $.ajax({
        url: ''+ global + '/GEmpleados',
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
           // Luego de obtener el JSON esta Analista lo escribe donde pidamos
  


 function BuscarEmpleadoPorCedulaRif()
      {
          var ValorCedula =$("#cmbCedula :selected").attr('value');

          var CedulaRif = ValorCedula + "-" + document.getElementById("txtCedula").value ;
          var cedula = document.getElementById("txtCedula").value;
            if (cedula == "")
              {
                bootbox.alert("Debe escribir una Cédula/Rif del Empleado",function() {
               });
                  }else{
                     if ( document.getElementById("txtCedula").disabled==true)
                        {
                          bootbox.alert("En estos momentos esta cargada la información de esta Cédula/Rif",function() {
                       });
                  }else{
                    jQuery.support.cors = true;
                     $.ajax({
                    url: ''+ global + '/GEmpleados/Existe/'+CedulaRif+'',
                    type: 'GET',
                    dataType: 'json',  
                    async: false,

           statusCode: {
                    404: function (response) {
                    bootbox.alert("Este Empleado no ha sido registrado", function() {
                    //document.getElementById("txtCedula").disabled=true;
                    //document.getElementById("cmbCedula").disabled=true;
              // var Cedula =  document.getElementById("txtCodigoBeneficiario").value="";
          //DeshabilitarCampos();

                   HabilitarCampos();
                   });

                 }
              },
    

          success: function (data) {    bootbox.dialog({
                    message: "¿Este Empleado ya existe, desea Modificar sus datos?",
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
                   var apellido = data.Apellido;
                   var telefono = data.Telefono;
                   var sexo = data.Sexo;
                   var Email = data.Email;
                   var Direccion = data.Direccion;
                   var Turno = data.Turno;
                   var Cargo = data.GCargo.Idn;

                   document.getElementById("txtNombres").value = Nombre;
                   document.getElementById("txtApellidos").value = apellido;
                   document.getElementById("txtTelefono").value = telefono;
                    document.getElementById("txtDireccion").value = Direccion;
                   document.getElementById("cmbSexo").value = sexo;
                   document.getElementById("cmbTurno").value = Turno;
                   document.getElementById("txtEmail").value = Email;
                   document.getElementById("txtIdn").value = Idn;
                   $("#CmbCargo").val(Cargo);
                  
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




    //Guardar elementos en DataBase
     function GuardarEmpleado() {        
      //Capturar datos del formulario
          var ValorCedula =$("#cmbCedula :selected").attr('value');
          var CedulaRif = ValorCedula + "-" + document.getElementById("txtCedula").value ;
          var Nombre = document.getElementById("txtNombres").value;
          var Apellido = document.getElementById("txtApellidos").value;
          var Telefono = document.getElementById("txtTelefono").value;
           var Direccion = document.getElementById("txtDireccion").value;
          var  Sexo = $("#cmbSexo :selected").attr('value');
           var  Turno = $("#cmbTurno :selected").attr('value');
           var IdnCargo = $("#CmbCargo :selected").attr('value');
          var Email = document.getElementById("txtEmail").value;

        var GCargo={Idn:IdnCargo};
      //Agregamos los datos capturados a un arreglo => arr
    
      var arr = { CedulaRif:CedulaRif,Nombre:Nombre,Apellido:Apellido,Sexo:Sexo,Email:Email,
                  Telefono:Telefono,Direccion:Direccion,Turno:Turno,GCargo:GCargo
                  };
      //Evento ajax para enviar los datos
      $.ajax({
        //Ruta para enviar el servicio
        url: ''+ global + '/GEmpleado/',
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
           DeshabilitarCampos();
              document.getElementById("txtCedula").disabled=false;
              document.getElementById("cmbCedula").disabled=false;
        });
             // e.preventDefault();
            //Actualiza la datatable automáticamente
            var table = $('#TablaEmpleado').dataTable();
                        // Example call to reload from original file
                        table.fnReloadAjax();
                       LimpiarCampos();
                      }


                    });
    }

    function ModificarEmpleado() {        
           var Idn = document.getElementById("txtIdn").value;
           var ValorCedula =$("#cmbCedula :selected").attr('value');
           var CedulaRif = ValorCedula + "-" + document.getElementById("txtCedula").value ;
           var Nombre = document.getElementById("txtNombres").value;
           var Apellido = document.getElementById("txtApellidos").value;
           var Telefono = document.getElementById("txtTelefono").value;
             var Direccion = document.getElementById("txtDireccion").value;
           var Sexo = $("#cmbSexo :selected").attr('value');
            var  Turno = $("#cmbTurno :selected").attr('value');
              var IdnCargo = $("#CmbCargo :selected").attr('value');
           var Email = document.getElementById("txtEmail").value;
           var GCargo={Idn:IdnCargo};
      //Agregamos los datos capturados a un arreglo => arr

      var arr = { Idn:Idn,CedulaRif:CedulaRif,Nombre:Nombre,Apellido:Apellido,Sexo:Sexo,Email:Email,
                  Telefono:Telefono,Direccion:Direccion,Turno:Turno,GCargo:GCargo};
    
      
      //Evento ajax para enviar los datos
      $.ajax({
        //Ruta para enviar el servicio
        url: ''+ global + '/GEmpleado/',
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
       success: function(msg) 
       {
        bootbox.alert("Datos Modificados Correctamente", function() {
           DeshabilitarCampos();
              document.getElementById("txtCedula").disabled=false;
              document.getElementById("cmbCedula").disabled=false;
        }); 
             // e.preventDefault();
            //Actualiza la datatable automáticamente
            var table = $('#TablaEmpleado').dataTable();
                        // Example call to reload from original file
                     table.fnReloadAjax();
                        LimpiarCampos();
      }
     });
    }

    function EliminarEmpleado() {        

       var Idn = document.getElementById("txtIdn").value;
       
       var arr = {Idn:Idn};
      //Agregamos los datos capturados a un arreglo => arr
     // alert(''+ global + '/Analista/'+Idn+'');
      //Evento ajax para enviar los datos
      $.ajax({
        //Ruta para enviar el servicio
        url: ''+ global + '/GEmpleado/'+Idn+'',
        type: 'DELETE',
        //Enviamos el arreglo ar
        data: JSON.stringify(arr),
        contentType: 'application/json; charset=utf-8',
        async: false,
        //Si todo Analistaa bien entra al sucess
        success: function(msg) {
          bootbox.alert("Datos Eliminados", function() {
             DeshabilitarCampos();
              document.getElementById("txtCedula").disabled=false;
              document.getElementById("cmbCedula").disabled=false;
          
          });
          
          //Actualiza la datatable automáticamente
          var table = $('#TablaEmpleado').dataTable();
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

// ========== FuncionesES PARA MENSAJE DE CONFIRMACION ================
function LimpiarCampos()
{
          var CedulaRif = document.getElementById("txtCedula").value="";
          var Nombre = document.getElementById("txtNombres").value="";
          var Apellido = document.getElementById("txtApellidos").value="";
          var Telefono = document.getElementById("txtTelefono").value="";
           var Direccion = document.getElementById("txtDireccion").value="";
          var Email = document.getElementById("txtEmail").value="";
    var codCedula = document.getElementById("cmbCedula").value="V";
    
     var sexo = document.getElementById("cmbSexo").value="M";
     var Turno = document.getElementById("cmbTurno").value="M";
    FormatoEstatus(2);
   
}

function FormatoInicial()
{
      LimpiarCampos();
DeshabilitarCampos();
  
     //var CedulaRif = document.getElementById("txtCedula").value;
    //if(CedulaRif==""){DeshabilitarCampos();}else{HabilitarCampos();}
 
}

function HabilitarCampos()
{
        var CedulaRif = document.getElementById("txtCedula").disabled=true ;
    
    var CodCedula = document.getElementById("cmbCedula").disabled=true ;
    
          var Nombre = document.getElementById("txtNombres").disabled=false ;
          var Apellido = document.getElementById("txtApellidos").disabled=false ;
          var Sexo = document.getElementById("cmbSexo").disabled=false ;
           var Turno = document.getElementById("cmbTurno").disabled=false ;
          var Email = document.getElementById("txtEmail").disabled=false ;
          var Direccion = document.getElementById("txtDireccion").disabled=false ;
          var Telefono = document.getElementById("txtTelefono").disabled=false ;
           var Cargo = document.getElementById("CmbCargo").disabled=false ;
  }

function DeshabilitarCampos()
{
    
      var CedulaRif = document.getElementById("txtCedula").disabled=false;
    
    var CodCedula = document.getElementById("cmbCedula").disabled=false ;
          var Nombre = document.getElementById("txtNombres").disabled=true ;
          var Apellido = document.getElementById("txtApellidos").disabled=true ;
          var Sexo = document.getElementById("cmbSexo").disabled=true ;
          var Turno = document.getElementById("cmbTurno").disabled=true ;
          var Email = document.getElementById("txtEmail").disabled=true ;
          var Direccion = document.getElementById("txtDireccion").disabled=true ;
          var Telefono = document.getElementById("txtTelefono").disabled=true ;
           var Cargo = document.getElementById("CmbCargo").disabled=true ;
  }

       function ReactivarEmpleado() {        

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
        url:'http://localhost:60211/api/v1/GEmpleado/'+Idn+'',
        type: 'PUT',
        //Enviamos el arreglo ar
        data: JSON.stringify(arr),
        contentType: 'application/json; charset=utf-8',
        async: false,
        //Si todo Pantallaa bien entra al sucess
        success: function(msg) {
          bootbox.alert("Elemento Reactivado correctamente", function() {
          DeshabilitarCampos();

        var CedulaRif = document.getElementById("txtCedula").disabled=false ;
    
    var CodCedula = document.getElementById("cmbCedula").disabled=false ;

          });
          
          //Actualiza la datatable automáticamente
          var table = $('#TablaEmpleado').dataTable();
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
        ReactivarEmpleado();
      }
          }
      
    }
  
});
     
    }

  function ConfirmGuardar() {     

      var Nombre = document.getElementById("txtNombres").value;
        if (Nombre == "")
            {
                bootbox.alert("Debe dar click en el boton buscar ",function() {
             });
           }else{ 
     bootbox.dialog({
  message: "¿Está seguro de guardar este Empleado?",
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
        GuardarEmpleado();
      }
          }
      
    }
  
});
     }
    }

      function ConfirmModificar() {   

      var Nombre = document.getElementById("txtNombres").value;
        if (Nombre == "")
            {
                bootbox.alert("Debe dar click en el boton buscar ",function() {
             });
           }else{   
     bootbox.dialog({
  message: "¿Está seguro de modificar este Empleado?",
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
        ModificarEmpleado();
      }
          }
      
    }
  
});
     }
    }

     function ConfirmEliminar() {     
     bootbox.dialog({
  message: "¿Está seguro de Eliminar este Empleado?",
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
        EliminarEmpleado();
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
      callback: function (){
        
        bootbox.hideAll();
         window.location.href = 'Bienvenida.html?token='+token+'';
         
        
      }
          }
      
    }
  
});
     
    }
//============FIN DE LAS AnalistaES============

 function cargarcomboCargos()
    {
       jQuery.support.cors = true;
        $.ajax({
            url: ''+ global + '/GCargosActivos',
            type: 'GET',
            dataType: 'json',            
            success: function (data) {                


               var listItems="";

                for (var i=0; i< data.length; i++)
                {
                  listItems+="<option value='" + data[i].Idn+"'>" + data[i].Nombre + "</option>";

                }
                $("#CmbCargo").html(listItems);
            },
            error: function (x, y, z) {
                alert(x + '\n' + y + '\n' + z);
            }
        }); 
      }

