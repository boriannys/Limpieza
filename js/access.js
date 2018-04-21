    function ComprobarAutorizacion(token)
    {
      
        jQuery.support.cors = true;
        $.ajax({
        url: 'http://localhost:53441/api/ApiAutorizador?Token='+token+'',
        type: 'POST',
        data: JSON.stringify(),
        dataType: 'json',  
        contentType: 'application/json; charset=utf-8',
        async: false,  
              
        success: function (data) {    
         

         if (data.ObjetoRespuesta == null)
          {
            SalidaDelSistema();
            return false;
           
          }            
         
          var user = data.ObjetoRespuesta.UserName;
          if (user != null)
          {
            //Al tener autorizacion se asigna el nombre de usuario en la parte superior
          $('#UserLoged').text(data.ObjetoRespuesta.UserName);
            $('#RolLoged').text(data.ObjetoRespuesta.Rol.Nombre);
              
          var IdnPantallaActual = 1; //Pantalla Actual
          var IdnRolLoged = data.ObjetoRespuesta.Rol.Idn;
          ComprobarFuncionPermitida(IdnRolLoged,IdnPantallaActual)        
          
          }
          else
          {
              SalidaDelSistema();
              return false;
                        }

          
        },
        error: function (x, y, z) {
         alert('Token inválido debes iniciar nuevamente sesión');
        }
      });   
    }
    function SalidaDelSistema()
    {
     
      location.href = 'Error.html';
      return false;
    }
    function Redireccionar(Lugar,token)
    {
           
      location.href = ''+Lugar+'.html?token='+token+'';
      
    }
    function ComprobarFuncionPermitida(IdnRol,IdnPantalla)
    {
    //Agregamos los datos capturados a un arreglo => arr

     var Rol = {Idn:IdnRol};
     var Pantalla = {Idn:IdnPantalla};

     var arr= {Rol:Rol,Pantalla:Pantalla}

        jQuery.support.cors = true;
        $.ajax({
        url: 'http://localhost:60211/api/v1/AccesoPorRolPantalla',
        type: 'POST',
        data: JSON.stringify(arr),
        dataType: 'json',  
        contentType: 'application/json; charset=utf-8',
        async: false,  
        statusCode: {
        409: function (response) 
        {
        bootbox.alert("Este Rol no tiene acceso asignado a esta ventana", function() {
        });
        }
         },
        success: function (data) {  
          $('#FuncionLoged').text(data.Funcion.Nombre+'-'+data.Funcion.Idn);
          var Funcion = data.Funcion.Idn;

          DisposicionDeElementos(Funcion);
        },
        error: function (x, y, z) {
         
         }
      
    });        
    } 

     function DisposicionDeElementos(Funcion)
 {
  

  //FUNCION NULA
  if (Funcion == 7)
  {
    //No puede hacer nada y debe salir
  $("#Guardar").hide();  $("#Modificar").hide();
  $("#Reactivar").hide();  $("#Eliminar").hide();
  bootbox.alert("Acceso no permitido", function() {
    SalidaDelSistema();
        });
  }
  //FUNCION MINIMA
  else if (Funcion == 6)
  {
  //NO puede hacer nada solo ver
  $("#Guardar").hide();  $("#Modificar").hide();
  $("#Reactivar").hide();  $("#Eliminar").hide();
  }
  //FUNCION BAJA
  else if (Funcion == 5)
  {
    //Solo puede guardar
  $("#Guardar").show();  $("#Modificar").hide();
  $("#Reactivar").hide();  $("#Eliminar").hide();
  }
  //FUNCION MEDIA
  else if (Funcion == 4)
  {
    //Solo puede guardar y modificar
  $("#Guardar").show();  $("#Modificar").show();
  $("#Reactivar").hide();  $("#Eliminar").hide();
  }
  //FUNCION ALTA
  else if (Funcion ==4)
  {
    //Puede guardar modificar y eliminar
  $("#Guardar").show();  $("#Modificar").show();
  $("#Reactivar").hide();  $("#Eliminar").show();
  }
  //FUNCION PERSONALIZADA
  else if (Funcion == 3)
  {

  DisposicionPersonalizada();
  }
  //FUNCION ADMINISTRADOR
  else if (Funcion == 2)
  {
    //Puede guardar, modificar, eliminar, reactivar
  $("#Guardar").show();  $("#Modificar").show();
  $("#Reactivar").show();  $("#Eliminar").show();
  }
  //FUNCION ROOT
  else if (Funcion == 1)
  {
    //Funcion completa al igual que el administrador
 $("#Guardar").show();  $("#Modificar").show();
  $("#Reactivar").show();  $("#Eliminar").show();
  }  
}


 function ComprobarAutorizacionTree(token)
    {
      
        jQuery.support.cors = true;
        $.ajax({
        url: 'http://localhost:53441/api/ApiAutorizador?Token='+token+'',
        type: 'POST',
        data: JSON.stringify(),
        dataType: 'json',  
        contentType: 'application/json; charset=utf-8',
        async: false,  
              
        success: function (data) {    
         

         if (data.ObjetoRespuesta == null)
          {
            SalidaDelSistema();
            return false;
           
          }            
         
          var user = data.ObjetoRespuesta.UserName;
          if (user != null)
          {
            //Al tener autorizacion se asigna el nombre de usuario en la parte superior
          $('#UserLoged').text(data.ObjetoRespuesta.UserName);
          var IdnPantallaActual = 1; //Pantalla Actual
          var IdnRolLoged = data.ObjetoRespuesta.Rol.Idn;
          ComprobarFuncionPermitidaTree(IdnRolLoged,IdnPantallaActual)        
          
          }
          else
          {
              SalidaDelSistema();
              return false;
                        }

          
        },
        error: function (x, y, z) {
         alert('Token inválido debes iniciar nuevamente sesión');
        }
      });   
    }
    function SalidaDelSistema()
    {
     
      location.href = 'Error.html';
      return false;
    }
    function Redireccionar(Lugar,token)
    {
           
      location.href = ''+Lugar+'.html?token='+token+'';
      
    }
    function ComprobarFuncionPermitidaTree(IdnRol,IdnPantalla)
    {
    //Agregamos los datos capturados a un arreglo => arr

     var Rol = {Idn:IdnRol};
     var Pantalla = {Idn:IdnPantalla};

     var arr= {Rol:Rol,Pantalla:Pantalla}

        jQuery.support.cors = true;
        $.ajax({
        url: 'http://localhost:60211/api/v1/AccesoPorRolPantalla',
        type: 'POST',
        data: JSON.stringify(arr),
        dataType: 'json',  
        contentType: 'application/json; charset=utf-8',
        async: false,  
        statusCode: {
        409: function (response) 
        {
        bootbox.alert("Este Rol no tiene acceso asignado a esta ventana", function() {
        });
        }
         },
        success: function (data) {  
         
          var Funcion = data.Funcion.Idn;

          DisposicionDeElementosTree(Funcion);
        },
        error: function (x, y, z) {
         
         }
      
    });        
    } 

     function DisposicionDeElementosTree(Funcion)
 {
  

  //FUNCION NULA
  if (Funcion <= 7 && Funcion > 2)
  {
     DeshabilitarMaestros();
  }
  
  //FUNCION ADMINISTRADOR
  else if (Funcion == 2)
  {
   
  }
   else if (Funcion == 1)
  {
   
  }  

  }

  function DeshabilitarMaestros()

