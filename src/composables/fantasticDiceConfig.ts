// @ts-expect-error necessary to import the module
import DiceBox from '@3d-dice/dice-box';

let Box: DiceBox = null;

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

export const initDiceBox = async () => {
  if (Box) return;

  Box = new DiceBox({
    assetPath: '/assets/dice-box/',
    container: '#dice-box-container',
    theme: 'default',
    themeColor: '#feea03',
    offscreen: true,
    scale: 6,
    throwForce: 5,
    gravity: 1,
    mass: 1,
    spinForce: 6,
  });
  Box.init();
};

export const rollDice = async () => {
  if (!Box) {
    console.warn('Box no estaba inicializado, intentando inicializar ahora...');
    // Fallback por si el DOM no está listo
    await initDiceBox();
  }
  await Box.roll(['4d20', '4d12', '4d10', '4d8', '4d6', '4d4'], {
    themeColor: getRandomColor(),
  });
};
