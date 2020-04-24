export interface Window {
  destroy(): void;
  events(): void;
  on(event: string, cb: () => void): void;
}
