// Utility to convert Float32Array (from AudioBuffer) to base64 PCM for Gemini
export function float32ToPCM16(float32: Float32Array): DataView {
  const int16 = new Int16Array(float32.length);
  for (let i = 0; i < float32.length; i++) {
    // Clamp values to [-1, 1]
    const s = Math.max(-1, Math.min(1, float32[i]));
    // Convert to 16-bit integer PCM
    int16[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
  }
  return new DataView(int16.buffer);
}

export function arrayBufferToBase64(buffer: ArrayBuffer): string {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

export function base64ToArrayBuffer(base64: string): ArrayBuffer {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}

export function pcm16ToFloat32(pcmData: ArrayBuffer): Float32Array {
  const int16 = new Int16Array(pcmData);
  const float32 = new Float32Array(int16.length);
  for (let i = 0; i < int16.length; i++) {
    float32[i] = int16[i] / 32768.0;
  }
  return float32;
}
