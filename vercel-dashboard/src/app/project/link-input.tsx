import React from 'react';

const LinkInput = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <input
        type="text"
        className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter github repo url"
      />
    </div>
  );
};

export default LinkInput;
