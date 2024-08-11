
$(document).ready(function () {
    console.log("Entra load page");
    // Deshabilitar el botón inicialmente si el campo está vacío
    if ($("#texto").val() === "") {
        $("#btnEncriptar").prop("disabled", true);
        $("#btnDesencriptar").prop("disabled", true);
        $("#btnCopiar").prop("disabled", true);

    }

    // Manejar cambios en el campo de entrada
    $("#texto").on("input", function () {
        if ($(this).val() === "") {
            $("#btnEncriptar").prop("disabled", true); // Deshabilitar si está vacío
            $("#btnDesencriptar").prop("disabled", true);
        } else {
            $("#btnEncriptar").prop("disabled", false); // Habilitar si tiene valor
            $("#btnDesencriptar").prop("disabled", false);

        }
    });
	
	$("#pEncrytpt").on("change", function () {
        if ($(this).val() === "") {
            $("#btnCopiar").prop("disabled", true);
        } else {
            $("#btnCopiar").prop("disabled", false);
        }
    });
    //Prevenir el submit por defecto del form
    $("#formularioPrincipal").submit(function (event) {
        if ($("#texto").val() == "") {
            Swal.fire({
                text: 'Debe escribir un texto',
                icon: 'error'
            });
        }
        event.preventDefault();
    });

    //Permitir solo minusculas
    $("#texto").keypress(function (event) {
        let caracter = String.fromCharCode(event.which);
        if (!caracter.match(/^[a-z\s]+$/)) { // Permitir solo minúsculas y espacios
            event.preventDefault();
        }
    });
    //Copiar texto la portapapeles
    $("#btnCopiar").click(function () {
        var texto = $("#pEncrytpt").val();
        navigator.clipboard.writeText(texto)
            .then(() => {
                Swal.fire({
                    text: 'Texto copiado al portapapeles',
                    icon: 'success'
                });
            })
            .catch(err => {
                console.error("Error al copiar al portapapeles: ", err);
                Swal.fire({
                    text: 'No se pudo copiar el texto',
                    icon: 'error'
                });
            });

    });
});
//Encriptar el texto
function encrypt() {
    clean();
    const texto = $("#texto").val();
    let encryptText = texto
        .replace(/e/g, "enter")
        .replace(/i/g, "imes")
        .replace(/a/g, "ai")
        .replace(/o/g, "ober")
        .replace(/u/g, "ufat");
    console.log(encryptText);
    $("#pEncrytpt").val(encryptText);
    $('.mensaje').css('background-image', 'none');
	$("#pEncrytpt").trigger('change'); // Forzar el evento change

}
//"desencriptar" el texto
function decrypt() {
    clean();
    const encryptText = $("#texto").val();
    let texto = encryptText
        .replace(/enter/g, "e")
        .replace(/imes/g, "i")
        .replace(/ai/g, "a")
        .replace(/ober/g, "o")
        .replace(/ufat/g, "u");
    console.log(texto);
    $("#pEncrytpt").val(texto);
    $('.mensaje').css('background-image', 'none');
	$("#pEncrytpt").trigger('change'); // Forzar el evento change

}
//limpiar campos
function clean() {
    $("#pEncrytpt").val("");
}
