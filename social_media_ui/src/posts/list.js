import React, {useEffect, useState} from 'react'
import {loadPosts} from './index.js'
import {Post} from './detail'

// List of Posts:
  
export function PostList (props) {
    const [postsInit, setPostsInit] = useState([])
    const [posts, setPosts] = useState([])
    const [postsDidSet, setPostsDidSet] = useState(false)

    let username;
    
    if(props.username) {
        username = props.username
    }

    const myCallback = (response, status) => {
        console.log(status)
      if(status === 200){
        console.log(response)
        setPostsInit(response)
        setPosts(response)
      } else if (status === 400 ){
        alert(response.message)
      }
    }
    
    useEffect(() => {
        if(props.newPosts) {
            let allPosts = [...props.newPosts].concat(postsInit)
        if (allPosts.length !== posts.length) {
            setPosts(allPosts)
        }
        } 
    }, [props.newPosts, posts, postsInit])


    useEffect( () => {
        if (postsDidSet === false) {
            if(username) {
                loadPosts(myCallback, username)
            } else {
                loadPosts(myCallback)
            }
            setPostsDidSet(true)
        }
    }, [username])
    
    const handleDidRepost = (newPost) => {
        if (newPost) {
            const updatedPostsInit = [...postsInit]
            updatedPostsInit.unshift(newPost)
            setPostsInit(updatedPostsInit)
            const updatedPosts = [...posts]
            updatedPosts.unshift(posts)
            setPosts(updatedPosts)
        } else {
            loadPosts(myCallback)
        }

    }


    return <div className="col-md-10 mx-auto col-12 text-center">{posts.map((post, index) => {
      return <Post
      didRepost = {handleDidRepost} 
      post={post} 
      key={index}
      />
    })}</div>
}
