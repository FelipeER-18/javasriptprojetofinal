
    const bancoQuestoes = [
        {
            pergunta: "Qual o nome desse item?",
            imagem: "https://leagueofitems.com/images/items/256/3137.webp",
            alternativas: ["Eco de Luden", "Criptoflora", "Espada do Rei Destruído"],
            correta: 1
        },
        {
            pergunta: "Qual campeão tem a passiva chamada 'Perseverança'?",
            imagem: "",
            alternativas: ["Braum", "Garen", "Alistar"],
            correta: 1 
        },
        {
            pergunta: "De qual região do mapa de Runeterra a campeã Jinx faz parte?",
            imagem: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTm1zGkqd6uv2QqrvIZy4XAnu1jCLOVG4XaXOFFbtjMjIQjWyDqGUCHERhe&s=10", 
            alternativas: ["Demacia", "Noxus", "Zaun"],
            correta: 2
        },
        {
            pergunta: "Qual o nome deste monstro épico do jogo?",
            imagem: "https://s2.glbimg.com/9Kwm3MjA_oC-5gV8Pipf3ZcrnIs=/0x0:1162x694/600x0/smart/filters:gifv():strip_icc()/i.s3.glbimg.com/v1/AUTH_bc8228b6673f488aa253bbcb03c80ec5/internal_photos/bs/2019/v/e/xAyqooTuy4MNt6rII7Ng/baron-lol.png",
            alternativas: ["Dragão Ancião", "Arauto do Vale", "Barão Nashor"],
            correta: 2
        },
        {
            pergunta: "Qual item foi historicamente conhecido por reviver o campeão?",
            imagem: "", 
            alternativas: ["Anjo Guardião", "Ampulheta de Zhonya", "Gume da Infinito"],
            correta: 0
        }
    ];
    
    let indiceAtual = 0;
    let pontos = 0;
    let respondeuElemento = false;
    
    const elementoNumero = document.getElementById("numero-questao");
    const elementoTexto = document.getElementById("texto-questao");
    const elementoImagem = document.getElementById("imagem-questao");
    const containerAlternativas = document.getElementById("alternativas-container");
    const elementoScore = document.getElementById("score");
    const elementoFeedback = document.getElementById("feedback");
    const btnProximo = document.getElementById("nextBtn");
    const btnReiniciar = document.getElementById("btnReiniciar");
    
    function carregarQuestao() {
        respondeuElemento = false;
        elementoFeedback.innerText = "";
        containerAlternativas.innerHTML = "";
        
        let dadosQuestao = bancoQuestoes[indiceAtual];
        
        elementoNumero.innerText = `Questão ${indiceAtual + 1} de ${bancoQuestoes.length}`;
        elementoTexto.innerText = dadosQuestao.pergunta;
        
        if(dadosQuestao.imagem !== "") {
            elementoImagem.src = dadosQuestao.imagem;
            elementoImagem.style.display = "block";
        } else {
            elementoImagem.style.display = "none";
        }
        
        dadosQuestao.alternativas.forEach((alternativa, index) => {
            const botao = document.createElement("button");
            botao.innerText = alternativa;
            botao.addEventListener("click", () => verificarResposta(index, botao));
            containerAlternativas.appendChild(botao);
        });
    }
    
    function verificarResposta(indiceSelecionado, botaoClicado) {
        if(respondeuElemento) return; 
        
        respondeuElemento = true;
        let dadosQuestao = bancoQuestoes[indiceAtual];
        
        if(indiceSelecionado === dadosQuestao.correta) {
            pontos += 10; 
            elementoScore.innerText = pontos;
            elementoFeedback.innerText = "Boa! Resposta correta. 🎯";
            elementoFeedback.style.color = "green";
            botaoClicado.style.backgroundColor = "#98fb98";
        } else {
            elementoFeedback.innerText = "Errou! Mais sorte na próxima wave. ❌";
            elementoFeedback.style.color = "red";
            botaoClicado.style.backgroundColor = "#ffcccb"; 
        }
    }
    
    btnProximo.addEventListener("click", () => {
        if (!respondeuElemento) {
            alert("Selecione uma alternativa antes de passar de fase!");
            return;
        }
    
        indiceAtual++;
    
        if (indiceAtual < bancoQuestoes.length) {
            carregarQuestao();
        } else {
            elementoNumero.innerText = "Fim de Jogo!";
            elementoTexto.innerText = `Parabéns! Você terminou o Quiz do LoL.`;
            elementoImagem.style.display = "none";
            containerAlternativas.innerHTML = "";
            elementoFeedback.innerText = `Pontuação Final: ${pontos} pontos!`;
            elementoFeedback.style.color = "blue";
            
            btnProximo.style.display = "none"; 
            btnReiniciar.style.display = "block";
        }
    });
    
    btnReiniciar.addEventListener("click", () => {
        indiceAtual = 0; 
        pontos = 0;      
        elementoScore.innerText = pontos; 
        elementoFeedback.innerText = "";
        
        btnReiniciar.style.display = "none"; 
        btnProximo.style.display = "block";  
        
        carregarQuestao();
    });
    
    carregarQuestao();
