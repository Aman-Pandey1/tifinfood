// Provides a resilient storage API that prefers native AsyncStorage and
// gracefully falls back to an in-memory implementation when the native
// module is unavailable (e.g., dev emulators before a proper rebuild).

let storageImpl;

try {
  // Attempt to use the real native module. If it's not available at runtime,
  // the import itself works but accessing methods may throw; we validate below.
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const NativeAsyncStorage = require('@react-native-async-storage/async-storage').default;
  if (NativeAsyncStorage && typeof NativeAsyncStorage.getItem === 'function') {
    storageImpl = NativeAsyncStorage;
  }
} catch (error) {
  // Ignore; we'll use the fallback implementation.
}

if (!storageImpl) {
  const memoryStore = new Map();
  storageImpl = {
    async getItem(key) {
      return memoryStore.has(key) ? String(memoryStore.get(key)) : null;
    },
    async setItem(key, value) {
      memoryStore.set(key, String(value));
    },
    async removeItem(key) {
      memoryStore.delete(key);
    },
    async clear() {
      memoryStore.clear();
    },
    async multiSet(pairs) {
      for (const [k, v] of pairs) memoryStore.set(k, String(v));
    },
    async multiGet(keys) {
      return keys.map((k) => [k, memoryStore.has(k) ? String(memoryStore.get(k)) : null]);
    },
  };
}

export default storageImpl;

