import {formatDistanceToNow} from 'date-fns'
import './index.css'

const CommentItem = props => {
  const {itemData, likeActionHandler, deleteActionHandler} = props

  const {
    commentId,
    authorName,
    postedComment,
    creationDateTime,
    isLiked,
    backgroundColorClassName,
  } = itemData

  const timeSinceCommentCreationAsText = formatDistanceToNow(creationDateTime)
  const authorNameInitial = authorName.slice(0, 1).toUpperCase()

  const onClickCommentLikeButton = () => likeActionHandler(commentId)
  const onClickCommentDeleteButton = () => deleteActionHandler(commentId)

  return (
    <li className="comment-item-container">
      <div className="comment-item-content-container">
        <div className="comment-item-author-initial-container">
          <p
            className={`comment-item-author-initial ${backgroundColorClassName}`}
          >
            {authorNameInitial}
          </p>
        </div>

        <div className="comment-item-details-container">
          <div className="comment-item-author-and-creation-date-time-container">
            <p className="comment-item-author-name">{authorName}</p>
            <p className="comment-item-time-to-now">
              {timeSinceCommentCreationAsText}
            </p>
          </div>

          <p className="comment-item-comment-text">{postedComment}</p>
        </div>
      </div>

      <div className="comment-item-actions-container">
        <div className="comment-item-like-action-container">
          {isLiked ? (
            <img
              className="comment-item-like-img"
              src="https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png"
              alt="like"
            />
          ) : (
            <img
              className="comment-item-like-img"
              src="https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png"
              alt="like"
            />
          )}

          <button
            type="button"
            className="comment-item-like-action-button"
            onClick={onClickCommentLikeButton}
          >
            <p
              className={
                isLiked ? 'comment-item-liked-text' : 'comment-item-like-text'
              }
            >
              Like
            </p>
          </button>
        </div>

        <button
          //   testid="delete"
          type="button"
          className="comment-item-delete-action-button"
          onClick={onClickCommentDeleteButton}
        >
          <img
            className="comment-item-delete-icon-img"
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            alt="delete"
          />
        </button>
      </div>

      <hr className="horizontal-line-separator" />
    </li>
  )
}

export default CommentItem
