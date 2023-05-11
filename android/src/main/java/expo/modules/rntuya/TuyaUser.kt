package expo.modules.rntuya
import expo.modules.kotlin.records.Field
import expo.modules.kotlin.records.Record
import java.io.Serializable

data class TuyaUser(
    @Field
    val username: String,
    @Field
    val sid: String,
): Record

data class SendVerifyCodeWithUserNameOptions(
    @Field
    val userName: String,
    @Field
    val region: String,
    @Field
    val countryCode: String,
    @Field
    val type: Int,
): Record, Serializable

data class LoginWithEmailOptions(
    @Field
    val countryCode: String,
    @Field
    val email: String,
    @Field
    val passwd: String,
): Record, Serializable

data class RegisterAccountWithEmailOptions(
    @Field
    val email: String,
    @Field
    val passwd: String,
    @Field
    val countryCode: String,
    @Field
    val code: String,
): Record, Serializable