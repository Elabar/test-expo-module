package expo.modules.rntuya

import android.app.Application
import android.content.Context
import android.content.SharedPreferences
import android.util.Log
import androidx.core.os.bundleOf
import com.thingclips.sdk.os.ThingOSUser
import com.thingclips.sdk.user.ThingBaseUserPlugin
import com.thingclips.smart.android.base.ThingSmartSdk
import com.thingclips.smart.android.user.api.ILoginCallback
import com.thingclips.smart.android.user.api.IRegisterCallback
import com.thingclips.smart.android.user.bean.User
import com.thingclips.smart.home.sdk.ThingHomeSdk
import com.thingclips.smart.sdk.api.IResultCallback
import expo.modules.kotlin.Promise
import expo.modules.kotlin.exception.CodedException
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class RnTuyaModule : Module() {
  // Each module class must implement the definition function. The definition consists of components
  // that describes the module's functionality and behavior.
  // See https://docs.expo.dev/modules/module-api for more details about available components.
  override fun definition() = ModuleDefinition {
    // Sets the name of the module that JavaScript code will use to refer to the module. Takes a string as an argument.
    // Can be inferred from module's class name, but it's recommended to set it explicitly for clarity.
    // The module will be accessible from `requireNativeModule('RnTuya')` in JavaScript.
    Name("RnTuya")

    Events("onChangeTheme")

    Function("setTheme") { theme: String ->
      getPreferences().edit().putString("theme", theme).commit()
      this@RnTuyaModule.sendEvent("onChangeTheme", bundleOf("theme" to theme))
    }

    Function("getTheme") {
      return@Function getPreferences().getString("theme", "system")
    }

    Function("setDebugMode"){ isDebug: Boolean ->
      ThingSmartSdk.setDebugMode(isDebug)
    }

    Function("initialize") {
      // TODO: to be implement

    }

    AsyncFunction("sendVerifyCodeWithUserName"){ userName: String, region: String, countryCode: String,type: Int, promise: Promise ->
      ThingHomeSdk.getUserInstance().sendVerifyCodeWithUserName(userName, region, countryCode, type, object: IResultCallback {
        override fun onError(code: String?, error: String?) {
          if (error != null) {
            Log.d("tag", error)
          }
          promise.reject(CodedException(code, Throwable(error)))
        }

        override fun onSuccess() {
          promise.resolve(true)
        }
      })
    }

    AsyncFunction("loginWithEmail"){ countryCode: String, email: String, passwd: String, promise: Promise ->
      ThingHomeSdk.getUserInstance().loginWithEmail(countryCode, email, passwd, object: ILoginCallback {
        override fun onSuccess(user: User?) {
          if(user != null){
            promise.resolve(TuyaUser(username = user.username, sid = user.sid))
          }else{
            promise.resolve(null)
          }
        }

        override fun onError(code: String?, error: String?) {
          if (error != null) {
            Log.d("tag", error)
          }
          promise.reject(CodedException(code, Throwable(error)))
        }
      })

    }

    AsyncFunction("registerAccountWithEmail"){ countryCode: String, email: String, passwd: String, code: String, promise: Promise ->
      ThingHomeSdk.getUserInstance().registerAccountWithEmail(countryCode, email, passwd, code, object : IRegisterCallback {
        override fun onSuccess(user: User?) {
          if(user != null){
            promise.resolve(TuyaUser(username = user.username, sid = user.sid))
          }else{
            promise.resolve(null)
          }
        }

        override fun onError(code: String?, error: String?) {
          if (error != null) {
            Log.d("tag", error)
          }
          promise.reject(CodedException(code, Throwable(error)))
        }
      })
    }
  }

  private val context
  get() = requireNotNull(appContext.reactContext)

  private fun getPreferences(): SharedPreferences {
    return context.getSharedPreferences(context.packageName + ".settings", Context.MODE_PRIVATE)
  }
}
