const sprintsUrl = `${process.env.REACT_APP_API_BASE_URL}/sprints`;
const categoriesUrl = `${process.env.REACT_APP_API_BASE_URL}/categories`;
const itemsUrl = `${process.env.REACT_APP_API_BASE_URL}/items`;
const itemUrl = `${process.env.REACT_APP_API_BASE_URL}/item`;
const commentsUrl = `${process.env.REACT_APP_API_BASE_URL}/comments`;

export async function getAll() {
  const result = await fetch(sprintsUrl).then((response) => {
    if (response.ok) {
      return response.json();
    }
  });

  return result;
}

export async function getById(id) {
  const result = await fetch(`${sprintsUrl}/${id}`).then((response) => {
    if (response.ok) {
      return response.json();
    }
  });

  return result;
}

export async function getItemById(id) {
  const result = await fetch(`${itemUrl}/${id}`).then((response) => {
    if (response.ok) {
      return response.json();
    }
  });

  return result;
}

export async function getItemsBySprintId(sprintId) {
  const result = await fetch(`${itemsUrl}/${sprintId}`).then((response) => {
    if (response.ok) {
      return response.json();
    }
  });

  return result;
}

export async function setItem(data, id) {
  const options = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' }
  }
  const result = await fetch(`${itemsUrl}`, options).then((response) => {
    if (response.ok) {
      return response.json();
    }
  });

  return result;
}

export async function changeItem(data, id) {
  const options = {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' }
  }
  const result = await fetch(`${itemUrl}/${id}`, options).then((response) => {
    if (response.ok) {
      return response.json();
    }
  });

  return result;
}

export async function deleteItem(id) {
  const options = {
    method: 'DELETE',
  }
  const result = await fetch(`${itemUrl}/${id}`, options).then((response) => {
    if (response.ok) {
      return response.json();
    }
  });

  return result;
}

export async function getCommentsBySprintId(sprintId) {
  const result = await fetch(`${commentsUrl}/${sprintId}`).then((response) => {
    if (response.ok) {
      return response.json();
    }
  });

  return result;
}

export async function getByCategory(category) {
  const result = await fetch(`${category}`).then((response) => {
    if (response.ok) {
      return response.json();
    }
  });

  return result;
}

export async function getCategories() {
  const result = await fetch(`${categoriesUrl}`).then((response) => {
    if (response.ok) {
      return response.json();
    }
  });

  return result;
}