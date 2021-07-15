
const SET_USERS = 'users/USERS';
const CREATE_USER = 'users/CREATE_USER';

const setUsers = (users) => {
    return {
        type: SET_USERS,
        users,
    };
};
const createUsers = (user) => {
    return {
        type: CREATE_USER,
        user
    }
}

export const getUsers = () => async (dispatch) => {
    const response = await fetch('/api/users/');
    if (response.ok) {

        const users = await response.json()
        dispatch(setUsers(users));
        return users;
    };
}

export const formUsers = (user) => async (dispatch) => {
    const { name, email, phoneNumber, username, biography, profilePicture } = user;
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phoneNumber', phoneNumber);
    formData.append('username', username);
    formData.append('biography', biography);
    formData.append('profilePicture', profilePicture);

    const response = await fetch('/api/users', {
        method: 'POST',
        body: formData,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

    dispatch(createUsers(response.data.user));
    return response.data.user;
};

export const updateUser = ({ id, name, email, phoneNumber, username, biography, profilePicture }) => async (dispatch) => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phoneNumber', phoneNumber);
    formData.append('username', username);
    formData.append('biography', biography);
    formData.append('profilePicture', profilePicture);
    const response = await fetch(`/api/users/${id}`, {
        method: 'PUT',
        body: formData,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    dispatch(createUsers(response.data.user));
    return response.data.user;
};

export const updateProfilePic = (id, url) => async (dispatch) => {
    const formData = new FormData();
    formData.append('profilePicture', url)
    const fetchUrl = `/api/users/${id}/picture/`
    const options = {
        method: 'PUT',
        body: formData
     }
    const response = await fetch(fetchUrl, options)
    const user = await response.json()
    dispatch(setUsers([user]))
}


const initialState = {};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USERS:
            return { ...state, ...action.users };
        default:
            return state;
    }
};

export default usersReducer
