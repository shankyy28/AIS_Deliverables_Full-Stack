const API_URL = 'https://localhost:5000/api/Book';

const handleResponse = async (response) => {
  if (!response.ok) {
    let errorText = 'Something went wrong';
    throw new Error(`HTTP error! Status: ${response.status} - ${errorText}`);
  }
  // Check if there is content before trying to parse as JSON
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.indexOf('application/json') !== -1) {
    return response.json();  // final successful return if response is json (eg: display)
  }
  return response.text();  // final successful return if response is string (eg: delete)
};

export const getNameOfAuthorByBooks = async (id) => {
  const response = await fetch(`https://localhost:5000/api/Author/${id}`,
    {method: 'GET'});
  let data = await handleResponse(response);
  return data.firstName;
};

export const getAllBooks = async () => {
  const response = await fetch(API_URL,
    {method: 'GET'});
  return handleResponse(response);
};

export const getBookById = async (id) => {
  const response = await fetch(`${API_URL}/${parseInt(id)}`,
    {method: 'GET'}
  );
  return handleResponse(response);
};

export const createBook = async (book) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(book),
  });
  return handleResponse(response);
};

export const updateBook = async (id, book) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(book),
  });
  return handleResponse(response);
};

export const deleteBook = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  return handleResponse(response);
};

export const searchBookByTitle = async (name) => {
  const response = await fetch(`${API_URL}/search/${name}`, {
    method: 'GET',
  });
  return handleResponse(response);
};