import { NativeModulesProxy, EventEmitter, Subscription } from 'expo-modules-core';

// Import the native module. On web, it will be resolved to RnTuya.web.ts
// and on native platforms to RnTuya.ts
import RnTuyaModule from './RnTuyaModule';
import RnTuyaView from './RnTuyaView';
import { ChangeEventPayload, RnTuyaViewProps } from './RnTuya.types';

// Get the native constant value.
export const PI = RnTuyaModule.PI;

export function hello(): string {
  return RnTuyaModule.hello();
}

export async function setValueAsync(value: string) {
  return await RnTuyaModule.setValueAsync(value);
}

const emitter = new EventEmitter(RnTuyaModule ?? NativeModulesProxy.RnTuya);

export function addChangeListener(listener: (event: ChangeEventPayload) => void): Subscription {
  return emitter.addListener<ChangeEventPayload>('onChange', listener);
}

export { RnTuyaView, RnTuyaViewProps, ChangeEventPayload };
