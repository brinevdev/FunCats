import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { APIKEY } from "../../variables";

const initialState = {
    galleryFilters: { limit:5 },
}


export const getGallery = createAsyncThunk('cats/getGallery', async (filters = {limit:5}) => {
    let filterParams = '';
    for (let key in filters) {
        if (filters[key])  filterParams += `&${key}=${filters[key]}`
    }
 
    const res = await fetch(`https://api.thecatapi.com/v1/images/search?api_key=${APIKEY}&${filterParams}`);
    return await res.json();
});


const gallerySlice = createSlice({
    name:'gallery',
    initialState,
    reducers: {
        changeGalleryLimit: (state, action) => {state.galleryFilters.limit = action.payload},
        changeGalleryBreed: (state, action) => {state.galleryFilters.breed_ids = action.payload},
        changeGalleryImageType:(state, action) => {state.galleryFilters.mime_types = action.payload}
    },
    extraReducers: {
        [getGallery.fulfilled]: (state, action) => {
            state.gallery = action.payload
        }
    }
}) 


const {reducer, actions} = gallerySlice


export const {
    changeGalleryLimit,
    changeGalleryBreed,
    changeGalleryImageType,
} = actions

export default reducer;