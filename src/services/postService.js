import * as request from "./requester"; //fetch, GET, POST, DELELE

const baseUrl = 'http://localhost:3030/data';

export const getCatalog = () => request.get(`${baseUrl}/books?sortBy=_createdOn%20desc`);//vzimame dannite ot sarvara

export const getDetails = (postId) => request.get(`${baseUrl}/books/${postId}`);

export const create = (postData) => request.post(`${baseUrl}/books`, postData);

export const editPost = (postId, postData) => request.put(`${baseUrl}/books/${postId}`, postData);

export const remove = (postId) => request.del(`${baseUrl}/books/${postId}`);

export const getMyBooks = (userId) => request.get(`${baseUrl}/books?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`)

//likes:
export const likePost = (postId) => request.post(`${baseUrl}/likse`, { postId });

export const totalLikes = (postId) => request.get(`${baseUrl}/likes?where=bookId%3D%22${postId}%22&distinct=_ownerId&count`)
///

