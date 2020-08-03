import React from 'react'
import {postAction} from './lookup'
import {Post} from './detail'
import {PostList} from './list'

// Buttons 

export function ActionBtn(props) {
    const {post, action, didPerformAction} = props
    const likes = post.likes ? post.likes : 0
    // const [likes, setLikes] = useState(post.likes ? post.likes : 0)
    const actionDisplay = action.display ? action.display : 'Action'
    // const [userLike, setUserLike] = useState(post.userLike === true ? true : false)
    const className = action.type === 'like' ? "btn btn-outline-success mt-3 btn-sm" : 
    action.type === 'unlike' ? "btn btn-outline-secondary mt-3 btn-sm" : 
    "btn btn-outline-info mt-3 btn-sm"

    const handleBackendAction = (response, status) =>  {
        console.log(status, response)
        if ((status === 200 || status === 201) && didPerformAction) {
            didPerformAction(response, status)
        }
    }


    const handleClick = (event) => {
        event.preventDefault()
        if (action.type === 'repost') {
            postAction(post.id, action.type, handleBackendAction, 'Repost')
            window.location.reload(true);
        } else {
            postAction(post.id, action.type, handleBackendAction)
        }
       
    }

    const display = action.type === 'like' ? `${likes} ${actionDisplay}` : `${actionDisplay}`

    return <React.Fragment> 
        <button className={className} onClick={handleClick}>
        {display} 
        </button>
        </React.Fragment>
}
