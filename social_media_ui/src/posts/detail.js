import React, {useEffect, useState} from 'react'
import {createPost} from './index.js'
import {ActionBtn} from './buttons'
import {PostList} from './list'
import {detailPost} from './lookup'



// Posts
export function Post(props) {
    const {didRepost, isRepost, refreshPosts} = props
    const [post, setPost] = useState(props.post ? props.post : null) 
    const [actionPost, setActionPost] = useState(props.post ? props.post : null)
    
    const path = window.location.pathname
    const idRegex = /(?<postid>\d+)/
    const match = path.match(idRegex)
    const postId = match ? match.groups.postid : -1
    const isDetail = `${postId}` === `${post.id}`

    const handlePerformAction = (newActionPost, status) => {
        if (status === 200) {
            setActionPost(newActionPost)
            // didRepost() -> Reloading Parent DOM (useEffect instead)
        } else if (status === 201) {
            setActionPost(newActionPost)
            didRepost(newActionPost)
        }
    }

    

    const handleLink = (event) => {
        event.preventDefault()
       
        window.location.href = `/posts/${post.id}`
        
    }

    useEffect(() => {
        setPost(actionPost)
    }, [post, actionPost])

    let className = "border p-5 m-5  post"
    if (isRepost == undefined) {
        className = "border p-3 m-2 mt-5 post"
    } else {
        className = "border p-3 m-2 mt-3 mb-3 post"
    }

    // Repost -> "border p-5 m-5 post"
    // Post -> "border p-5 m-5 post"

    return <div className={className}>
    <h5> <span id={post.id} > {post.text} </span> </h5>
    <h5><span>{post.parent && <Post post={post.parent} isRepost={false} />}</span></h5>
    { isRepost == undefined ?
        <div className="btn btn-group">
            <ActionBtn post = {post} didPerformAction = {handlePerformAction} action={{type: 'like', display:'Likes'}} />
            <ActionBtn post = {post} didPerformAction = {handlePerformAction} action={{type: 'unlike', display: 'Unlike'}} />
            <ActionBtn post = {post} didPerformAction = {handlePerformAction} action={{type: 'repost', display: 'Repost'}} />
            {isDetail === true ? null : <button className="btn btn-outline-dark mt-3 btn-sm" onClick={handleLink}>View Post</button>}
        </div> : 
            <div className="btn btn-group">{isDetail === true ? null : <button className="btn btn-outline-dark mt-3 btn-sm" onClick={handleLink}>View Post</button>}</div>
    }
    </div>
}



