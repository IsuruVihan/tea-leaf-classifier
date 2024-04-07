import React, {useState} from "react";
import {PhotoIcon} from '@heroicons/react/24/solid';

import './App.css';

const App = () => {
	const [file, setFile] = useState(null);

	const handleFileChange = (e) => {
		setFile(e.target.files[0]);
	};

	const handleUpload = async () => {
		if (!file) {
			alert('Please select a file');
			return;
		}

		const formData = new FormData();
		formData.append('image', file);

		try {
			const response = await fetch('http://127.0.0.1:5000/predict', {
				method: 'POST',
				body: formData
			});

			if (!response.ok) {
				throw new Error('Network response was not ok');
			}

			const data = await response.json();
			alert(`Predicted grade: ${data.predicted_grade}\nMatching percentage: ${data.matching_percentage}`); // Handle the response from the API as needed
		} catch (error) {
			console.error('Error uploading file:', error);
		}
	};

	return (
		<form className="flex justify-center items-center">
			<div className="space-y-12 w-6/12">
				<div className="border-b border-gray-900/10 pb-12">
					<h2 className="text-base font-semibold leading-7 text-gray-900">Tea Leaf Classifier</h2>
					<div className="col-span-full">
						<label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
							Upload photo
						</label>
						<div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
							<div className="text-center">
								<PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true"/>
								<div className="mt-4 flex text-sm leading-6 text-gray-600">
									<label
										htmlFor="file-upload"
										className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600
                focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2
                hover:text-indigo-500"
									>
										<span>Upload a file</span>
										<input id="file-upload" name="file-upload" type="file" className="sr-only"
													 onChange={handleFileChange}/>
									</label>
									<p className="pl-1">or drag and drop</p>
								</div>
								<p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
							</div>
						</div>
					</div>
					<button
						type="button"
						className="rounded-md bg-indigo-600 mt-4 w-full px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm
						hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
						focus-visible:outline-indigo-600"
						onClick={handleUpload}
					>
						Upload
					</button>
				</div>
			</div>
		</form>
);
}

export default App;
