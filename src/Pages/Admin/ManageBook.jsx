

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const ManageBook = ({ onAddSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    key: 'createdAt',
    direction: 'desc',
  });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const IMGBB_API_KEY = 'dcd01d6125b24a1e118c8af2faf7192a';

  const categories = [
    'Fiction',
    'Non-Fiction',
    'Science & Technology',
    'Biography',
    'Self-Help',
    'History',
    'Fantasy',
  ];

  // Fetch books
  const fetchBooks = async () => {
    try {
      const res = await axios.get('http://localhost:3000/books');
      setBooks(res.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // Prefill form when editing
  useEffect(() => {
    if (editingBook) {
      setValue('bookName', editingBook.name);
      setValue('bookPages', editingBook.pages);
      setValue('bookRating', editingBook.rating);
      setValue('bookDescription', editingBook.description);
      setValue('bookCategory', editingBook.category);
    } else {
      reset();
    }
  }, [editingBook, setValue, reset]);

  // Sorting
  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedBooks = [...books].sort((a, b) => {
    const key = sortConfig.key;
    if (!a[key] || !b[key]) return 0;

    if (key === 'name' || key === 'category') {
      return sortConfig.direction === 'asc'
        ? a[key].localeCompare(b[key])
        : b[key].localeCompare(a[key]);
    } else if (key === 'createdAt') {
      return sortConfig.direction === 'asc'
        ? new Date(a[key]) - new Date(b[key])
        : new Date(b[key]) - new Date(a[key]);
    } else {
      return sortConfig.direction === 'asc' ? a[key] - b[key] : b[key] - a[key];
    }
  });

  // Add / Update book
  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const pages = parseInt(data.bookPages);
      if (isNaN(pages) || pages <= 0) {
        alert('Pages must be a number greater than 0');
        return;
      }

      const rating = parseFloat(data.bookRating) || 0;
      if (rating < 0 || rating > 5) {
        alert('Rating must be between 0 and 5');
        return;
      }

      let imageUrl = editingBook?.image || '';

      if (data.bookImage?.length > 0) {
        const formData = new FormData();
        formData.append('image', data.bookImage[0]);
        const imgRes = await axios.post(
          `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
          formData
        );
        imageUrl = imgRes.data.data.url;
      }

      const bookData = {
        name: data.bookName,
        image: imageUrl,
        pages,
        rating,
        description: data.bookDescription,
        category: data.bookCategory,
        createdAt: editingBook
          ? editingBook.createdAt
          : new Date().toISOString(),
      };

      if (editingBook) {
        const res = await axios.put(
          `http://localhost:3000/books/${editingBook._id}`,
          bookData
        );
        if (res.data.success) {
          alert('Book updated successfully!');
          setEditingBook(null);
        } else {
          alert('Update failed: ' + res.data.message);
        }
      } else {
        const res = await axios.post('http://localhost:3000/books', bookData);
        if (res.data.success || res.status === 200) {
          alert('Book added successfully!');
        } else {
          alert('Add failed: ' + res.data.message);
        }
      }

      reset();
      fetchBooks();
      if (onAddSuccess) onAddSuccess();
    } catch (error) {
      console.error(error);
      alert('Something went wrong! ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete book
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this book?')) return;
    try {
      const res = await axios.delete(`http://localhost:3000/books/${id}`);
      if (res.data.success) {
        alert('Book deleted successfully!');
        fetchBooks();
      } else {
        alert('Delete failed: ' + res.data.message);
      }
    } catch (error) {
      console.error(error);
      alert('Failed to delete book: ' + error.message);
    }
  };

  return (
    <div className="max-w-7xl mx-auto mt-12 mb-10 p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
      <h2 className="text-2xl font-extrabold text-gray-800 mb-6 text-center">
        {editingBook ? 'Update Book' : 'Add a New Book'}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className="flex flex-col sm:flex-row sm:gap-4">
          <div className="flex-1 flex flex-col">
            <label className="mb-1 font-medium text-gray-700">Book Name</label>
            <input
              type="text"
              placeholder="Enter book name"
              {...register('bookName', { required: 'Book name is required' })}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.bookName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.bookName.message}
              </p>
            )}
          </div>

          <div className="flex-1 flex flex-col">
            <label className="mb-1 font-medium text-gray-700">Category</label>
            <select
              {...register('bookCategory', {
                required: 'Category is required',
              })}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              defaultValue=""
            >
              <option value="" disabled>
                Select category
              </option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {errors.bookCategory && (
              <p className="text-red-500 text-sm mt-1">
                {errors.bookCategory.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:gap-4">
          <div className="flex-1 flex flex-col">
            <label className="mb-1 font-medium text-gray-700">
              Number of Pages
            </label>
            <input
              type="number"
              placeholder="Enter total pages"
              {...register('bookPages', {
                required: 'Number of pages is required',
                min: 1,
              })}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.bookPages && (
              <p className="text-red-500 text-sm mt-1">
                {errors.bookPages.message}
              </p>
            )}
          </div>

          <div className="flex-1 flex flex-col">
            <label className="mb-1 font-medium text-gray-700">
              Book Rating (0-5)
            </label>
            <input
              type="number"
              placeholder="Enter rating"
              {...register('bookRating', {
                required: 'Rating is required',
                min: 0,
                max: 5,
              })}
              step="0.1"
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.bookRating && (
              <p className="text-red-500 text-sm mt-1">
                {errors.bookRating.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:gap-4">
          <div className="flex-1 flex flex-col">
            <label className="mb-1 font-medium text-gray-700">Book Cover</label>
            <input
              type="file"
              accept="image/*"
              {...register('bookImage')}
              className="p-2 border border-gray-300 rounded-lg cursor-pointer"
            />
          </div>

          <div className="flex-1 flex flex-col">
            <label className="mb-1 font-medium text-gray-700">
              Book Description
            </label>
            <textarea
              placeholder="Enter description"
              {...register('bookDescription')}
              rows="3"
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full p-3 rounded-lg text-white font-semibold transition-all duration-300 ${
            loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {loading ? 'Processing...' : editingBook ? 'Update Book' : 'Add Book'}
        </button>
      </form>

      <h2 className="text-xl font-bold mt-10 mb-4 text-gray-700 text-center">
        All Books ({books.length})
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border border-gray-300 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th
                className="px-4 py-2 border cursor-pointer"
                onClick={() => requestSort('name')}
              >
                Name{' '}
                {sortConfig.key === 'name'
                  ? sortConfig.direction === 'asc'
                    ? '▲'
                    : '▼'
                  : ''}
              </th>
              <th
                className="px-4 py-2 border cursor-pointer"
                onClick={() => requestSort('pages')}
              >
                Pages{' '}
                {sortConfig.key === 'pages'
                  ? sortConfig.direction === 'asc'
                    ? '▲'
                    : '▼'
                  : ''}
              </th>
              <th
                className="px-4 py-2 border cursor-pointer"
                onClick={() => requestSort('rating')}
              >
                Rating{' '}
                {sortConfig.key === 'rating'
                  ? sortConfig.direction === 'asc'
                    ? '▲'
                    : '▼'
                  : ''}
              </th>
              <th
                className="px-4 py-2 border cursor-pointer"
                onClick={() => requestSort('category')}
              >
                Category{' '}
                {sortConfig.key === 'category'
                  ? sortConfig.direction === 'asc'
                    ? '▲'
                    : '▼'
                  : ''}
              </th>
              <th
                className="px-4 py-2 border cursor-pointer"
                onClick={() => requestSort('createdAt')}
              >
                Created At{' '}
                {sortConfig.key === 'createdAt'
                  ? sortConfig.direction === 'asc'
                    ? '▲'
                    : '▼'
                  : ''}
              </th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedBooks.map((book) => (
              <tr key={book._id} className="text-center hover:bg-gray-50">
                <td className="px-4 py-2 border">{book.name}</td>
                <td className="px-4 py-2 border">{book.pages}</td>
                <td className="px-4 py-2 border">{book.rating?.toFixed(1)}</td>
                <td className="px-4 py-2 border">{book.category}</td>
                <td className="px-4 py-2 border">
                  {new Date(book.createdAt).toLocaleDateString()}{' '}
                  {new Date(book.createdAt).toLocaleTimeString()}
                </td>
                <td className="px-4 py-2 border flex justify-center gap-2">
                  <button
                    onClick={() => setEditingBook(book)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(book._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBook;

