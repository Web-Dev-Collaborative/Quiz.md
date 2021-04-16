import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import style from "react-syntax-highlighter/dist/esm/styles/hljs/a11y-dark";
import styles from "./styles.module.css";
import { Modal } from "../../context/Modal";
// For the grid component
import { useSelector } from "react-redux";
import CreateRepoModal from '../CreateRepoModal'

const MainPage = () => {
	const [showModal, setShowModal] = useState(false);
	let history = useHistory();
	const user = useSelector((state) => state.session.user);
	// TODO
	const redirectQuiz = () => {
		let repoId = 2;
		history.push(`/practice/${repoId}`);
	};
	const redirectCreate = () => {
		let id = 2;
		history.push(`/create/${id}`);
	};
	const redirectProfile = () => {
		history.push(`/profile/${user.id}`);
	};

	useEffect(() => {
		if (!user) return;
		console.log(user);
	}, [user]);

	return (
		<>
			<div className={styles.mainPage}>
				<div className={styles.contentWrapper}>
					{/* <div className={styles.contentWrapper}>     
                    </div> */}
					<div className={styles.contentContainer}>
						<div className={styles.contentHeader}>Quiz.md</div>
						<div className={styles.content}>
                            A learning site that allows software engineers to study various
                            topics using a markdown template
						</div>
                        <div className={styles.quickLinks}>Quick Links</div>
						<div className={styles.contentOptions}>
							<div className={styles.contentOption} onClick={redirectProfile}>View Profile</div>
                            <div className={styles.contentOption} onClick={redirectQuiz}>Sample Quiz</div>
                            <div className={styles.contentOption} onClick={redirectCreate}>Create Quiz</div>

						</div>
						<button onClick={() => setShowModal(true)}>Modal</button>
						{showModal && (
										<Modal onClose={() => setShowModal(false)}>
											<CreateRepoModal setShowModal={setShowModal} />
										</Modal>
									)}
					</div>
				</div>

				{/* Grid for future development */}
				{/* <div className={styles.categories}> */}
				{/* Grid Item One */}
				{/* <div className={styles.rightContainer} >
                        <div className={style.altContainer}>
                            <h1 onClick={redirectCreate}>Redirect Create </h1>
                            <h1 onClick={redirect}>Redirect </h1>
                            <h1 onClick={redirectProfile}>Redirect  Profile</h1>

                        </div>
                    </div> */}
				{/* Else */}

				{/* Grid Item Two  */}
				{/* <div className={styles.recentContainer}>
						<div className={styles.topics}>
							<div className={style.topicsContainer}>
								<div className={styles.topicHeader}>Popular Subjects</div>
								<div className={styles.linkContainer}>
									<a>Python Methods</a>
									<a>Interview Material</a>
								</div>
							</div>
						</div>
                    </div> */}
				{/* </div> */}
			</div>
		</>
	);
};

export default MainPage;
