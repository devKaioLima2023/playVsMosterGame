function iniciaGame() {
  const containerBotão = document.querySelector(".botão");

  const dj = [0, 10, 15, 20, 25, 30, 35, 40, 45, 50];
  const dm = [0, 10, 15, 20, 25, 30, 35, 40, 45, 50];
  let vidaDoMostro = 100;
  let vidaDoJogador = 100;


  criaBotão();


  const ataque = document.querySelector(".ataque");
  const cura = document.querySelector(".curar");
  const desistir = document.querySelector('.desistir')
  const ataqueEspecial = document.querySelector('.ataque-especial')
  const barraMonstro = document.querySelector("#mostro");
  const barraJogador = document.querySelector("#jogador");
  const vidaDoJogadorEmPorcentagem = document.querySelector(".vida-do-jogador");
  const vidaDoMonstroEmPorcentagem = document.querySelector(".vida-do-mostro");
  const resultado = document.querySelector(".resultado");

  ataque.addEventListener("click", () => {
    const númeroAleatórioJogador = numeroAleatorio(0, 9);
    const númeroAleratórioMonstro = numeroAleatorio(0, 9);
    const danoMonstro = dj[númeroAleatórioJogador];
    const danoJogador = dm[númeroAleratórioMonstro];
    colocaNaTela(danoJogador, danoMonstro);
    vidaDoMostro -= danoJogador;
    vidaDoJogador -= danoMonstro;
    barraMonstro.value = vidaDoMostro;
    barraJogador.value = vidaDoJogador;
    vidaDoMonstroEmPorcentagem.innerHTML = `${vidaDoMostro}%`;
    vidaDoJogadorEmPorcentagem.innerHTML = `${vidaDoJogador}%`;

    if (vidaDoJogador <= 0 && vidaDoMostro <= 0) {
      ganhou("EMPATE!");
      vidaDoJogadorEmPorcentagem.innerHTML = `${0}%`;
      vidaDoMonstroEmPorcentagem.innerHTML = `${0}%`;
      ataque.disabled = true;
      botãoJogarNovamente()
      const tentaNovamente = document.querySelector(".tentar-novamente")
      tentaNovamente.addEventListener('click', () => {
        jogaNovamente();
      })

    } else if (vidaDoJogador <= 0) {
      perdeu("O JOGADOR PERDEU!");
      vidaDoJogadorEmPorcentagem.innerHTML = `${0}%`;
      ataque.disabled = true;
      botãoJogarNovamente()
      const tentaNovamente = document.querySelector(".tentar-novamente")
      tentaNovamente.addEventListener('click', () => {
        jogaNovamente();
      })
    } else if (vidaDoMostro <= 0) {
      ganhou("O MOSTRO PERDEU!");
      vidaDoMonstroEmPorcentagem.innerHTML = `${0}%`;
      ataque.disabled = true;
      botãoJogarNovamente()
      const tentaNovamente = document.querySelector(".tentar-novamente")
      tentaNovamente.addEventListener('click', () => {
        jogaNovamente();
      })
    }
  });

  cura.addEventListener("click", () => {
    if (!ataque.disabled) {
      const curaJogador = numeroAleatorio(0, 10);

      const vidaCurada = Math.min(vidaDoJogador + curaJogador, 100);

      barraJogador.value = vidaCurada;
      vidaDoJogador = vidaCurada;
      vidaDoJogadorEmPorcentagem.innerHTML = `${vidaDoJogador}%`;

      const númeroAleratórioMonstro = numeroAleatorio(0, 9);
      const danoJogadorMonstro = dm[númeroAleratórioMonstro];
      const danoDoMostro = Math.max(vidaDoJogador - danoJogadorMonstro, 0);

      if (danoDoMostro <= 0) {
        perdeu("O JOGADOR PERDEU!");
        cura.disabled = true;
        ataque.disabled = true;
      }

      barraJogador.value = danoDoMostro;
      vidaDoJogador = danoDoMostro;
      vidaDoJogadorEmPorcentagem.innerHTML = `${vidaDoJogador}%`;

      curandoEAtaque(curaJogador, danoJogadorMonstro);

      if (vidaDoJogador <= 0 && vidaDoMostro <= 0) {
        ganhou("EMPATE!");
        cura.disabled = true;
        ataque.disabled = true;
        botãoJogarNovamente()
        const tentaNovamente = document.querySelector(".tentar-novamente")
        tentaNovamente.addEventListener('click', () => {
          jogaNovamente();
        })
      } else if (vidaDoJogador <= 0) {
        perdeu("O JOGADOR PERDEU!");
        cura.disabled = true;
        ataque.disabled = true;
        botãoJogarNovamente()
        const tentaNovamente = document.querySelector(".tentar-novamente")
        tentaNovamente.addEventListener('click', () => {
          jogaNovamente();
        })
      } else if (vidaDoMostro <= 0) {
        ganhou("O MOSTRO PERDEU!");
        cura.disabled = true;
        ataque.disabled = true;
        botãoJogarNovamente()
        const tentaNovamente = document.querySelector(".tentar-novamente")
        tentaNovamente.addEventListener('click', () => {
          jogaNovamente();
        })
      }
    }
  });

  console.log(ataqueEspecial)

  ataqueEspecial.addEventListener('click', ()=>{
    const númeroAleatórioJogador = numeroAleatorio(0, 9);
    const númeroAleratórioMonstro = numeroAleatorio(0, 9);
    const danoMonstro = dj[númeroAleatórioJogador];
    let danoJogador = dm[númeroAleratórioMonstro];
    ataqueEspecialfuction(danoJogador += 20, danoMonstro)
    vidaDoMostro -= danoJogador;
    vidaDoJogador -= danoMonstro;
    barraMonstro.value = vidaDoMostro;
    barraJogador.value = vidaDoJogador;
    vidaDoMonstroEmPorcentagem.innerHTML = `${vidaDoMostro}%`;
    vidaDoJogadorEmPorcentagem.innerHTML = `${vidaDoJogador}%`;
    if (vidaDoJogador <= 0 && vidaDoMostro <= 0) {
      ganhou("EMPATE!");
      vidaDoJogadorEmPorcentagem.innerHTML = `${0}%`;
      vidaDoMonstroEmPorcentagem.innerHTML = `${0}%`;
      ataque.disabled = true;
      botãoJogarNovamente()
      const tentaNovamente = document.querySelector(".tentar-novamente")
      tentaNovamente.addEventListener('click', () => {
        jogaNovamente();
      })

    } else if (vidaDoJogador <= 0) {
      perdeu("O JOGADOR PERDEU!");
      vidaDoJogadorEmPorcentagem.innerHTML = `${0}%`;
      ataque.disabled = true;
      botãoJogarNovamente()
      const tentaNovamente = document.querySelector(".tentar-novamente")
      tentaNovamente.addEventListener('click', () => {
        jogaNovamente();
      })
    } else if (vidaDoMostro <= 0) {
      ganhou("O MOSTRO PERDEU!");
      vidaDoMonstroEmPorcentagem.innerHTML = `${0}%`;
      ataque.disabled = true;
      botãoJogarNovamente()
      const tentaNovamente = document.querySelector(".tentar-novamente")
      tentaNovamente.addEventListener('click', () => {
        jogaNovamente();
      })
    }
  })

  desistir.addEventListener('click', () => {
    const criaButton = document.createElement('button')
    criaButton.classList.add("tentar-novamente");
    const criap = document.createElement('p')
    containerBotão.innerHTML = ""
    if (vidaDoJogador > vidaDoMostro) {
      criap.innerHTML = "O JOGADOR VENCEU!"
      criaButton.innerHTML = "JOGAR NOVAMENTE"
      containerBotão.appendChild(criap)
      containerBotão.appendChild(criaButton)
      const tentaNovamente = document.querySelector(".tentar-novamente")
      tentaNovamente.addEventListener('click', () => {
        jogaNovamente();
      })
    } else if (vidaDoJogador < vidaDoMostro) {
      criap.innerHTML = "O JOGADOR PERDEU!"
      criaButton.innerHTML = "JOGAR NOVAMENTE"
      containerBotão.appendChild(criap)
      containerBotão.appendChild(criaButton)
      const tentaNovamente = document.querySelector(".tentar-novamente")
      tentaNovamente.addEventListener('click', () => {
        jogaNovamente();
      })
    } else if (vidaDoJogador === vidaDoMostro) {
      criap.innerHTML = "EMPATE!"
      criaButton.innerHTML = "JOGAR NOVAMENTE"
      containerBotão.appendChild(criap)
      containerBotão.appendChild(criaButton)
      const tentaNovamente = document.querySelector(".tentar-novamente")
      tentaNovamente.addEventListener('click', () => {
        jogaNovamente();
      })
    }
  })

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

  function ganhou(msg) {
    const criaP = document.createElement("p");
    criaP.classList.add("verde");
    criaP.innerHTML = `${msg}`;
    resultado.appendChild(criaP);
  }

  function perdeu(msg) {
    const criaP = document.createElement("p");
    criaP.classList.add("vermelho");
    criaP.innerHTML = `${msg}`;
    resultado.appendChild(criaP);
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
    containerBotão.innerHTML = ""
    barraMonstro.value = 100;
    barraJogador.value = 100;
    vidaDoJogadorEmPorcentagem.innerHTML = `${100}%`;
    vidaDoMonstroEmPorcentagem.innerHTML = `${100}%`;
    resultado.innerHTML = ""
    iniciaGame();
  }

  function botãoJogarNovamente(){
    containerBotão.innerHTML = ""
    const criaButton = document.createElement('button')
    criaButton.classList.add("tentar-novamente");
    criaButton.innerHTML = "JOGAR NOVAMENTE"
    containerBotão.appendChild(criaButton)
    }

    function ataqueEspecialfuction(ataque, danoMostro) {
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