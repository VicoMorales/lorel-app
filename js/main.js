$(document).ready(function () {

    $('.button-collapse').sideNav({
        menuWidth: 300,
        edge: 'left',
        closeOnClick: true,
        draggable: true,
        onOpen: function (el) { },
        onClose: function (el) { },
    }
    );
    
    var sexo;
    var nombre;
    var edad;
    var embarazada;
    var acumulado;
    var respuesta;
    var intensidad;
    $(".image-sex").click(function () {
        sexo = $(this).attr("id");
        $("#optionSex").addClass("animated fadeOut");
        $("#optionSex").addClass("ocultar");  
        //Cambiando de vista
        $(".title").html("¿Cuál es tu nombre?<span class='tipeo'>&#160;</span>");
        $(".cursorTipeo").addClass("tipeo");
        $("#text-nombre").addClass("animated fadeIn");
        $("#text-nombre").removeClass("ocultar");  
        $("#next-1").removeClass("ocultar");
    });
    $("#next-1").click(function () {
        nombre = $("#nombreUser").val();
        $(".name").html(nombre);
        //Aqui quitamos el textbox del nombre
        $("#text-nombre").addClass("animated fadeOut");
            $("#text-nombre").addClass("ocultar");      
        //Cambiamos la pregunta
        $(".title").html("¿Cuál es tu edad?<span class='tipeo'>&#160;</span>");
        $(".title").addClass("animated fadeIn");
        //Agregamos el text de edad
        $("#text-edad").removeClass("ocultar");
        $("#text-edad").addClass("animated fadeIn");
        //Cambiamos ID del button
        $("#next-2").removeClass("ocultar");  
        procesoDos();
    });

    function procesoDos() {
        $("#next-2").click(function () {
           //Joven y Adulto 
            edad = $("#edadUser").val();
            if (sexo == "sMan" && edad >= 12 && edad < 60){
                acumulado = 10;
                vistaEnfermedad();
            }
            if (sexo == "sWoman" && edad >= 12 && edad < 15) {
                acumulado = 10;
                vistaEnfermedad();
            }
            if (sexo == "sWoman" && edad >= 46 && edad < 60) {
                acumulado = 10;
                vistaEnfermedad();
            }
            //Niño
            if (edad < 12){
                acumulado = 15;
                vistaEnfermedad();
            }
            //Anciano
            if (edad >= 60) {
                acumulado = 15;
                vistaEnfermedad();
            }
            //Vista de Pregunta si esta embarazada
            if (sexo == "sWoman" && edad >= 15 && edad <= 45) {
                $("#askEmbarazo").removeClass("ocultar");
                $("#text-edad").addClass("ocultar");
                $(".title").html("¿Estás embarazada?<span class='tipeo'>&#160;</span>");
                $("#next-2").addClass("ocultar");
            } 
           
        });

    }  
    //Mostrar vista de enfermedades
    function vistaEnfermedad() {
        $("#askEmbarazo").addClass("ocultar");
        //Cambiamos la pregunta
        $(".title").html("¿Alguna enfermedad?<span class='tipeo'>&#160;</span>");
        //Ocultar el text de edad
        $("#text-edad").addClass("ocultar");
        //mostramos la ventana
        $("#askEnfermedad").removeClass("ocultar");
        $("#askEnfermedad").addClass("animated fadeIn");
        $("#next-2").addClass("ocultar");
    } 
     //Mujer embarazada
    $("#siEmbarazada").on("click touch",function(){
        embarazada = true;
        if (embarazada == true) {
            acumulado = 15;
        }       
        vistaEnfermedad();
    });
    $("#noEmbarazada").on("click touch", function () {
        embarazada = false;
        if (embarazada == false) {
            acumulado = 10;
        }     
        vistaEnfermedad();
    });
    function selecccionEnfermedad(id) {
        if (id == "sAsma") {
            acumulado = acumulado + 15;
        }
        if (id == "sDiabetes") {
            acumulado = acumulado + 15;
        }
        if (id == "sCancer") {
            acumulado = acumulado + 15;
        }
        if (id == "sSida") {
            acumulado = acumulado + 15;
        }
        if(id == "sOtros" ){
            acumulado  = acumulado + 8;
        }
        if (id == "sNinguno") {
            acumulado = acumulado + 0;
        }
    }
    $(".enfermedad").on("click touch", function () {
        var id = $(this).attr("id");
        selecccionEnfermedad(id);
        vistaSintomas();
    });

    function vistaSintomas() {    
        //Pregunta 
        $(".title").html("¿Qué sintomas tienes?<span class='tipeo'>&#160;</span>");    
        //mostramos la ventana Sintomas
        $("#askSintomas").removeClass("ocultar");
        $("#askSintomas").addClass("animated fadeIn");
        //Ocultamos la ventana de enfermedad
        $("#askEnfermedad").addClass("ocultar");
        $("#next-3").removeClass("ocultar");  
        procesoTres();
    }
    function calcularAcumuladoSintoma(){
        for(var i = 1 ; i<=7 ; i++){
            var valor = parseInt($("input[name=group" + i + "]:checked").attr("value"));
            acumulado = acumulado + valor;
        }
        console.log(acumulado);
    }
    function diagnóstico() {
        $(".title").html("Tu Diagnóstico<span class='tipeo'>&#160;</span>");    
        if(acumulado > 0 && acumulado <= 50){
            respuesta = "Tiene una gripe Común! <br> Consuma bebidas y calientes <br> y visite un Médico";    
            intensidad = "normal";
        }
        if (acumulado > 50 && acumulado <= 70) {
            respuesta = "Tiene una gripe Intensa! <br> Es conveniente que <br> visite un Médico";
            intensidad = "intenso";
        }
        if (acumulado > 70 ) {
            respuesta = "Tiene una gripe Muy Intensa! <br> Visite un Médico con Urgencia";
            intensidad = "muy-intenso";
        }
        $("#respuestaSistema").html(respuesta);
        $("#imgIntensidad").addClass(intensidad);
        $("#respuestaSistema").removeClass("ocultar");
        $("#imgIntensidad").removeClass("ocultar");
    }
    function procesoTres() {   
        $("#next-3").click(function () {
            calcularAcumuladoSintoma();  
            $("#respuestaFinal").removeClass("ocultar");         
            $("#askSintomas").addClass("ocultar");
            $(".next").addClass("ocultar");            
            setTimeout(function () { 
                $("#preLoad").hide();
                diagnóstico();
             }, 2000);
        });
    }
});