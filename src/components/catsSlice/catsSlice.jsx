import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { APIKEY } from "../../variables";


const initialState = {
    cats:[],
    cat: {},
    filters:{
        limit:5
    },
    breeds:[],
    breed:{},
}

export const getAllCats = createAsyncThunk('cats/getAllCats', async (filters = {}) => {
    let filterParams = '';
    for (let key in filters) {
        if (filters[key])  filterParams += `&${key}=${filters[key]}`
    }
    const res = await fetch(`https://api.thecatapi.com/v1/images/search?api_key=${APIKEY}&has_breeds=1&size=full${filterParams}`);
    return await res.json();
});

export const getCat = createAsyncThunk('cats/getCat', async () => {
    const res = await fetch(`https://api.thecatapi.com/v1/images/search?api_key=${APIKEY}`);
    return await res.json();
})

export const getAllBreeds = createAsyncThunk('cats/getAllBreeds', async () => {
    const res = await  fetch(`https://api.thecatapi.com/v1/breeds?api_key=${APIKEY}`);
    return await res.json();
})


export const getBreed = createAsyncThunk('cats/getAllCat', async (id) => {
    let res = await fetch(`https://api.thecatapi.com/v1/images/${id}`);
    return await res.json();
});

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
                console.log(action.payload);
                return {
                    id: cat.id,
                    url: cat.url,
                    breedId: cat.breeds[0].id,
                    breedName: cat.breeds[0].name,
                }
            })
        },
        [getAllCats.rejected]: (state) => {state.status = 'error'},
        [getCat.pending]: (state) => {state.catLoadingStatus = 'loading'},
        [getCat.fulfilled]:(state, action) => {
           state.cat = {
            id: action.payload[0].id,
            url: action.payload[0].url,
           }
        },
        [getAllBreeds.fulfilled]: (state,action) => {
            state.breeds = action.payload.map((breed)=>{
                return {
                    id: breed.id,
                    name: breed.name,
                }
            })
        },
        [getBreed.pending]: (state) => {state.breedLoadingStatus = 'loading'},
        [getBreed.fulfilled]: (state, action) => {
            state.breedLoadingStatus = 'success'
            state.breed = {
            name: action.payload.breeds[0].name,
            image: action.payload.url,
            temperament: action.payload.breeds[0].temperament,
            origin: action.payload.breeds[0].origin,
            lifeSpan: action.payload.breeds[0].life_span,
            weight: action.payload.breeds[0].weight.metric
        }},
        [getBreed.rejected]: (state) => {state.breedLoadingStatue = 'error'}
    }

})

const {reducer,actions} = catsSlice;

export const {changeLimit, changeBreed} = actions

export default reducer;