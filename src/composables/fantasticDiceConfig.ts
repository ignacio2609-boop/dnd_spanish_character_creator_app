// @ts-expect-error necessary to import the module
import DiceBox from '@3d-dice/dice-box';

let Box: DiceBox | null = null;
let isInitializing = false;
let isInitialized = false;

const colors = [
  '#348888',
  '#22BABB',
  '#9EF8EE',
  '#FA7F08',
  '#F24405',
  '#F25EB0',
  '#B9BF04',
  '#F2B705',
  '#F27405',
  '#F23005',
];

const getRandomColor = () => {
  return colors[Math.floor(Math.random() * colors.length)];
};

const waitForContainer = (selector: string, timeout = 5000): Promise<Element> => {
  return new Promise((resolve, reject) => {
    const element = document.querySelector(selector);
    if (element) {
      resolve(element);
      return;
    }

    const observer = new MutationObserver(() => {
      const el = document.querySelector(selector);
      if (el) {
        observer.disconnect();
        resolve(el);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    setTimeout(() => {
      observer.disconnect();
      reject(new Error(`Timeout waiting for ${selector}`));
    }, timeout);
  });
};

export const initDiceBox = async () => {
  if (isInitializing) {
    while (isInitializing) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    return Box;
  }

  try {
    isInitializing = true;

    // Siempre destruye la instancia anterior
    if (Box) {
      await destroyDiceBox();
    }

    // Espera a que el contenedor exista en el DOM
    const container = await waitForContainer('#dice-box-container');

    // Obtener dimensiones del contenedor para configurar el DiceBox
    const rect = container.getBoundingClientRect();

    Box = new DiceBox({
      assetPath: '/assets/dice-box/',
      container: '#dice-box-container',
      theme: 'default',
      themeColor: '#feea03',
      offscreen: true,
      scale: 8,
      throwForce: 5,
      gravity: 1,
      mass: 1,
      spinForce: 6,
      // Configuración para que se ajuste al contenedor
      width: rect.width || 800,
      height: rect.height || 600,
    });

    await Box.init();
    isInitialized = true;
    return Box;
  } catch (error) {
    console.error('Error al inicializar DiceBox:', error);
    Box = null;
    isInitialized = false;
    throw error;
  } finally {
    isInitializing = false;
  }
};

export const rollDice = async () => {
  if (!isInitialized || !Box) {
    await initDiceBox();
  }

  if (Box) {
    await Box.roll(['4d20', '4d12', '4d10', '4d8', '4d6', '4d4'], {
      themeColor: getRandomColor(),
    });
  }
};

export const rollDiceWithExpression = async (expression: string[]) => {
  if (!isInitialized || !Box) {
    await initDiceBox();
  }

  if (Box) {
    await Box.roll(expression, {
      scale: 10,
      themeColor: getRandomColor(),
    });
  }
};

export const clearDiceBox = () => {
  if (Box && typeof Box.clear === 'function') {
    Box.clear();
  }
};

export const destroyDiceBox = async () => {
  if (Box) {
    try {
      isInitialized = false;
      clearDiceBox();
      if (typeof Box.destroy === 'function') {
        await Box.destroy();
      }
    } catch (error) {
      console.error('Error al destruir DiceBox:', error);
    } finally {
      Box = null;
      isInitialized = false;
    }
  }
};
