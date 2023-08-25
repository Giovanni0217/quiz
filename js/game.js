// Jogo quiz
$(document).ready(function () {
    const perguntas = [{
        pergunta: 'De quem é a famosa frase "Penso, logo existo."?',
        respostas: ["Descartes", "Galileu Galilei", "Platão", "Sócrates"],
        correta: "resp0"
    }, {
        pergunta: "Em que ano o Brasil foi descoberto?",
        respostas: ["1948", "1500", "1629", "1712"],
        correta: "resp1"
    }, {
        pergunta: "Qual o menor e o maior país do mundo?",
        respostas: ["Panamá e China", "Mônaco e Estados Unidos", "Vaticano e Rússia", "São Marino e Índia"],
        correta: "resp2"
    }, {
        pergunta: "Qual seleção foi campeã do mundo em 2002?",
        respostas: ["França", "Alemanha", "Itália", "Brasil"],
        correta: "resp3"
    }, {
        pergunta: "Qual o número mínimo de jogadores em cada time em uma partida de futebol?",
        respostas: ["7", "8", "9", "10"],
        correta: "resp0"
    }, {
        pergunta: "Quanto tempo a luz do Sol demora para chegar à Terra?",
        respostas: ["1 dia", "8 minutos", "12 segundos", " 12 minutos"],
        correta: "resp1"
    }, {
        pergunta: "Em que período da pré-história o fogo foi descoberto?",
        respostas: ["Neolítico", "Idade da Pedra", "Paleolítico", "Idade do Ferro"],
        correta: "resp2"
    }, {
        pergunta: "Qual o maior animal terrestre?",
        respostas: ["Girafa", "Dinossauro", "Tubarão Branco", "Elefante Africano"],
        correta: "resp3"
    }, {
        pergunta: "Quem foi o primeiro homem a pisar na Lua? Em que ano aconteceu?",
        respostas: ["Neil Armstrong, em 1969", "Charles Duke, em 1971", "Charles Conrad, em 1969", "Buzz Aldrin, em 1971"],
        correta: "resp0"
    }, {
        pergunta: "Quais são os cromossomos que determinam o sexo masculino?",
        respostas: ["X", "Y", "Z", "A"],
        correta: "resp1"
    }];

    var qtdPerguntas = perguntas.length - 1;

    let perguntasFeitas = [];

    gerarPergunta(qtdPerguntas);

    function gerarPergunta(maxPerguntas) {
        // Gerar um número aleatório
        let aleatorio = (Math.random() * maxPerguntas).toFixed();
        // Converter para número
        aleatorio = Number(aleatorio);
        // Verificar se a pergunta sorteada ja foi feita
        if (!perguntasFeitas.includes(aleatorio)) {
            // Colocar como pergunta feita
            perguntasFeitas.push(aleatorio);
            // Preencher o HTML com os dados da pergunta sorteada
            var perguntaSelect = perguntas[aleatorio].pergunta;
            $('#pergunta').html(perguntaSelect);
            $('#pergunta').attr('data-indice', aleatorio);
            // Preencher o HTML com os dados das respostas
            for (var i = 0; i < 4; i++) {
                $('#resp' + i).html(perguntas[aleatorio].respostas[i]);
            }
            // Embaralhar as respostas
            var father = $('#respostas');
            var buttons = father.children();
            console.log(buttons);
            for (var i = 1; i < buttons.length; i++) {
                father.append(buttons.eq(Math.floor(Math.random() * buttons.length)));
            }
        } else {
            // Se a pergunta já foi feita
            if (perguntasFeitas.length < qtdPerguntas + 1) {
                return gerarPergunta(maxPerguntas);
            } else {
                gameWin();
            }
        }
    }

    $('.resposta').click(function () {
        if ($('#quiz-game').attr('status') !== 'off') {
            resetButtons();
            // Adicionar a classe selecionada
            $(this).addClass('selecionada');
        }
    });

    $('#confirmar').click(function () {
        // Pegar o índice da pergunta
        var indice = $('#pergunta').attr('data-indice');
        // Qual é a resposta certa
        var respCerta = perguntas[indice].correta;
        // Qual foi a resposta que o usuário selecionou
        $('.resposta').each(function () {
            if ($(this).hasClass('selecionada')) {
                var respEscolhida = $(this).attr('id');
                if (respCerta == respEscolhida) {
                    $('#quiz-game').attr('status', 'off');
                    $('#' + respEscolhida).removeClass('selecionada');
                    $('#' + respCerta).addClass('green');
                    setTimeout(function () {
                        proximaPergunta();
                    }, 2000);
                } else {
                    $('#quiz-game').attr('status', 'off');
                    $('#' + respCerta).addClass('green');
                    $('#' + respEscolhida).removeClass('selecionada');
                    $('#' + respEscolhida).addClass('red');
                    setTimeout(function () {
                        gameOver();
                    }, 4000)
                }
            }
        });
    });

    function resetButtons() {
        // Percorrer todas as respostas e desmarcar a classe selecionada
        $('.resposta').each(function () {
            if ($(this).hasClass('selecionada')) {
                $(this).removeClass('selecionada');
            }
            if ($(this).hasClass('green')) {
                $(this).removeClass('green');
            }
            if ($(this).hasClass('red')) {
                $(this).removeClass('red');
            }
        });
    }

    function proximaPergunta() {
        resetButtons();
        gerarPergunta(qtdPerguntas);
        $('#quiz-game').attr('status', 'on')
    }

    function newGame() {
        perguntasFeitas = [];
        resetButtons();
        gerarPergunta(qtdPerguntas);
        $('#novoJogo').click(function () {
            $('#quiz-game').removeClass('oculto');
            $('#status').addClass('oculto');
            $('#quiz-game').attr('status', 'on');
        });
    }

    function gameOver() {
        $('#msg-restart').text("Game Over!");
        $('#quiz-game').addClass('oculto');
        $('#status').removeClass('oculto');
        newGame();
    }

    function gameWin() {
        $('#msg-restart').text("Parabéns! Você acertou todas.");
        $('#quiz-game').addClass('oculto');
        $('#status').removeClass('oculto');
        newGame();
    }
});