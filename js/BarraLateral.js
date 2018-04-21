    $(document).ready(function() {

    //Al iniciar la ventana, se obtiene el token de parametro
    window.token = getUrlParameter("token");
    //Se envia un post para comprobar el token
    ComprobarAutorizacion(token);
alert('Accediendo al JS');
}