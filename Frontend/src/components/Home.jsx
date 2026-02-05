import React from 'react'
import TableBoxComponenet from './TableBoxComponenet';
import Footer from './Footer';
import Navbar from './Navbar';

const Home = () => {
  const list = [
    { filename: "Maths Time Table", authorname: "John Doe" },
    { filename: "Science Time Table", authorname: "Jane Smith" },
    { filename: "History Time Table", authorname: "Alice Johnson" },
    { filename: "Maths Time Table", authorname: "John Doe" },
    { filename: "Science Time Table", authorname: "Jane Smith" },
    { filename: "History Time Table", authorname: "Alice Johnson" },
    { filename: "Maths Time Table", authorname: "John Doe" },
    { filename: "Science Time Table", authorname: "Jane Smith" },
    { filename: "History Time Table", authorname: "Alice Johnson" },
    { filename: "Maths Time Table", authorname: "John Doe" },
    { filename: "Science Time Table", authorname: "Jane Smith" },
    { filename: "History Time Table", authorname: "Alice Johnson" },
  ];

  return (
    <div>
      <Navbar />
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="max-w-3xl w-full mx-auto px-4 py-8 flex-1">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Time Tables
        </h1>

        <ul className="space-y-4">
          {list.map((item, index) => (
            <TableBoxComponenet
              key={index}
              filename={item.filename}
              authorname={item.authorname}
            />
          ))}
        </ul>
      </div>

      <Footer />
    </div>
    </div>
  );
}

export default Home
