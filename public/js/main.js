var tempoInicial = $("#tempo-digitacao").text();
var campo = $(".campo-de-digitacao");

$(
    function () {
        atualizaTamanhoFrase();
        inicializaContadores();
        inicializaCronometro();
        inicializaMarcadores();
        $("#botao-reiniciar").click(reiniciaJogo);
    }
);

function atualizaTamanhoFrase() {
    var frase = $(".frase").text();
    var numPalavras = frase.split(" ").length;
    var tamanhoFrase = $("#tamanho-frase");
    tamanhoFrase.text(numPalavras);
}

function inicializaContadores() {
    campo.on("input", function () {
        var conteudo = campo.val();
        var qtdPalavras = conteudo.split(/\S+/).length - 1;
        $("#contador-de-palavras").text(qtdPalavras);
    
        var qtdCaracteres = conteudo.length;
        $("#contador-de-caracteres").text(qtdCaracteres);
    });
}

function inicializaCronometro() {
    var tempoRestante = $("#tempo-digitacao").text();
    campo.one("focus", function (){
        var cronometroID = setInterval(function (){
            tempoRestante--;
            $("#tempo-digitacao").text(tempoRestante);
            if(tempoRestante < 1) {
                clearInterval(cronometroID);
                finalizaJogo();
            }
        }, 1000);
    });
}

function finalizaJogo() {
    campo.attr("disabled", true);
    campo.toggleClass("campo-desativado");
    inserePlacar();
}

function inicializaMarcadores() {
        var frase = $(".frase").text();
        campo.on("input", function (){
        var digitado = campo.val();
        var comparavel = frase.substr(0, digitado.length);
        console.log("Digitado:" + digitado);
        console.log("Frase c:" + comparavel);
        if (digitado == comparavel) {
            campo.addClass("borda-verde");
            campo.removeClass("borda-vermelha");
        } else {
            campo.addClass("borda-vermelha");
            campo.removeClass("borda-verde");
        }
    });
}


function inserePlacar() {
    var corpoTabela = $(".placar").find("tbody");
    var usuario = "Yuri";
    var numPalavras = $("#contador-de-palavras").text();

    var linha = "<tr>" +
                    "<td>"+ usuario + "</td>"+
                    "<td>"+ numPalavras + "</td>"+
                "</tr>";
    corpoTabela.append(linha);            
}


function reiniciaJogo() {
    campo.attr("disabled", false);
    campo.val("");
    $("#contador-de-palavras").text("0");
    $("#contador-de-caracteres").text("0");
    $("#tempo-digitacao").text(tempoInicial);
    inicializaCronometro();
    campo.toggleClass("campo-desativado");
    campo.removeClass("borda-vermelha");
    campo.removeClass("borda-verde");
}

