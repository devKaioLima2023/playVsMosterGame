function iniciaGame() {
  const containerBotão = document.querySelector(".botão");

  const dj = [0, 10, 15, 20, 25, 30, 35, 40, 45, 50];
  const dm = [0, 10, 15, 20, 25, 30, 35, 40, 45, 50];
  let vidaDoMostro = 100;
  let vidaDoJogador = 100;

  criaBotão();

  const ataque = document.querySelector(".ataque");
  const cura = document.querySelector(".curar");
  const desistir = document.querySelector('.desistir');
  const ataqueEspecial = document.querySelector('.ataque-especial');
  const barraMonstro = document.querySelector("#mostro");
  const barraJogador = document.querySelector("#jogador");
  const vidaDoJogadorEmPorcentagem = document.querySelector(".vida-do-jogador");
  const vidaDoMonstroEmPorcentagem = document.querySelector(".vida-do-mostro");
  const resultado = document.querySelector(".resultado");

  ataque.addEventListener("click", () => {
    realizarAtaque(dj, dm);
  });

  cura.addEventListener("click", () => {
    realizarCura(dj, dm);
  });

  ataqueEspecial.addEventListener('click', () => {
    realizarAtaqueEspecial(dj, dm);
  });

  desistir.addEventListener('click', () => {
    exibirResultadoFinal();
  });

  function realizarAtaque(jogadorDanoArray, monstroDanoArray) {
    if (!ataque.disabled) {
      const númeroAleatórioJogador = numeroAleatorio(0, 9);
      const númeroAleatórioMonstro = numeroAleatorio(0, 9);
      const danoMonstro = jogadorDanoArray[númeroAleatórioJogador];
      const danoJogador = monstroDanoArray[númeroAleatórioMonstro];

      colocaNaTela(danoJogador, danoMonstro);
      vidaDoMostro -= danoJogador;
      vidaDoJogador -= danoMonstro;

      atualizarBarraVida();
    }
  }

  function realizarCura(jogadorDanoArray, monstroDanoArray) {
    if (!ataque.disabled) {
      const curaJogador = numeroAleatorio(0, 10);
      const vidaCurada = Math.min(vidaDoJogador + curaJogador, 100);
      const númeroAleatórioMonstro = numeroAleatorio(0, 9);
      const danoJogadorMonstro = monstroDanoArray[númeroAleatórioMonstro];
      const danoDoMostro = Math.max(vidaDoJogador - danoJogadorMonstro, 0);

      barraJogador.value = danoDoMostro;
      vidaDoJogador = danoDoMostro;

      curandoEAtaque(curaJogador, danoJogadorMonstro);
      atualizarBarraVida();
    }
  }

  function realizarAtaqueEspecial(jogadorDanoArray, monstroDanoArray) {
    const númeroAleatórioJogador = numeroAleatorio(0, 9);
    const númeroAleatórioMonstro = numeroAleatorio(0, 9);
    const danoMonstro = jogadorDanoArray[númeroAleatórioJogador];
    let danoJogador = monstroDanoArray[númeroAleatórioMonstro];
    ataqueEspecialFunction(danoJogador += 20, danoMonstro);
    vidaDoMostro -= danoJogador;
    vidaDoJogador -= danoMonstro;
    atualizarBarraVida();
  }

  function exibirResultadoFinal() {
    containerBotão.innerHTML = "";
    const criaButton = document.createElement('button');
    criaButton.classList.add("tentar-novamente");
    criaButton.innerHTML = "JOGAR NOVAMENTE";
    containerBotão.appendChild(criaButton);
    let resultadoMsg = "";

    if (vidaDoJogador > vidaDoMostro) {
      resultadoMsg = "O JOGADOR VENCEU!";
    } else if (vidaDoJogador < vidaDoMostro) {
      resultadoMsg = "O JOGADOR PERDEU!";
    } else {
      resultadoMsg = "EMPATE!";
    }

    const criap = document.createElement('p');
    criap.innerHTML = resultadoMsg;
    containerBotão.appendChild(criap);

    const tentaNovamente = document.querySelector(".tentar-novamente");
    tentaNovamente.addEventListener('click', () => {
      jogaNovamente();
    });
  }

  function criaBotão() {
    const nomeButton = ["ATAQUE", "ATAQUE ESPECIAL", "CURA", "DESISTIR"];
    const classeButton = ["ataque", "ataque-especial", "curar", "desistir"];

    nomeButton.forEach((nome, index) => {
      const button = document.createElement("button");
      button.innerHTML = nome;
      button.classList.add(classeButton[index]);
      containerBotão.appendChild(button);
    });
  }

  function numeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function colocaNaTela(jogador, monstro) {
    const criaP = document.createElement("p");
    const criaP2 = document.createElement("p");
    criaP.classList.add("verde");
    criaP2.classList.add("vermelho");
    criaP.innerHTML = `O DANO DO JOGADOR FOI ${jogador}!`;
    criaP2.innerHTML = `O DANO DO MONSTRO FOI ${monstro}!`;
    resultado.appendChild(criaP);
    resultado.appendChild(criaP2);
  }

  function atualizarBarraVida() {
    barraMonstro.value = Math.max(vidaDoMostro, 0);
    barraJogador.value = Math.max(vidaDoJogador, 0);
    vidaDoMonstroEmPorcentagem.innerHTML = `${Math.max(vidaDoMostro, 0)}%`;
    vidaDoJogadorEmPorcentagem.innerHTML = `${Math.max(vidaDoJogador, 0)}%`;
  
    if (vidaDoJogador <= 0 && vidaDoMostro <= 0) {
      exibirResultadoFinal();
      ataque.disabled = true;
    } else if (vidaDoJogador <= 0) {
      vidaDoJogador = 0;
      exibirResultadoFinal();
      ataque.disabled = true;
    } else if (vidaDoMostro <= 0) {
      vidaDoMostro = 0;
      exibirResultadoFinal();
      ataque.disabled = true;
    }
  }
  

  function curandoEAtaque(cura, ataque) {
    const criaP = document.createElement("p");
    const criaP2 = document.createElement("p");
    criaP.classList.add("verde");
    criaP2.classList.add("vermelho");
    criaP.innerHTML = `O JOGADOR CUROU ${cura}!`;
    criaP2.innerHTML = `O DANO DO MONSTRO FOI ${ataque}!`;
    resultado.appendChild(criaP);
    resultado.appendChild(criaP2);
  }

  function jogaNovamente() {
    containerBotão.innerHTML = "";
    barraMonstro.value = 100;
    barraJogador.value = 100;
    vidaDoJogadorEmPorcentagem.innerHTML = `${100}%`;
    vidaDoMonstroEmPorcentagem.innerHTML = `${100}%`;
    resultado.innerHTML = "";
    iniciaGame();
  }

  function ataqueEspecialFunction(ataque, danoMostro) {
    const criaP = document.createElement("p");
    const criaP2 = document.createElement("p");
    criaP.classList.add("verde");
    criaP2.classList.add("vermelho");
    criaP.innerHTML = `O JOGADOR DEU UM ATAQUE ESPECIAL DE ${ataque}!`;
    criaP2.innerHTML = `O DANO DO MONSTRO FOI ${danoMostro}!`;
    resultado.appendChild(criaP);
    resultado.appendChild(criaP2);
  }
}

iniciaGame();
