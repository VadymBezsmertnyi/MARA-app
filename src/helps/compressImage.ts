import * as FileSystem from "expo-file-system/legacy";
import * as ImageManipulator from "expo-image-manipulator";

const MAX_SIZE_BYTES = 1048576; // 1MB

/**
 * Отримати розмір файлу в байтах
 */
export const getFileSizeBytes = async (uri: string): Promise<number> => {
  try {
    const fileInfo = await FileSystem.getInfoAsync(uri);
    if (fileInfo.exists && fileInfo.isDirectory === false)
      return fileInfo.size || 0;

    return 0;
  } catch (error) {
    console.warn(`[compressImage] Error getting file size for ${uri}:`, error);
    return 0;
  }
};

interface CompressResult {
  uri: string;
  width?: number;
  height?: number;
  sizeBytes: number;
}

/**
 * Стиснути зображення до максимального розміру (за замовчуванням 1 МБ)
 * Алгоритм:
 * 1. Перевірити, чи вже <= maxBytes, повернути оригінал
 * 2. Спробувати стиснути якість (0.9 -> 0.8 -> ... -> 0.4)
 * 3. Якщо все ще занадто великий, спробувати змінити розмір + стиснення
 * 4. Зупинитися, коли <= maxBytes або досягнуто мінімальні межі
 */
export const compressToMaxSize = async (
  uri: string,
  maxBytes: number = MAX_SIZE_BYTES
): Promise<CompressResult> => {
  try {
    let currentSizeBytes = await getFileSizeBytes(uri);
    if (currentSizeBytes <= maxBytes)
      return {
        uri,
        sizeBytes: currentSizeBytes,
      };

    let compressedUri = uri;
    let compressedWidth: number | undefined;
    let compressedHeight: number | undefined;
    const originalImageInfo = await ImageManipulator.manipulateAsync(uri, [], {
      compress: 1,
      format: ImageManipulator.SaveFormat.JPEG,
    });
    let currentWidth = originalImageInfo.width;
    let currentHeight = originalImageInfo.height;
    for (let quality = 0.9; quality >= 0.4; quality -= 0.1) {
      const manipResult = await ImageManipulator.manipulateAsync(uri, [], {
        compress: quality,
        format: ImageManipulator.SaveFormat.JPEG,
      });

      currentSizeBytes = await getFileSizeBytes(manipResult.uri);
      if (currentSizeBytes <= maxBytes)
        return {
          uri: manipResult.uri,
          width: manipResult.width,
          height: manipResult.height,
          sizeBytes: currentSizeBytes,
        };

      compressedUri = manipResult.uri;
      compressedWidth = manipResult.width;
      compressedHeight = manipResult.height;
      currentWidth = manipResult.width;
      currentHeight = manipResult.height;
    }

    const maxSide = Math.max(currentWidth, currentHeight);
    const scalingFactors = [0.9, 0.8, 0.7, 0.6, 0.5];
    for (const scaleFactor of scalingFactors) {
      const newMaxSide = Math.round(maxSide * scaleFactor);
      if (newMaxSide < 720) break;

      const newWidth = Math.round(currentWidth * scaleFactor);
      const newHeight = Math.round(currentHeight * scaleFactor);
      const resizeResult = await ImageManipulator.manipulateAsync(uri, [
        { resize: { width: newWidth, height: newHeight } },
      ]);
      const manipResult = await ImageManipulator.manipulateAsync(
        resizeResult.uri,
        [],
        { compress: 0.7, format: ImageManipulator.SaveFormat.JPEG }
      );

      currentSizeBytes = await getFileSizeBytes(manipResult.uri);
      if (currentSizeBytes <= maxBytes)
        return {
          uri: manipResult.uri,
          width: manipResult.width,
          height: manipResult.height,
          sizeBytes: currentSizeBytes,
        };

      compressedUri = manipResult.uri;
      compressedWidth = manipResult.width;
      compressedHeight = manipResult.height;
    }

    currentSizeBytes = await getFileSizeBytes(compressedUri);
    return {
      uri: compressedUri,
      width: compressedWidth,
      height: compressedHeight,
      sizeBytes: currentSizeBytes,
    };
  } catch (error) {
    console.warn(`[compressImage] Error compressing image ${uri}:`, error);
    const sizeBytes = await getFileSizeBytes(uri);
    return {
      uri,
      sizeBytes,
    };
  }
};
