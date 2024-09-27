
let listaNumeros = [];
let numeroLimite = 15;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;



function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMensagemInicial(){
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e ' + numeroLimite);
}


function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeElementos = listaNumeros.length;
    //regra para não repetir
    if(quantidadeElementos = 3 ){
        listaNumeros = [];
    }
    if (listaNumeros.includes(numeroEscolhido)){
        return gerarNumeroAleatorio ();
    }else {
        listaNumeros.push(numeroEscolhido);
        //console.log("lista= " + listaNumeros)
        return numeroEscolhido;
    }
}

function verificarChute() {
    let chute = document.querySelector('input').value;
    //console.log(chute == numeroSecreto);
    
    let palavraTentativa = tentativas > 1 ? 'tentativas': 'tentativa';
    if(chute == numeroSecreto){
        exibirTextoNaTela('h1', 'Acertou!');
        exibirTextoNaTela('p', `Você descobriu o número secreto ${numeroSecreto} com ${tentativas} ${palavraTentativa}!`);

        document.getElementById('reiniciar').removeAttribute('disabled');//ativando botão que estava desativado
        document.getElementById('desChute').setAttribute('disabled', true);

    }else {
        if(numeroSecreto > chute){
            exibirTextoNaTela('p', `Errou! O número secreto é maior que ${chute}!`);
        }else{
            exibirTextoNaTela('p', `Errou! O número secreto é menor que ${chute}!`);

        } 
        limparCampo();
        tentativas++;
    }
   
}

function limparCampo (){
    let chute = document.querySelector('input');
    chute.value = '';
}

function novoJogo(){
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
    document.getElementById('desChute').removeAttribute('disabled');
    
}



exibirMensagemInicial();