import * as React from 'react';

import { RnTuyaViewProps } from './RnTuya.types';

export default function RnTuyaView(props: RnTuyaViewProps) {
  return (
    <div>
      <span>{props.name}</span>
    </div>
  );
}
