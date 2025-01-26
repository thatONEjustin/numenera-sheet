export function storageAvailable(type: any) {
  let storage;
  try {
    storage = window[type];
    const x = "__storage_test__";
    (storage as any).setItem(x, x);
    (storage as any).removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      e.name === "QuotaExceededError" &&
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
}
