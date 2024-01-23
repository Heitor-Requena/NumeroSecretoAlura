let listaNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

mensagemInicial();

function conteudo(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguse Female', {rate: 1.2});
}

function mensagemInicial(){
    conteudo("h1", "Jogo Chute");
    conteudo("p", "Escolha um número de 1 a 10.");
}

function verificarChute(){
    let chute = document.querySelector("input").value;

    if (chute == numeroSecreto){
        let palavraTentativas = tentativas > 1 ? "tentativas" : "tentativa";
        let msgTentativas = `Acertou o número secreto ${chute}, com ${tentativas} ${palavraTentativas}`;
        conteudo("p", msgTentativas);
        document.getElementById("reiniciar").removeAttribute("disabled");
    } else {
        if (chute > numeroSecreto) {
            conteudo("p", `Errado. Número ${chute} é maior.`);
            limparCampo();
        } else {
            conteudo("p", `Errado. Número ${chute} é menor`);
            limparCampo();
        }
        tentativas++;
    }
}

function gerarNumeroAleatorio(){
    let numEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeElementosLista = listaNumerosSorteados.length;
    
    if (quantidadeElementosLista == numeroLimite){
        listaNumerosSorteados = [];
    }

    if (listaNumerosSorteados.includes(numEscolhido)){
        return gerarNumeroAleatorio();
    } else {
        listaNumerosSorteados.push(numEscolhido);
        return numEscolhido;
    }
}

function limparCampo(){
    chute = document.querySelector("input");
    chute.value = "";
}

function novoJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    mensagemInicial();
    document.getElementById("reiniciar").setAttribute("disabled", true);
}
