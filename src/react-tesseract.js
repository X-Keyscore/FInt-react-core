import { createWorker } from 'tesseract.js';
import fs from 'node:fs';

const convertImage = (imageSrc) => {
	const data = atob(imageSrc.split(',')[1])
		.split('')
		.map((c) => c.charCodeAt(0));

	return new Uint8Array(data);
}

export async function getTextArea(image, top, left, width, height) {
	const worker = await createWorker('fra+eng');
	const { data, data: { imageBinary } } = await worker.recognize(image,
		{
			rectangle: { top, left, width, height },
			rotateAuto: true
		},
		{ imageBinary: true }
	);
	fs.writeFileSync('debug.png', convertImage(imageBinary));
	await worker.terminate();
	return (data.text);
}