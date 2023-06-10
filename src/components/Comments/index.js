import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import './index.css'

import CommentItem from '../CommentItem'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

export default class Comments extends Component {
  state = {
    name: '',
    comment: '',
    commentsList: [],
  }

  onAddComment = addCommentEvent => {
    addCommentEvent.preventDefault()

    this.setState(prevCommentsState => {
      const {name, comment, commentsList} = prevCommentsState

      const randomClassNamesListIndex =
        Math.floor(Math.random() * 100) %
        initialContainerBackgroundClassNames.length

      const randomBackgroundColorClassName =
        initialContainerBackgroundClassNames[randomClassNamesListIndex]

      const newComment = {
        commentId: uuidv4(),
        authorName: name,
        postedComment: comment,
        creationDateTime: new Date(),
        isLiked: false,
        backgroundColorClassName: randomBackgroundColorClassName,
      }

      const updatedCommentsList = [...commentsList, newComment]
      const updatedCommentsState = {
        name: '',
        comment: '',
        commentsList: updatedCommentsList,
      }

      return updatedCommentsState
    })
  }

  onNameChange = nameChangeEvent => {
    const updatedName = nameChangeEvent.target.value

    this.setState({
      name: updatedName,
    })
  }

  onCommentChange = commentChangeEvent => {
    const updatedComment = commentChangeEvent.target.value

    this.setState({
      comment: updatedComment,
    })
  }

  onCommentLikeToggle = toggledCommentId => {
    this.setState(previousCommentsState => {
      const {commentsList} = previousCommentsState

      const updatedCommentsList = commentsList.map(commentsListItem => {
        if (commentsListItem.commentId === toggledCommentId) {
          const updatedCommentsListItem = {
            ...commentsListItem,
            isLiked: !commentsListItem.isLiked,
          }
          return updatedCommentsListItem
        }

        return commentsListItem
      })

      return {
        commentsList: updatedCommentsList,
      }
    })
  }

  onCommentDelete = toBeDeletedCommentId => {
    this.setState(previousCommentsState => {
      const {commentsList} = previousCommentsState

      const updatedCommentsList = commentsList.filter(
        commentsListItem => commentsListItem.commentId !== toBeDeletedCommentId,
      )

      return {
        commentsList: updatedCommentsList,
      }
    })
  }

  render() {
    const {name, comment, commentsList} = this.state

    return (
      <div className="comments-app-bg-container">
        <div className="comments-content-container">
          <h1 className="comments-header">Comments</h1>
          <div className="top-img-and-form-container">
            <img
              className="comments-img"
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              alt="comments"
            />
            <form
              className="form-content-container"
              onSubmit={this.onAddComment}
            >
              <p className="form-header">
                Say something about 4.0 Technologies
              </p>
              <input
                type="text"
                className="form-input"
                placeholder="Your Name"
                value={name}
                onChange={this.onNameChange}
              />
              <textarea
                className="form-textarea"
                placeholder="Your Comment"
                value={comment}
                onChange={this.onCommentChange}
              />
              <button type="submit" className="form-submit-button">
                Add Comment
              </button>
            </form>
          </div>
          <hr className="horizontal-line-separator" />
          <div className="comments-container">
            <div className="comments-count-container">
              <p className="comments-count">{commentsList.length}</p>
              <p className="comments-count-header">Comments</p>
            </div>
            <ul className="comment-items-container">
              {commentsList.map(commentListItem => (
                <CommentItem
                  key={commentListItem.commentId}
                  itemData={commentListItem}
                  likeActionHandler={this.onCommentLikeToggle}
                  deleteActionHandler={this.onCommentDelete}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
