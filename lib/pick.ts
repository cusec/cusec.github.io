export function pickByKey<T, K extends keyof T>(
  items: T[],
  key: K,
  values: ReadonlyArray<T[K]>,
): T[] {
  return values.map((value) => {
    const found = items.find((item) => item[key] === value);

    if (!found) {
      throw new Error(`Missing ${String(key)}=${String(value)}`);
    }

    return found;
  });
}
