export type Override<T, K extends keyof T, V> = Omit<T, K> & Record<K, V>
