const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const dislikeSchema = mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    commentId: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
    videoId: {
      type: Schema.Types.ObjectId,
      ref: "Video",
    },
  },
  { timestamps: true }
);
const Dislike = mongoose.model("Dislike", dislikeSchema); //1st모델의이름,2nd데이터

module.exports = Dislike; //다른파일에서사용가능
