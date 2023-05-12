import ExpoModulesCore
import ThingSmartBaseKit

struct SendVerifyCodeWithUserNameOptions: Record {
    @Field
    var userName: String
    @Field
    var region: String
    @Field
    var countryCode: String
    @Field
    var type: Int
}

struct LoginWithEmailOptions: Record {
    @Field
    var countryCode: String
    @Field
    var email: String
    @Field
    var passwd: String
}

struct RegisterAccountWithEmailOptions: Record {
    @Field
    var email: String
    @Field
    var passwd: String
    @Field
    var countryCode: String
    @Field
    var code: String
}

public class RnTuyaUser: Module {
    // Each module class must implement the definition function. The definition consists of components
    // that describes the module's functionality and behavior.
    // See https://docs.expo.dev/modules/module-api for more details about available components.
    public func definition() -> ModuleDefinition {
        // Sets the name of the module that JavaScript code will use to refer to the module. Takes a string as an argument.
        // Can be inferred from module's class name, but it's recommended to set it explicitly for clarity.
        // The module will be accessible from `requireNativeModule('RnTuya')` in JavaScript.
        Name("RnTuyaUser")
        
        Function("getTheme"){ () -> String in
            "system"
        }
        
        AsyncFunction("sendVerifyCodeWithUserName") { (options: SendVerifyCodeWithUserNameOptions, promise: Promise) in
            ThingSmartUser.sharedInstance().sendVerifyCode(withUserName: options.userName, region: options.region, countryCode: options.countryCode, type: options.type, success: {
                promise.resolve(nil)
            }, failure: { error in
                if let e = error {
                    print(e)
                    promise.reject("ERR_SEND_VERIFY_CODE", e.localizedDescription)
                }
            })
        }
        
        AsyncFunction("loginWithEmail") { (options: LoginWithEmailOptions, promise: Promise) in
            ThingSmartUser.sharedInstance().login(byEmail: options.countryCode, email: options.email, password: options.passwd, success: {
                promise.resolve(nil)
            }, failure: { error in
                if let e = error {
                    print(e)
                    promise.reject("ERR_LOGIN_WITH_EMAIL", e.localizedDescription)
                }
            })
        }
        
        AsyncFunction("registerAccountWithEmail"){ (options: RegisterAccountWithEmailOptions, promise: Promise) in
            ThingSmartUser.sharedInstance().register(byEmail: options.countryCode, email: options.email, password: options.passwd, code: options.code, success: {
                promise.resolve(nil)
            }, failure: { error in
                if let e = error {
                    print(e)
                    promise.reject("ERR_REGISTER_ACCOUNT_WITH_EMAIL", e.localizedDescription)
                }
            })
        }
    }
}
