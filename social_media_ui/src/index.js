import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {PostDetailComponent, PostList, PostComponent} from './posts'



const e = React.createElement



// pageDetail.forEach( (container) => {
//   ReactDOM.render(
//     <React.StrictMode>
//       <PostDetailComponent postId = {container.dataset.postid} />
//     </React.StrictMode>,
//     container
//   );
// })

const page = document.getElementById('page-root')
if (page) {
	if (page.dataset.personal) {
		ReactDOM.render(
			(<React.Fragment>
				<PostComponent username={page.dataset.username} canPost={page.dataset.canpost}/>
			</React.Fragment>), page
		)
	} else {
		ReactDOM.render(
			e(PostComponent, page.dataset), page
		)
	}
}


const pageDetailHtml = document.querySelectorAll('.rootdetail')
console.log(pageDetailHtml)
// var pageDetail = Array.from(pageDetailHtml);
// console.log(pageDetail)
pageDetailHtml.forEach((container) => {
	ReactDOM.render(
		e(PostDetailComponent, container.dataset), container
	)
})

// ReactDOM.render(
//   <React.StrictMode>
//     <App username={page.dataset.username} personal={page.dataset.personal} canPost={page.dataset.canpost}/>
//   </React.StrictMode>,
//   document.getElementById('root')
// );




// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
