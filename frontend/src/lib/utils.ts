import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const translateMatrix = <ValueType>(matrix: Array<Array<ValueType>>): Array<Array<ValueType>> => {
  const translatedMatrix: Array<Array<ValueType>> = Array.from({
    length: matrix?.[0].length || 0,
  }).map(() => Array.from({ length: matrix.length }));

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      translatedMatrix[i][j] = matrix?.[j]?.[i];
    }
  }

  return translatedMatrix;
}