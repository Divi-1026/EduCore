import { useState } from "react";
import { useGetCommentHook, useCreateCommentHook } from "@/hooks/comment.hook";

const CommentSection = ({ lectureId, courseId }) => {
  const [commentText, setCommentText] = useState("");
  
  const { data: comments = [], refetch: refetchComments } = 
    useGetCommentHook(lectureId, { enabled: !!lectureId });
   console.log("Comments data:", comments);
  const { mutate: createComment } = useCreateCommentHook(lectureId);

  const handlePostComment = () => {
    if (!commentText.trim() || !lectureId) return;
    
    createComment(
      { 
        courseId, 
        lectureId, 
        comment: commentText 
      },
      { 
        onSuccess: () => { 
          setCommentText(""); 
          refetchComments(); 
        } 
      }
    );
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handlePostComment();
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md">
      <h3 className="text-xl font-semibold mb-4">Comments</h3>
      
      <div className="flex gap-2 mb-4">
        <input
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Write a comment..."
          className="flex-1 border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
        />
        <button
          onClick={handlePostComment}
          disabled={!commentText.trim()}
          className="bg-black text-white px-4 py-2 rounded-xl hover:bg-gray-800 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Post
        </button>
      </div>

      <div className="space-y-2 max-h-96 overflow-y-auto">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div 
              key={comment._id} 
              className="border p-3 rounded-xl bg-gray-50"
            >
              <p className="text-sm">{comment.comment}</p>
              {comment.createdAt && (
                <span className="text-xs text-gray-500 mt-1 block">
                  {new Date(comment.createdAt).toLocaleString()}
                </span>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm text-center py-4">
            No comments yet. Be the first to comment!
          </p>
        )}
      </div>
    </div>
  );
};

export default CommentSection;