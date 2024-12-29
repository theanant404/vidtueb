import mongoose,{Schema} from "mongoose";
import mongoseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const playlistSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    videos:[{
        type:Schema.Types.ObjectId,
        ref:"Video"
    }],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
    },
    ispublic:{
        type:Boolean,
        default:false,
    },
}
,{timestamps:true});
playlistSchema.plugin(mongoseAggregatePaginate);
export const Playlist = mongoose.model("Playlist",playlistSchema);