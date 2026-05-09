// utils/chunkText.js

export function chunkText(text) {
  if (!text) return [];

  // 500 characters per chunk
  return text.match(/.{1,500}/g) || [];
}