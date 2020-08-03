import React, {useEffect, useState} from 'react'
import {createPost} from './index.js'
import {PostList} from './list'
import {detailPost} from './lookup'
import {Post} from './detail'

// Form

export function PostComponent(props) {

    const username = props.username
    let personal = props.personal
    const canPost = props.canPost
    
    const [newPosts, setNewPosts] = useState([])

    const handleSubmit = (event) => {
        event.preventDefault()
        const newValue = textAreaRef.current.value
        let tempNewPosts = [...newPosts]

        createPost(newValue, (response, status) => {
            if (status === 201) {
                console.log(response)
                tempNewPosts.unshift(response)
                setNewPosts(tempNewPosts)
            } else {
                alert("Something's not right. Please try again.")
            }
        })
        
        
        textAreaRef.current.value = ''
    }

    const textAreaRef = React.createRef()
    if(personal == true) {
        return <div className="col-md-10 mx-auto col-12 text-center">
            <h3>{username}</h3>
            {canPost == 'true' &&
            <div className="mt-5 col-md-8 mx-auto col-10 text-center"> 
                <form onSubmit={handleSubmit} className="form-group mt-3">
                    <textarea required={true} ref={textAreaRef} placeholder="Your Post!" className="form-control" name="post" cols="10" rows="8">
                    </textarea>
                    <button type="submit" className="btn btn-success colorme my-3">
                        Post
                    </button>
                </form>
            </div> }
        <PostList newPosts={newPosts} username={username} /> :
        {/* <PostList newPosts={newPosts} /> */}
    </div>
    } else {
        return <div className="col-md-10 mx-auto col-12 text-center">
        <h3>{username}</h3>
        {canPost == 'true' &&
        <div className="mt-5 col-md-8 mx-auto col-10 text-center">
            <form onSubmit={handleSubmit} className="form-group mt-3">
                <textarea required={true} ref={textAreaRef} placeholder="Your Post!" className="form-control" name="post" cols="10" rows="8">
                </textarea>
                <button type="submit" className="btn btn-success colorme my-3">
                    Post
                </button>
            </form>
        </div> }
        {/* <PostList newPosts={newPosts} username={username} /> : */}
        <PostList newPosts={newPosts} />
    </div>
    }
    
}


// Detailed Post

export function PostDetailComponent(props) {
    const postId = props.postid
    console.log('Post Id: ', postId)
    const [didLookup, setDidLookup] = useState(false)
    const [post, setPost] = useState(null)

    const myCallback = (response, status) => {
        console.log(response)
        if (status === 200 || status === 201) {
            setPost(response)
        } else {
            alert('The requested Post acannot be fetched. Try again later.')
        }
    }
    
    useEffect(() => {
        if (didLookup === false) {
            detailPost(myCallback, postId)
            setDidLookup(true)
        }
    }, [postId, didLookup, setDidLookup])

    return post === null ? null : <Post post={post} />
}