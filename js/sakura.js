// Motor de Animação de Pétalas de Cerejeira (Sakura)
export const SakuraEffect = {
  container: null,
  activeInterval: null,
  isRunning: false,

  // Injeta estilos necessários na página de forma autônoma
  injectStyles() {
    if (document.getElementById('sakura-styles')) return;

    const style = document.createElement('style');
    style.id = 'sakura-styles';
    style.textContent = `
      .sakura-petal {
        position: fixed;
        top: -50px;
        pointer-events: none;
        z-index: 100;
        background: linear-gradient(135deg, #FFD5E5 0%, #FFAAA6 100%);
        border-radius: 12px 1px 12px 12px;
        opacity: 0.8;
        transform-origin: left top;
        box-shadow: 0 2px 5px rgba(255, 170, 166, 0.3);
      }

      /* Animação principal de queda e oscilação */
      @keyframes sakura-fall {
        0% {
          transform: translateY(0) rotate(0deg) scale(1);
          opacity: 0;
        }
        10% {
          opacity: 0.85;
        }
        90% {
          opacity: 0.85;
        }
        100% {
          transform: translateY(105vh) rotate(540deg) scale(0.6);
          opacity: 0;
        }
      }

      @keyframes sakura-swing {
        0%, 100% {
          margin-left: 0;
        }
        50% {
          margin-left: 80px;
        }
      }

      /* Rajada de vento (Burst) */
      @keyframes sakura-burst {
        0% {
          transform: translate(-15vw, var(--startY, 50vh)) scale(0.3) rotate(0deg);
          opacity: 0;
        }
        10% {
          opacity: 1;
        }
        90% {
          opacity: 1;
        }
        100% {
          transform: translate(115vw, calc(var(--startY, 50vh) - 20vh)) scale(2.5) rotate(720deg);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  },

  start(container = document.body) {
    if (this.isRunning) return;
    this.container = container;
    this.isRunning = true;
    this.injectStyles();

    // Loop contínuo de geração
    this.activeInterval = setInterval(() => {
      this.createPetal();
    }, 400);

    // Cria as primeiras pétalas imediatamente para dar preenchimento rápido
    for (let i = 0; i < 15; i++) {
      this.createPetal(true);
    }
  },

  stop() {
    this.isRunning = false;
    if (this.activeInterval) {
      clearInterval(this.activeInterval);
      this.activeInterval = null;
    }
  },

  createPetal(startMidway = false) {
    if (!this.isRunning || !this.container) return;

    const petal = document.createElement('div');
    petal.className = 'sakura-petal';

    // Parâmetros aleatórios para naturalidade
    const sizeWidth = Math.random() * 12 + 8; // 8px a 20px
    const sizeHeight = sizeWidth * 1.2;
    const startLeft = Math.random() * 100; // 0% a 100% da tela
    const duration = Math.random() * 5 + 6; // 6s a 11s de queda
    const delay = Math.random() * 3; // delay inicial
    
    // Rotação inicial aleatória
    const rotate = Math.random() * 360;

    petal.style.width = `${sizeWidth}px`;
    petal.style.height = `${sizeHeight}px`;
    petal.style.left = `${startLeft}vw`;
    
    // Se startMidway for true, inicia a animação em pontos diferentes da queda
    if (startMidway) {
      const startTop = Math.random() * 100;
      petal.style.top = `${startTop}vh`;
    }

    // Aplica animações combinadas (Queda + Balanço)
    petal.style.animation = `
      sakura-fall ${duration}s linear ${delay}s infinite,
      sakura-swing ${duration * 0.7}s ease-in-out ${delay}s infinite alternate
    `;
    
    petal.style.transform = `rotate(${rotate}deg)`;

    // Variações cromáticas sutis (degradê de rosa cerejeira)
    const colorType = Math.random();
    if (colorType < 0.3) {
      petal.style.background = 'linear-gradient(135deg, #FFF0F5 0%, #FFB6C1 100%)'; // Lavanda rosa
    } else if (colorType < 0.6) {
      petal.style.background = 'linear-gradient(135deg, #FFC0CB 0%, #FF69B4 100%)'; // Rosa choque claro
    }

    this.container.appendChild(petal);

    // Remove a pétala após um ciclo completo (caso não seja infinita)
    // Para simplificar o controle da DOM no início/fim, se o efeito parar, removemos
    setTimeout(() => {
      if (petal.parentNode === this.container) {
        petal.remove();
      }
    }, (duration + delay) * 1000);
  },

  // Rajada rápida de transição que cruza a tela da esquerda para a direita
  burst(count = 150) {
    this.injectStyles();
    
    // Cria um container exclusivo para a rajada ficar por cima de tudo
    const burstContainer = document.createElement('div');
    burstContainer.style.cssText = 'position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; z-index: 9999; pointer-events: none; overflow: hidden;';
    document.body.appendChild(burstContainer);

    for (let i = 0; i < count; i++) {
      const petal = document.createElement('div');
      petal.className = 'sakura-petal';

      // Ajustes específicos para a rajada
      const sizeWidth = Math.random() * 35 + 20; // Pétalas BEM maiores para garantir bloqueio
      const sizeHeight = sizeWidth * 1.2;
      const duration = Math.random() * 1.5 + 1.2; // Rápido (1.2s a 2.7s)
      const delay = Math.random() * 0.5;
      const startY = (Math.random() * 140) - 20; // De -20vh a 120vh

      petal.style.width = `${sizeWidth}px`;
      petal.style.height = `${sizeHeight}px`;
      petal.style.setProperty('--startY', `${startY}vh`);
      
      // Animação de rajada de vento cruzando
      petal.style.animation = `sakura-burst ${duration}s ease-out ${delay}s forwards`;
      
      // Tons mais vivos para a transição
      petal.style.background = 'linear-gradient(135deg, #FFD5E5 0%, #FF69B4 100%)';

      burstContainer.appendChild(petal);
    }
    
    // Remove o container após o fim da última animação
    setTimeout(() => {
      if (burstContainer.parentNode) burstContainer.remove();
    }, 4000);
  },

  // Mini explosão radial (360 graus) a partir de um ponto
  miniBurst(originX, originY, count = 15, targetParent = document.body, zIndex = 9999, isMega = false) {
    this.injectStyles();
    
    if (!document.getElementById('sakura-miniburst-styles')) {
      const style = document.createElement('style');
      style.id = 'sakura-miniburst-styles';
      style.textContent = `
        @keyframes sakura-miniburst {
          0% {
            transform: translate(0, 0) scale(0.2) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translate(var(--tx), var(--ty)) scale(1.5) rotate(var(--rot));
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }

    const burstContainer = document.createElement('div');
    burstContainer.style.cssText = `position: absolute; top: ${originY}px; left: ${originX}px; z-index: ${zIndex}; pointer-events: none; overflow: visible;`;
    targetParent.appendChild(burstContainer);

    for (let i = 0; i < count; i++) {
      const petal = document.createElement('div');
      petal.className = 'sakura-petal';

      const sizeWidth = isMega ? (Math.random() * 60 + 40) : (Math.random() * 15 + 10);
      const sizeHeight = sizeWidth * 1.2;
      const duration = isMega ? (Math.random() * 1.5 + 1.5) : (Math.random() * 0.6 + 0.5); 
      
      const angle = Math.random() * Math.PI * 2;
      const distance = isMega ? (Math.random() * 1000 + 400) : (Math.random() * 150 + 80);
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance;
      const rot = (Math.random() - 0.5) * 720;

      petal.style.width = `${sizeWidth}px`;
      petal.style.height = `${sizeHeight}px`;
      petal.style.position = 'absolute'; // Override do fixed da classe principal
      petal.style.left = '0';
      petal.style.top = '0';
      petal.style.setProperty('--tx', `${tx}px`);
      petal.style.setProperty('--ty', `${ty}px`);
      petal.style.setProperty('--rot', `${rot}deg`);
      
      petal.style.animation = `sakura-miniburst ${duration}s cubic-bezier(0.25, 1, 0.5, 1) forwards`;
      petal.style.background = 'linear-gradient(135deg, #FFD5E5 0%, #FF69B4 100%)';

      burstContainer.appendChild(petal);
    }
    
    setTimeout(() => {
      if (burstContainer.parentNode) burstContainer.remove();
    }, isMega ? 4000 : 1500);
  }
};
