import React, { useEffect, useState } from 'react';

const AllCars = () => {
    const [items, setItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortField, setSortField] = useState(''); // State for sort field
    const [sortOrder, setSortOrder] = useState(''); // State for sort order

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/cars?page=${currentPage}&limit=9&search=${searchQuery}&sortField=${sortField}&sortOrder=${sortOrder}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setItems(data.items);
                setCurrentPage(data.currentPage);
                setTotalPages(data.totalPages);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [currentPage, searchQuery, sortField, sortOrder]); 

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value); 
        setCurrentPage(1); 
    };

    const handleSortChange = (event) => {
        const [field, order] = event.target.value.split('-');
        setSortField(field);
        setSortOrder(order);
        setCurrentPage(1); 
    };

    return (
        <div className="container mx-auto px-4 font-serif">
            <h1 className="text-4xl font-bold text-center text-gray-800 mt-8 mb-12">All Cars</h1>
            
            {/* Search and Sort Inputs */}
            <div className="mb-8 text-center flex gap-4 justify-center">
                <div>
                    <h2 className='btn bg-[#a00000] text-white rounded-lg'>Search</h2>
                </div>
                <input 
                    type="text" 
                    placeholder="Search by product name..." 
                    className="px-4  py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#a00000]"
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
               <div className='flex gap-2'>
                <div>
                <h2 className='btn bg-[#a00000] text-white rounded-lg'>Sort</h2>
                </div>
                <div>
                <select 
                    className="px-4 py-3  border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#a00000]" 
                    onChange={handleSortChange}
                >
                    <option value="">Sort By</option>
                    <option value="Price-asc">Price: Low to High</option>
                    <option value="Price-desc">Price: High to Low</option>
                    <option value="ProductCreationDateTime-desc">Date Added: Newest first</option>
                </select>
                </div>
               </div>
            </div>
            
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {items.map(item => (
                    <div 
                        key={item._id} 
                        className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 ease-in-out transform hover:-translate-y-2"
                    >
                        <img 
                            src={item.ProductImage} 
                            alt={item.ProductName} 
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-5">
                            <h2 className="text-2xl font-bold text-gray-800">{item.ProductName}</h2>
                            <p className="text-gray-600 mt-2">{item.Description}</p>
                            <div className="mt-4">
                                <p className="text-lg text-gray-800"><span className="font-semibold">Brand:</span> {item.BrandName}</p>
                                <p className="text-lg text-gray-800"><span className="font-semibold">Category:</span> {item.Category}</p>
                                <p className="text-lg text-gray-800"><span className="font-semibold">Price:</span> ${item.Price}</p>
                                <p className="text-lg text-gray-800"><span className="font-semibold">Ratings:</span> {item.Ratings}</p>
                                <p className="text-lg text-gray-800"><span className="font-semibold">Added on:</span> {new Date(item.ProductCreationDateTime).toLocaleDateString()}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-center mt-10">
                <button
                    onClick={handlePreviousPage}
                    className="bg-[#a00000] text-white px-4 py-2 rounded-l-md hover:bg-[#a00000c5]  transition duration-300 ease-in-out disabled:opacity-50"
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span className="bg-black text-white px-4 py-2">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={handleNextPage}
                    className="bg-[#a00000] text-white px-4 py-2 rounded-r-md hover:bg-[#a00000c5]  transition duration-300 ease-in-out disabled:opacity-50"
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default AllCars;
