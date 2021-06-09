const fetch = require("node-fetch");
const baseUrl = process.env.DATABASE_URL;
const sprintsUrl = `${baseUrl}/sprints`;
const categorieUrl = `${baseUrl}/categories`;
const itemsUrl = `${baseUrl}/items`;
const commentsUrl = `${baseUrl}/comments`;

async function fetchResults(url, message = "") {
  const result = await fetch(url).then((response) => {
    if (response.ok) {
      return response.json();
    }
  }).then((response) => {
    if(!response) {
      return message;
    }
    return response
  });
  return result;
}

async function postResults(url, data, message = "") {
  const options = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' }
  }
  const result = await fetch(url, options).then((response) => {
    if (response.ok) {
      return response.json();
    }
  }).then((response) => {
    if(!response) {
      return message;
    }
    return response
  });
  return result;
}

async function putResults(url, data, message = "") {
  const options = {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' }
  }
  const result = await fetch(url, options).then((response) => {
    if (response.ok) {
      return response.json();
    }
  }).then((response) => {
    if(!response) {
      return message;
    }
    return response
  });
  return result;
}

async function deleteResults(url, message = "") {
  const options = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  }
  const result = await fetch(url, options).then((response) => {
    if (response.ok) {
      return response.json();
    }
  }).then((response) => {
    if(!response) {
      return message;
    }
    return response
  });
  return result;
}

const getAll = async () => await fetchResults(sprintsUrl, `Oops... no results found.`);
const getById = async (id) => await fetchResults(`${sprintsUrl}/${id}`, `Oops... result with id: ${id} is not found`);
const getItemById = async (id) => await fetchResults(`${itemsUrl}/${id}`, `Oops... result with id: ${id} is not found`);
const getItemsBySprintId = async (sprintId) => await fetchResults(`${itemsUrl}?sprintId=${sprintId}`, `Oops... result with id: ${sprintId} is not found`);
const getCommentsBySprintId = async (sprintId) => await fetchResults(`${commentsUrl}/${sprintId}`, `Oops... result with id: ${sprintId} is not found`);
const getByCategory = async (category) => await fetchResults(`${sprintsUrl}?category=${category}`, `Oops... no results found with category id: ${id}`);
const getCategories = async () => await fetchResults(`${categorieUrl}`, `Oops... no results found with categories`);

const setItem = async (data) => await postResults(`${itemsUrl}`, data, `Oops... result is not found`);
const setSprint = async () => await postResults(`${sprintsUrl}`, `Oops... result is not found`);

const changeItem = async (id, data) => await putResults(`${itemsUrl}/${id}`, data, `Oops... change result is not found`);

const deleteItem = async (id) => await deleteResults(`${itemsUrl}/${id}`, `Oops... delete result is not found`);

module.exports = {
  getAll: getAll,
  getById: getById,
  getItemById: getItemById,
  getItemsBySprintId: getItemsBySprintId,
  setItem: setItem,
  setSprint: setSprint,
  getCommentsBySprintId: getCommentsBySprintId,
  getByCategory: getByCategory,
  changeItem: changeItem,
  deleteItem: deleteItem,
  getCategories: getCategories,
}