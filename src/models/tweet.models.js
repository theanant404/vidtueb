import mongoose,{Schema} from "mongoose";
import mongoseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const tweetSchema = new Schema({
    content:{
        type:String,
        required:true,
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
},{timestamps:true
});
tweetSchema.plugin(mongoseAggregatePaginate);
export const Tweet = mongoose.model("Tweet",tweetSchema);