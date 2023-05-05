import { EventEmitter, Subscription } from 'expo-modules-core';
import RnTuyaModule from './RnTuyaModule';

const emitter = new EventEmitter(RnTuyaModule);

export type ThemeChangeEvent = {
  theme: string;
};

export function getTheme(): string {
  return RnTuyaModule.getTheme();
}

export function setTheme(theme: string): void {
  return RnTuyaModule.setTheme(theme);
}

export function addThemeListener(listener: (event: ThemeChangeEvent) => void): Subscription {
  return emitter.addListener<ThemeChangeEvent>('onChangeTheme', listener);
}