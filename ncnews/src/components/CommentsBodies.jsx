import React, { Component } from 'react';
import { getComments } from '../api';
import DeleteCommentCard from '../components/deleteCommentsCard'
import PostCommentComponent from './PostCommentComponent';



class CommentsBodies extends Component {
    state = {
        commentsBody: []

    }

    render() {
        console.log(this.state.commentsBody);
        return (
            <div>
                <PostCommentComponent id={this.props.id}
                    currentUserLogin={this.props.currentUserLogin}
                    AddCommentState={this.AddCommentState} />
                {this.state.commentsBody.map((comment) => {
                    //DELETE COMMENT CARD CURRENTLY CONTANS WHOLE COMMENT, THIS MIGHT NOT BE OPTIMAL
                    return (<div>
                        <DeleteCommentCard comment={comment} currentUserLogin={this.props.currentUserLogin} commentsFilter={this.commentsFilter} />
                    </div>
                    )
                })}
            </div>
        );
    }

    componentDidMount() {
        getComments(this.props).then((res) => {
            console.log(res.data.comments, "res.data.comments");
            this.setState({ commentsBody: res.data.comments })
        })
    }
    componentDidUpdate(prevProps) {
        if (this.props.id !== prevProps.id) {
            getComments(this.props).then((res) => {
                console.log(res.data.comments, "res.data.comments");
                this.setState({ commentsBody: res.data.comments })
            })
        }
    }
    commentsFilter = (commentsID) => {

        console.log(commentsID);
        const filteredComments = this.state.commentsBody.filter(comment => comment.comment_id !== commentsID);
        console.log({ filteredComments });
        this.setState({ commentsBody: filteredComments })
    }
    AddCommentState = (comment) => {
        console.log(this.state.commentsBody)
        const newCommentsArray = [...this.state.commentsBody, comment];

        this.setState({
            commentsBody: newCommentsArray

        })
    }



}




export default CommentsBodies;