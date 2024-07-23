'use client'
import React, { useEffect, useState } from 'react';
import {generate} from '../../../../upload/src/generate';
import { Button } from '@/components/button';

interface MyObject {
  id: string;
}

const LinkInput = () => {
  const [link, setLink] = useState("");
  const [uploadResponse, setUploadResponse] = useState<MyObject>();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLink(event.target.value);
    console.log("a");
  };

  useEffect(() => {
    generate();
  }, [link]);

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:3001/url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ repoUrl: link }),
      });

      const data = await response.json();
      console.log(data);
      setUploadResponse(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <input
        type="text"
        value={link}
        onChange={handleChange}
        className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Enter github repo url"
      />
      <div onClick={handleSubmit}>
        <Button />
      </div>
      <p>{JSON.stringify(uploadResponse)}</p>
      {uploadResponse &&
        <a href="https://dash.cloudflare.com/ee517f5aa06f9055086cc7be97c6a0f7/r2/default/buckets/vercel" className='text-red-700'>R2 Link</a>
      }
    </div>
  );
};

export default LinkInput;
