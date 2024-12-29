import mongoose,{Schema} from "mongoose";
import mongoseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const subscriptionSchema = new Schema({
    subscriber:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    channel:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
},{timestamps:true
});
subscriptionSchema.plugin(mongoseAggregatePaginate);
export const Subscription = mongoose.model("Subscription",subscriptionSchema);