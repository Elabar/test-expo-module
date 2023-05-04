import { requireNativeViewManager } from 'expo-modules-core';
import * as React from 'react';

import { RnTuyaViewProps } from './RnTuya.types';

const NativeView: React.ComponentType<RnTuyaViewProps> =
  requireNativeViewManager('RnTuya');

export default function RnTuyaView(props: RnTuyaViewProps) {
  return <NativeView {...props} />;
}
