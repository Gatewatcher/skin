import type { FileTextContent } from './types';

export const readFile = async (file: File): Promise<FileTextContent> => {
  const reader = new FileReader();

  return new Promise((resolve, reject) => {
    reader.onload = event => {
      if (event.target) {
        resolve(event.target.result);
      }
    };

    reader.onerror = reject;

    reader.readAsText(file);
  });
};
