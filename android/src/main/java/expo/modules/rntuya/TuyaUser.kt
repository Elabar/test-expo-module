package expo.modules.rntuya
import expo.modules.kotlin.records.Field
import expo.modules.kotlin.records.Record

data class TuyaUser(
    @Field
    val username: String,
    @Field
    val sid: String,
): Record
