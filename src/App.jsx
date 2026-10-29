import React, { useState, useEffect } from 'react';
import { 
    fetchCategories, createCategory, deleteCategory, 
    fetchFoods, createFood, deleteFood, BACKEND_URL 
} from './services/api';
import './App.css';

function App() {
    const [categories, setCategories] = useState([]);
    const [foods, setFoods] = useState([]);
    
    // Form states for Category
    const [catName, setCatName] = useState('');
    const [catDesc, setCatDesc] = useState('');
    const [catImage, setCatImage] = useState(null);

    // Form states for Food
    const [foodName, setFoodName] = useState('');
    const [foodPrice, setFoodPrice] = useState('');
    const [foodDesc, setFoodDesc] = useState('');
    const [foodCategory, setFoodCategory] = useState('');
    const [foodImage, setFoodImage] = useState(null);

    const [activeTab, setActiveTab] = useState('categories');

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const catRes = await fetchCategories();
            setCategories(catRes.data.data);
            const foodRes = await fetchFoods();
            setFoods(foodRes.data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // Handle Category Submission
    const handleCategorySubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', catName);
        formData.append('description', catDesc);
        formData.append('image', catImage);

        try {
            await createCategory(formData);
            setCatName(''); setCatDesc(''); setCatImage(null);
            loadData();
            alert('Category added successfully!');
        } catch (error) {
    console.error("Full Error Object:", error);
    const errorMsg = error.response?.data?.error || error.response?.data?.message || error.message;
    alert('Error adding category: ' + errorMsg);
}
    };

    // Handle Food Submission
    const handleFoodSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', foodName);
        formData.append('price', foodPrice);
        formData.append('description', foodDesc);
        formData.append('category', foodCategory);
        formData.append('image', foodImage);

        try {
            await createFood(formData);
            setFoodName(''); setFoodPrice(''); setFoodDesc(''); setFoodCategory(''); setFoodImage(null);
            loadData();
            alert('Food item added successfully!');
        } catch (error) {
            alert('Error adding food: ' + error.response?.data?.message || error.message);
        }
    };

    // Delete handlers
    const handleDeleteCategory = async (id) => {
        if (window.confirm('Are you sure?')) {
            await deleteCategory(id);
            loadData();
        }
    };

    const handleDeleteFood = async (id) => {
        if (window.confirm('Are you sure?')) {
            await deleteFood(id);
            loadData();
        }
    };

    return (
        <div className="container" style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '1200px', margin: '0 auto' }}>
            <h1>🍽️ Food & Category Management System</h1>
            
            <div style={{ marginBottom: '20px' }}>
                <button onClick={() => setActiveTab('categories')} style={{ padding: '10px 20px', marginRight: '10px', background: activeTab === 'categories' ? '#007bff' : '#ccc', color: '#fff', border: 'none', cursor: 'pointer' }}>Manage Categories</button>
                <button onClick={() => setActiveTab('foods')} style={{ padding: '10px 20px', background: activeTab === 'foods' ? '#007bff' : '#ccc', color: '#fff', border: 'none', cursor: 'pointer' }}>Manage Foods</button>
            </div>

            {/* CATEGORIES SECTION */}
            {activeTab === 'categories' && (
                <div>
                    <h2>Add Category</h2>
                    <form onSubmit={handleCategorySubmit} style={{ background: '#f9f9f9', padding: '15px', borderRadius: '5px', marginBottom: '20px' }}>
                        <input type="text" placeholder="Category Name" value={catName} onChange={e => setCatName(e.target.value)} required style={{ display: 'block', marginBottom: '10px', padding: '8px', width: '100%' }} />
                        <input type="text" placeholder="Description" value={catDesc} onChange={e => setCatDesc(e.target.value)} style={{ display: 'block', marginBottom: '10px', padding: '8px', width: '100%' }} />
                        <input type="file" onChange={e => setCatImage(e.target.files[0])} required style={{ display: 'block', marginBottom: '10px' }} />
                        <button type="submit" style={{ padding: '10px 15px', background: 'green', color: 'white', border: 'none' }}>Save Category</button>
                    </form>

                    <h2>Category List</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '15px' }}>
                        {categories.map(cat => (
                            <div key={cat._id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '5px', background: '#fff' }}>
                                <img src={`${BACKEND_URL}${cat.image}`} alt={cat.name} style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '4px' }} />
                                <h3>{cat.name}</h3>
                                <p>{cat.description}</p>
                                <button onClick={() => handleDeleteCategory(cat._id)} style={{ background: 'red', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}>Delete</button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* FOODS SECTION */}
            {activeTab === 'foods' && (
                <div>
                    <h2>Add Food Item</h2>
                    <form onSubmit={handleFoodSubmit} style={{ background: '#f9f9f9', padding: '15px', borderRadius: '5px', marginBottom: '20px' }}>
                        <input type="text" placeholder="Food Name" value={foodName} onChange={e => setFoodName(e.target.value)} required style={{ display: 'block', marginBottom: '10px', padding: '8px', width: '100%' }} />
                        <input type="number" placeholder="Price" value={foodPrice} onChange={e => setFoodPrice(e.target.value)} required style={{ display: 'block', marginBottom: '10px', padding: '8px', width: '100%' }} />
                        <input type="text" placeholder="Description" value={foodDesc} onChange={e => setFoodDesc(e.target.value)} style={{ display: 'block', marginBottom: '10px', padding: '8px', width: '100%' }} />
                        <select value={foodCategory} onChange={e => setFoodCategory(e.target.value)} required style={{ display: 'block', marginBottom: '10px', padding: '8px', width: '100%' }}>
                            <option value="">Select Category</option>
                            {categories.map(cat => (
                                <option key={cat._id} value={cat._id}>{cat.name}</option>
                            ))}
                        </select>
                        <input type="file" onChange={e => setFoodImage(e.target.files[0])} required style={{ display: 'block', marginBottom: '10px' }} />
                        <button type="submit" style={{ padding: '10px 15px', background: 'green', color: 'white', border: 'none' }}>Save Food</button>
                    </form>

                    <h2>Food List</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '15px' }}>
                        {foods.map(food => (
                            <div key={food._id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '5px', background: '#fff' }}>
                                <img src={`${BACKEND_URL}${food.image}`} alt={food.name} style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '4px' }} />
                                <h3>{food.name}</h3>
                                <p><strong>Price:</strong> ${food.price}</p>
                                <p><strong>Category:</strong> {food.category?.name || 'N/A'}</p>
                                <p>{food.description}</p>
                                <button onClick={() => handleDeleteFood(food._id)} style={{ background: 'red', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}>Delete</button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;