var frase = $(".frase").text();
var numPalavras = frase.split(" ").length;
var tamanhoFrase = $("#tamanho-frase");

tamanhoFrase.text(numPalavras);

var campo = $(".campo-de-digitacao");

campo.on("input", function () {
    var conteudo = campo.val();
    var qtdPalavras = conteudo.split(/\S+/).length - 1;
    $("#contador-de-palavras").text(qtdPalavras);

    var qtdCaracteres = conteudo.length;
    $("#contador-de-caracteres").text(qtdCaracteres);
});
