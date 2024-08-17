import React, { useEffect, useState } from 'react';

const AllCars = () => {
    const [items, setItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortField, setSortField] = useState('');
    const [sortOrder, setSortOrder] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [priceRange, setPriceRange] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/cars?page=${currentPage}&limit=9&search=${searchQuery}&sortField=${sortField}&sortOrder=${sortOrder}&brand=${brand}&category=${category}&priceRange=${priceRange}`);
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
    }, [currentPage, searchQuery, sortField, sortOrder, brand, category, priceRange]);

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

    const handleSortChange = (field) => {
        if (sortField === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortOrder('asc');
        }
        setCurrentPage(1);
    };

    const handleFilterChange = (setter) => (event) => {
        setter(event.target.value);
        setCurrentPage(1);
    };

    return (
        <div className="container mx-auto px-4 font-serif">
            <h1 className="text-4xl font-bold text-center mt-8 mb-12">Explore Our Car Collection</h1>

            {/* Search and Filter Inputs */}
            <div className="mb-8 text-center flex flex-wrap justify-center gap-4">
                <div className='flex gap-2'>
                    <div><h2 className='text-white btn rounded-lg bg-[#a00000]'>Search</h2></div>
                    <div><input 
                    type="text" 
                    placeholder="Search by product name..." 
                    className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#a00000]"
                    value={searchQuery}
                    onChange={handleSearchChange}
                /></div>
                </div>
                <select className="px-4 py-2 border border-gray-300 rounded-md" value={brand} onChange={handleFilterChange(setBrand)}>
                    <option value="">All Brands</option>
                    <option value="Tesla">Tesla</option>
                    <option value="Lamborghini">Lamborghini</option>
                    <option value="Ferrari">Ferrari</option>
                    <option value="Aston Martin">Aston Martin</option>
                    <option value="Bentley">Bentley</option>
                    <option value="Porsche">Porsche</option>
                    <option value="Bugatti">Bugatti</option>
                    <option value="Rolls-Royce">Rolls-Royce</option>
                    <option value="McLaren">McLaren</option>
                    <option value="Land Rover">Land Rover</option>
                    <option value="Volvo">Volvo</option>
                    <option value="Jaguar">Jaguar</option>
                    <option value="Chevrolet">Chevrolet</option>
                    <option value="Ford">Ford</option>
                    <option value="Alfa Romeo">Alfa Romeo</option>
                    <option value="Ram">Ram</option>
                    <option value="Mercedes-Benz">Mercedes-Benz</option>
                    <option value="Cadillac">Cadillac</option>
                    <option value="Jeep">Jeep</option>
                    <option value="BMW">BMW</option>
                    <option value="Genesis">Genesis</option>
                    <option value="Infiniti">Infiniti</option>
                    <option value="Kia">Kia</option>
                    <option value="Toyota">Toyota</option>
                    <option value="Subaru">Subaru</option>
                    <option value="Audi">Audi</option>
                    <option value="Acura">Acura</option>
                    <option value="Honda">Honda</option>
                    <option value="Volkswagen">Volkswagen</option>
                    <option value="Mazda">Mazda</option>
                    <option value="Nissan">Nissan</option>
                    <option value="Hyundai">Hyundai</option>

                </select>
                <select className="px-4 py-2 border border-gray-300 rounded-md" value={category} onChange={handleFilterChange(setCategory)}>
                    <option value="">All Categories</option>
                    <option value="Electric">Electric</option>
                    <option value="SUV">SUV</option>
                    <option value="Sedan">Sedan</option>
                    <option value="Sports">Sports</option>
                    <option value="Truck">Truck</option>
                </select>
                <select className="px-4 py-2 border border-gray-300 rounded-md" value={priceRange} onChange={handleFilterChange(setPriceRange)}>
                    <option value="">All Prices</option>
                    <option value="0-50000">Under $50,000</option>
                    <option value="50001-100000">$50,001 - $100,000</option>
                    <option value="100001-150000">$100,001 - $150,000</option>
                </select>
                <button 
                    onClick={() => handleSortChange('Price')}
                    className="bg-[#a00000] text-white px-4 py-2 rounded-md hover:bg-[#a00000c5] transition duration-300"
                >
                    Sort by Price {sortField === 'Price' && (sortOrder === 'asc' ? '↑' : '↓')}
                </button>
                <button 
                    onClick={() => handleSortChange('ProductCreationDateTime')}
                    className="bg-[#a00000] text-white px-4 py-2 rounded-md hover:bg-[#a00000c5] transition duration-300"
                >
                    Sort by Date {sortField === 'ProductCreationDateTime' && (sortOrder === 'asc' ? '↑' : '↓')}
                </button>
            </div>

            {/* Display Cars */}
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
                                <p className="text-1xl text-gray-800"><span className="font-semibold">Brand:</span> {item.BrandName}</p>
                                <p className="text-1xl text-gray-800"><span className="font-semibold">Category:</span> {item.Category}</p>
                                <p className="text-1xl text-gray-800"><span className="font-semibold">Price:</span> ${item.Price}</p>
                                <p className="text-1xl text-gray-800"><span className="font-semibold">Ratings:</span> {item.Ratings}</p>
                                <p className="text-1xl text-gray-800"><span className="font-semibold">Added on:</span> {new Date(item.ProductCreationDateTime).toLocaleDateString()}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-12 space-x-4">
                <button 
                    onClick={handlePreviousPage} 
                    disabled={currentPage === 1}
                    className="bg-[#a00000] text-white px-4 py-2 rounded-md hover:bg-[#a00000c5] transition duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                    Previous
                </button>
                <span className="text-white rounded-lg p-2 bg-black text-lg">Page {currentPage} of {totalPages}</span>
                <button 
                    onClick={handleNextPage} 
                    disabled={currentPage === totalPages}
                    className="bg-[#a00000] text-white px-4 py-2 rounded-md hover:bg-[#a00000c5] transition duration-300 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default AllCars;
