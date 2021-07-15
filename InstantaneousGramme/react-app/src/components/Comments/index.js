import React, { useState } from "react";
import "./dropdown.css";
import "./comments.css";
import CommentContent from "./comment"
import { useSelector } from "react-redux";
import { Modal } from "../../Context/Modal"
import ModalPost from "../ProfilePage/modalClickPost"


const Comments = ({postId}) => {
	const comments = useSelector((state) => state.posts[postId].comments)
	const user = useSelector((state) => state.session.user);
	const post = useSelector((state) => state.posts[postId])
	const [showModal, setShowModal] = useState(false)

	return (
		<>
			{comments && comments.length > 2 ?
				<span onClick={() => setShowModal(true)}>{`View all ${comments.length} comments`}</span> : null}
			{comments &&
				user &&
				comments.slice(0, 2).map((comment) => (
					<CommentContent comment={comment} key={comment.id} />
				))}
			{showModal &&
				(<Modal onClose={() => {
					setShowModal(false)
				}}>
					<ModalPost post={post} user={user} />
				</Modal>)
			}
		</>
	);
};

export default Comments;
