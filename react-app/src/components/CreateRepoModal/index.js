import React, { useState } from "react";
import styles from "./styles.module.css";
import { useHistory } from 'react-router-dom';
import { IoAddCircle } from "react-icons/io5";
import { useDispatch} from 'react-redux'
import { createRepo } from '../../store/repo'

const CreateRepoModal = ({setShowModal}) => {
	const dispatch = useDispatch();
	/*
A hook to access the redux dispatch function.

Note for redux-thunk users: the return type of the returned dispatch functions for thunks is incorrect. However, it is possible to get a correctly typed dispatch function by creating your own custom hook typed from the store's dispatch function like this: const useThunkDispatch = () => useDispatch<typeof store.dispatch>();

@returns — redux store's dispatch function

@example

import React from 'react'
import { useDispatch } from 'react-redux'


	*/
	const history = useHistory();
	const [title, setTitle] = useState('')
	const [errors, setErrors] = useState('')

	
	const updateTitle = (e) => {
        setTitle(e.target.value)
    }
    const addNewRepo = async () => {
		let res = await dispatch(createRepo(title))
		if(res.errors) return setErrors(res.errors)
		history.push(`/create/${res.repo_id}`)
		setShowModal(false)
    }
    
    return (
		<div className={styles.createRepoContainer}>
			<div className={styles.repoWrapper}>
				<div className={styles.repoTitle}>TITLE</div>
				<div>{errors}</div>
				<input
					className={styles.input}
					type="text"
					name="title"
					placeholder='Title Name'
					onChange={updateTitle}
					value={title}
					required={true}
					maxLength="14"
                ></input>
				{title.length > 0 && <IoAddCircle className={styles.icon} onClick={addNewRepo} />
				}
			</div>
		</div>
	);
};

export default CreateRepoModal;
