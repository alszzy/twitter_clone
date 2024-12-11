import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    text: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    /*
    extension:
    likes: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        }
    ],
    */
    comments: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
            text: {
                type: String,
                required: true
            },
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ],
},{timestamps: true}
)

const Post = mongoose.model("Post", postSchema);
export default Post;