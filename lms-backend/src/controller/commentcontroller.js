import { Lecture } from "../model/Videos.js";
import { Comment } from "../model/comment.js";

export const createComment = async (req, res) => {
  try {
    const lectureId = req.params.id;
    const { comment } = req.body;
    const userId = req.user._id;
  console.log(comment,"Kij")
    if (!lectureId) {
      return res.status(400).json({ message: "Lecture Id not found" });
    }

    if (!comment) {
      return res.status(400).json({ message: "Comment is required" });
    }

    const lecture = await Lecture.findById(lectureId);
    if (!lecture) {
      return res.status(404).json({ message: "Lecture not found" });
    }

    const newComment = await Comment.create({
      userId,
      lectureId,
      comment
    });

    await Lecture.findByIdAndUpdate(
      lectureId,
      { $push: { comments: newComment._id } },
      { returnDocument: "after" }
    );

    const populatedComment = await Comment.findById(newComment._id).populate(
      "userId",
      "fullName email"
    );

    return res.status(201).json({
      message: "Comment created successfully",
      populatedComment
    });
  } catch (error) {
    console.log("Error from createComment:", error);
    return res.status(500).json({ message: "Server error" });
  }
};


export const getCommentLecture = async (req, res) => {
  try {
    console.log('Calleld')
    const lectureId = req.params.id;
    console.log(lectureId)
    if (!lectureId) {
      return res.status(400).json({
        message: "Please provide lecture id"
      });
    }

    const lectureWithComments = await Lecture.findById(lectureId).populate({
      path: "comments",
      populate: {
        path: "userId",
        select: "fullName email"
      },
      options: { sort: { createdAt: -1 } }
    });

    if (!lectureWithComments) {
      return res.status(404).json({ message: "Lecture not found" });
    }

    return res.status(200).json(lectureWithComments.comments);
  } catch (error) {
    console.log(`Error from getComment: ${error}`);
    return res.status(500).json({ message: "Server error" });
  }
};

