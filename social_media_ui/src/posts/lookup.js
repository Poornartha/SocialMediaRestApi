import {lookup} from '../lookup/index.js' 

// Sending to Backend

export function createPost(newPost, callback) {
    console.log(newPost)
    lookup('POST', 'create', callback, {text: newPost})
}
  
// Loading Posts
  
export function loadPosts (callback, username) {
  let endpoint = ''
  if (username) {
    endpoint = `user/${username}`
  }
  lookup('GET', endpoint, callback)
}

// Detailed Post:
export function detailPost (callback, postId) {
  lookup('GET', `${postId}`, callback)
}

// Action Button 
export function postAction (postId, action, callback, content='') {
  if(content !== '') {
    lookup('POST', 'action', callback, {id: postId, action: action, content: content})
  } else {
    lookup('POST', 'action', callback, {id: postId, action: action})
  }
  
}