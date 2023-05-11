import { EventEmitter, Subscription } from "expo-modules-core";

import RnTuyaModule from "./RnTuyaModule";

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

export function addThemeListener(
  listener: (event: ThemeChangeEvent) => void
): Subscription {
  return emitter.addListener<ThemeChangeEvent>("onChangeTheme", listener);
}

export function setDebugMode(isDebug: boolean): void {
  return RnTuyaModule.setDebugMode(isDebug);
}

export async function registerAccountWithEmail(
  countryCode: string,
  email: string,
  passwd: string,
  code: string
): Promise<unknown> {
  return await RnTuyaModule.registerAccountWithEmail(
    countryCode,
    email,
    passwd,
    code
  );
}

export async function sendVerifyCodeWithUserName(
  userName: string,
  region: string,
  countryCode: string,
  type: number
) {
  await RnTuyaModule.sendVerifyCodeWithUserName(
    userName,
    region,
    countryCode,
    type
  );
}

interface ITuyaUser {
  username: string;
  sid: string;
  uid: string
}

export async function loginWithEmail(
  countryCode: string,
  email: string,
  passwd: string
): Promise<ITuyaUser | null> {
  return await RnTuyaModule.loginWithEmail(countryCode, email, passwd);
}

export function initialize() {
  return RnTuyaModule.initialize();
}
