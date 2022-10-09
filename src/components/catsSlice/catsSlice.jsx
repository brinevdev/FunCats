import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const APIKEY = 'live_7cy9oXwBEJPzB3t6OPqNcCFX16rvO3f8PvbMo5kxBGkqqmuOhkGaywhFbpF2JCMK';
const initialState = {
    cats:[],
    filters:{
        limit:5
    },
    breeds:[],
}

export const getAllCats = createAsyncThunk('cats/getAllCats', async (filters = {}) => {
    let filterParams = '';
    for (let key in filters) {
        if (filters[key])  filterParams += `&${key}=${filters[key]}`
    }
    const res = await fetch(`https://api.thecatapi.com/v1/images/search?api_key=${APIKEY}&has_breeds=1&size=full${filterParams}`);
    return await res.json();
});

export const getAllBreeds = createAsyncThunk('cats/getAllBreeds', async () => {
    const res = await  fetch(`https://api.thecatapi.com/v1/breeds?api_key=${APIKEY}`);
    return await res.json();
})

const catsSlice = createSlice({
    name: 'cats',
    initialState,
    reducers: {
        changeLimit: (state, action) => {state.filters.limit = action.payload},
        changeBreed: (state, action) => {state.filters['breed_ids'] = action.payload},
    },
    extraReducers: {
        [getAllCats.pending]: (state) => {state.status = 'loading'},
        [getAllCats.fulfilled]: (state,action) => {
            state.status = 'success'
            state.cats = action.payload.map((cat)=>{
                return {
                    id: cat.id,
                    url: cat.url,
                    breedId: cat.breeds[0].id,
                    breedName: cat.breeds[0].name,
                }
            })
        },
        [getAllCats.rejected]: (state) => {state.status = 'error'},
        [getAllBreeds.fulfilled]: (state,action) => {
            state.breeds = action.payload.map((breed)=>{
                return {
                    id: breed.id,
                    name: breed.name,
                }
            })
        }
    }

})

const {reducer,actions} = catsSlice;

export const {changeLimit, changeBreed} = actions

export default reducer;