{
 $("#Acceso").hide();               $("#Llamada").hide();        
  $("#Accesorio").hide();               $("#Marca").hide();
    $("#AccesorioVehiculo").hide();       $("#Modelo").hide();
    $("#ActividadEconomica").hide();    $("#Moneda").hide();
    $("#Analista").hide();             $("#Municipio").hide();
    $("#Animo").hide();                  $("#Oficina").hide();
    $("#Anulacion").hide();             $("#OtrosBienes").hide();
    $("#Aseguradora").hide();            $("#Pantalla").hide();
    $("#AsistenciaMedica").hide();         $("#Parentesco").hide();
    $("#AsistenciaReparacion").hide();    $("#Parroquia").hide();
    $("#AsistenciaTraslado").hide();        $("#Poliza").hide();
    $("#Avion").hide();                     $("#Pregunta").hide();
    $("#Banco").hide();                    $("#Proceso").hide();
    $("#Barco").hide();                   $("#Producto").hide(); 
    $("#Beneficiario").hide();           $("#Productor").hide();
    //$("#Bienvenida").hide();          
    $("#Bono").hide();                  $("#Profesion").hide();
    $("#Campanna").hide();              $("#Promotor").hide();
    //copiaincidente             
    $("#CausaIncidente").hide();          $("#Ramo").hide();
    $("#CentroClinica").hide();          $("#RamoAsegurdora").hide();
    $("#Ciudades").hide();               $("#RamoPoliza").hide();
    $("#Cliente").hide();                $("#Recibo").hide();
    $("#Color").hide();                  $("#RegistroPago").hide();
    $("#Cuenta").hide();                $("#Relacionado").hide();
    $("#DetallePoliza").hide();         $("#Respuesta").hide();
    //error             
    $("#Estado").hide();                 $("#RiesgoProducto").hide();
    $("#EstadoCivil").hide();              $("#Riesgos").hide();
    $("#EstatusLaboral").hide();            $("#Rol").hide();
    $("#EstatusLlamada").hide();            $("#SolicitudPolizaVehiculo").hide();
    //etapa 5 y 6
    $("#Extranet").hide();                $("#SucursalAseguradora").hide();
    $("#Financiadora").hide();            $("#Taller").hide();
    $("#Financiamiento").hide();           $("#TipoBono").hide();
    $("#FormaPago").hide();               $("#TipoEjecutivo").hide();
    $("#Funcion").hide();                 $("#TipoPago").hide();
    $("#Grua").hide();                    $("#TipoPoliza").hide();
    $("#Grupo").hide();                     $("#TipoRelacionado").hide();
    $("#GrupoCliente").hide();               $("#TipoReparacion").hide();
    $("#Incidente").hide();               $("#TipoTransporte").hide();
    $("#Inmueble").hide();                    $("#TipoVehiculo").hide();
    $("#ValidarEstado").hide();                $("#UsoVehiculo").hide();
                                            $("#Vehiculo").hide();
                                            $("#Usuario").hide();
}