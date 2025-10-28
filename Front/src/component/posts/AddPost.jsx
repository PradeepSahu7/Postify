import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { fetchCatagoriesActions } from "../../Redux/slices/catagory/catagorySlice";
import { createPostAction } from "../../Redux/slices/posts/postSlice";

function AddPost() {
  const { catagories } = useSelector(
    (state) => state.catagories
  );
  const {
    loading: postLoading,
    success,
    error,
  } = useSelector((state) => state.posts);

  const [validationError ,setValidationError] =useState({})

  const dispatch = useDispatch();
  const imageRef = useRef();
  const options = catagories?.allCatagories?.map((e) => {
    return { value: e._id, label: e.name };
  });

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    catagory: "",
    image: null,
  });
  const [imagePrev, setImagePrev] = useState();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      const previewUrl = URL.createObjectURL(file);
      setImagePrev(previewUrl);
    }
  };

  useEffect(() => {
    dispatch(fetchCatagoriesActions());
  }, []);

  const handleSelectChange = (selectedOption) => {
    setFormData({ ...formData, catagory: selectedOption.value });
  };

  

  const validateForm  = (data)=>{
    const error ={}
      if(!data.title)
      {
        error.title="Title can not be empty";
      }
      if(!data.content )
      {
        error.content = "Contenet Can not be Empty";
      }
      if(!data.catagory)
        {
          error.catagory = "Catagory is required"
        }
        if(!data.image)
          {
            error.image= "Image can not be Empty";
          }
          return error;
    }
    //handle blure event
    //to find out for which input handle blur run 
    const handleBlur = (e)=>
    {
        const {name} = e.target;
      const formError = validateForm(formData);
      setValidationError({...validationError,[name]:formError[name]});
      

    }
         
  const handleSubmit = (e) => {
    e.preventDefault();
    const formError = validateForm(formData);
    //the dipsatching should only be doneif formError does not have any keys inside it  to do that we use "Object.keys()"
    setValidationError(formError);
    if(Object.keys(formError).length == 0)
    {    
      dispatch(createPostAction(formData));
      setFormData({
        title: "",
        content: "",
        catagory: "",
        image: null,
      });
      setImagePrev(null);
    }
    

   
  };

  return (
    <div className="max-w-3xl mx-auto my-8 bg-white rounded-xl shadow-md overflow-hidden p-6">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Create New Post
      </h1>

      {/* Success Message */}
      {success && (
        <div
          className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Success!</strong>
          <span className="block sm:inline">
            {" "}
            Your post has been created successfully.
          </span>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div
          className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline">
            {" "}
            {"Failed to create post. Please try again."}
          </span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title Input */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Post Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            placeholder="Enter post title"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            // required
            onBlur={handleBlur}
          />
        </div>
          {validationError?.title && <p className="text-red-500"> {validationError?.title} </p>}
        {/* Category Select */}
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Category
          </label>
          <Select
            options={options}
            name="catagory"
            onChange={handleSelectChange}
            placeholder="Select a category" 
            className="w-full"
            classNamePrefix="select"
            onBlur={handleBlur}
          />
        </div>
        {validationError?.catagory && <p className="text-red-500"> {validationError?.catagory} </p>}

        {/* Content Input */}
        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Content
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            }
            placeholder="Write your post content here"
            rows="6"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            // required
            onBlur={handleBlur}
          ></textarea>
        </div>
        {validationError?.content && <p className="text-red-500"> {validationError?.content} </p>}
        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Post Image
          </label>
          <input
          onBlur={handleBlur}
            type="file"
            ref={imageRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/*"
            name="image"
          />
        {validationError?.image && <p className="text-red-500"> {validationError?.image} </p>}
          {/* Image Upload Button/Preview Area */}
          {!imagePrev ? (
            <div
              onClick={() => imageRef.current.click()}
              className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-gray-300 rounded-md cursor-pointer hover:border-emerald-400 transition-colors"
            >
              <div className="space-y-1 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="flex text-sm text-gray-600">
                  <span className="relative bg-white rounded-md font-medium text-emerald-600 hover:text-emerald-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-emerald-500">
                    Upload an image
                  </span>
                </div>
                <p className="text-xs text-gray-500">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
          ) : (
            <div className="mt-2 relative">
              <div className="relative h-64 overflow-hidden rounded-lg">
                <img
                  src={imagePrev}
                  alt="Post preview"
                  className="w-full h-full object-cover"
                />
                <div
                  className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
                  onClick={() => imageRef.current.click()}
                >
                  <p className="text-white text-center">
                    <span className="block font-medium">Change Image</span>
                    <span className="text-sm">
                      Click to upload different image
                    </span>
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setImagePrev(null);
                  setFormData({ ...formData, image: null });
                }}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={postLoading}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
              postLoading
                ? "bg-emerald-400 cursor-not-allowed"
                : "bg-emerald-600 hover:bg-emerald-700"
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors`}
          >
            {postLoading ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </span>
            ) : (
              "Create Post"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddPost;
