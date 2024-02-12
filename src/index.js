import path from 'node:path';
import { getTextArea } from './react-tesseract.js';

const __dirname = import.meta.dirname;
const [,, imagePath] = process.argv;
const image = path.resolve(__dirname, (imagePath || 'test.jpeg'));
(async () => {

console.log(`Recognizing ${image}`);

  const text = await getTextArea(image, 0, 0, 300, 50);
  console.log(text);
})();