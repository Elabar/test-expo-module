import RnTuyaModule from "./RnTuyaModule";

export async function registerAccountWithEmail({
  countryCode,
  email,
  passwd,
  code,
}: {
  countryCode: string;
  email: string;
  passwd: string;
  code: string;
}): Promise<unknown> {
  return await RnTuyaModule.registerAccountWithEmail({
    countryCode,
    email,
    passwd,
    code,
  });
}

export async function sendVerifyCodeWithUserName({
  userName,
  region,
  countryCode,
  type,
}: {
  userName: string;
  region: string;
  countryCode: string;
  type: number;
}) {
  await RnTuyaModule.sendVerifyCodeWithUserName({
    userName,
    region,
    countryCode,
    type,
  });
}

interface ITuyaUser {
  username: string;
  sid: string;
  uid: string;
}

export async function loginWithEmail({
  countryCode,
  email,
  passwd,
}: {
  countryCode: string;
  email: string;
  passwd: string;
}): Promise<ITuyaUser | null> {
  return await RnTuyaModule.loginWithEmail({ countryCode, email, passwd });
}

export function initialize() {
  return RnTuyaModule.initialize();
}
