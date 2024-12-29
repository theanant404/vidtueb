import mongoose,{Schema} from "mongoose";
import mongoseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const likeSchema = new Schema({
    videos:{
        type:Schema.Types.ObjectId,
        ref:"Video",
        required:true,
    },
    comment:{
        type:Schema.Types.ObjectId,
        ref:"Comment",
    },
    tweet:{
        type:Schema.Types.ObjectId,
        ref:"Tweet",
    },
    likedBy:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    islike:{
        type:Boolean,
        default:false,
    },
},{timestamps:true});
likeSchema.plugin(mongoseAggregatePaginate);
export const Like = mongoose.model("Like",likeSchema);