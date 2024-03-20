import React, { useState } from 'react';

const Home = () => {
    const [prompt, setPrompt] = useState('');
    const [imageUrls, setImageUrls] = useState([]);
    const [error, setError] = useState(null);

    const handlePromptChange = (e) => {
        setPrompt(e.target.value);
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://localhost:5000/generate-image', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    prompt: prompt,
                    n: 2,
                    size: '512x512',
                }),
            });
            if (!response.ok) {
                throw new Error('Failed to generate image');
            }
            const data = await response.json();
            setImageUrls(data);
            setError(null);
        } catch (error) {
            console.error('Error:', error);
            setError(error.message);
        }
    };

    return (
        <div className='flex flex-col items-center justify-center bg-white '>
            <h1 className='mt-10 font-bold text-5xl text-purple-500'>AI Image Generator</h1>
            <input 
                type="text" 
                className='outline-none bg-white  text-md font-semibold shadow-xl w-1/3  px-10 py-2  rounded-full mt-10' 
                value={prompt}
                onChange={handlePromptChange}
                placeholder='Enter text to generate'
            />
            <button 
                className="mt-8 bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleSubmit}
            >
                Generate Image
            </button>
            {
              error ? (
                <h3 className='font-semibold text-lg text-red-500'>{error}</h3>
              )  : <>
              </>
            }
            {imageUrls.length > 0 && (
                <div className="mt-10 flex items-center justify-center gap-10">
                    {imageUrls.map((imageUrl, index) => (
                        <img key={index} src={imageUrl.url} alt={`Generated Image ${index}`} className="mb-4" />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Home;
