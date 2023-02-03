import React from 'react';

export default function ErrorPage() {
  return (
    <div className=" flex flex-col justify-center items-center h-screen">
      <h1 className="text-4xl mb-4">Oops!</h1>
      <p className="text-gray-500">Sorry, an unexpected error has occurred.</p>
      <p className="text-gray-500">Or, this page is not been created yet</p>
      <p className="text-gray-800 text-2xl">Press the Browser back button</p>
    </div>
  );
}
