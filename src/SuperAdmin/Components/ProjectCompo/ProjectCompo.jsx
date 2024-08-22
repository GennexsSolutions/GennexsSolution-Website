import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';

const DataTable = ({ data, onEdit, onDelete, onAdd }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  const pageCount = Math.ceil(data.length / itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const paginatedData = data.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-end mb-4">
        <button
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          onClick={onAdd}>
          ເພີ່ມຂໍ້ມູນໃໝ່
        </button>
      </div>
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 border-b">Name</th>
            <th className="py-2 px-4 border-b">Subname</th>
            <th className="py-2 px-4 border-b">Image</th>
            <th className="py-2 px-4 border-b">Description</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((item) => (
            <tr key={item._id} className="text-center">
              <td className="py-2 px-4 border-b">{item.name}</td>
              <td className="py-2 px-4 border-b">{item.subname}</td>
              <td className="py-2 px-4 border-b">
                <img
                  src={`http://localhost:3000/images/${item.image}`}
                  alt={item.name}
                  className="w-12 h-12 object-cover mx-auto"
                />
              </td>
              <td className="py-2 px-4 border-b">
                {item.description && Array.isArray(item.description) ? (
                  item.description.map((desc) => (
                    <div key={desc._id}>
                      <strong>{desc.title}</strong>:
                      {desc.subtitle && Array.isArray(desc.subtitle) ? (
                        desc.subtitle.map((sub) => (
                          <div key={sub._id}>{sub.namesubtitle}</div>
                        ))
                      ) : (
                        <div>No subtitles available</div>
                      )}
                    </div>
                  ))
                ) : (
                  <div>No description available</div>
                )}
              </td>
              <td className="py-2 px-4 border-b">
                <button
                  className="bg-blue-500 text-white py-1 px-3 rounded mr-2 hover:bg-blue-600"
                  onClick={() => onEdit(item)}>
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                  onClick={() => onDelete(item)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>

      <div className="flex justify-center mt-4">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName={"flex items-center space-x-2"}
          pageClassName={"px-3 py-1 border rounded cursor-pointer hover:bg-gray-200"}
          previousClassName={"px-3 py-1 border rounded cursor-pointer hover:bg-gray-200"}
          nextClassName={"px-3 py-1 border rounded cursor-pointer hover:bg-gray-200"}
          activeClassName={"bg-blue-500 text-white"}
        />
      </div>
    </div>
  );
};

export default DataTable;
