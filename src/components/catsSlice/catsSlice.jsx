import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { APIKEY } from "../../variables";


const initialState = {
    cats: [],
    cat: {},
    catsFilters:{ limit:5 },
    breeds: [],
    breed: {},
}

export const getAllCats = createAsyncThunk('cats/getAllCats', async (catsFilters = {}) => {
    let filterParams = '';
    for (let key in catsFilters) {
        if (catsFilters[key])  filterParams += `&${key}=${catsFilters[key]}`
    }
    const res = await fetch(`https://api.thecatapi.com/v1/images/search?api_key=${APIKEY}&has_breeds=1&size=full${filterParams}`);
    return await res.json();
});

export const getCat = createAsyncThunk('cats/getCat', async () => {
    const res = await fetch(`https://api.thecatapi.com/v1/images/search?api_key=${APIKEY}`);
    return await res.json();
})

export const getAllBreeds = createAsyncThunk('cats/getAllBreeds', async () => {
    const res = await fetch(`https://api.thecatapi.com/v1/breeds?api_key=${APIKEY}`);
    return await res.json();
})


export const getBreed = createAsyncThunk('cats/getAllCat', async (id) => {
    let res = await fetch(`https://api.thecatapi.com/v1/images/${id}`);
    return await res.json();
});

export const searchByBreedName = createAsyncThunk('/cats/searchByBreadName', async(name) => {
    let breeds = await fetch(`https://api.thecatapi.com/v1/breeds?api_key=${APIKEY}`);
    breeds = await breeds.json()
    let breed = breeds.find((breed) => breed.name.toLowerCase() == name.toLowerCase());
    let res = {};
    if (breed) {
        res = await fetch(`https://api.thecatapi.com/v1/images/search?api_key=${APIKEY}&has_breeds=1&limit=20&breed_ids=${breed.id}`);
        res = await res.json();
       return { cats:res, isFound:true}
    }
    return {isFound:false}
})




const catsSlice = createSlice({
    name: 'cats',
    initialState,
    reducers: {
        changeLimit: (state, action) => {state.catsFilters.limit = action.payload},
        changeBreed: (state, action) => {state.catsFilters['breed_ids'] = action.payload},
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
        [getBreed.pending]: (state) => {
            state.searchResults = [];
            state.breedLoadingStatus = 'loading'
        },
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
        [getBreed.rejected]: (state) => {state.breedLoadingStatue = 'error'},
        [searchByBreedName.pending]: (state) => {
            state.searchResults = [];
            state.status = 'loading'
        },
        [searchByBreedName.fulfilled]: (state, action) => {
            state.status = 'success';
            if (action.payload.isFound) {
                state.searchResults = action.payload.cats.map((cat)=>{
                    return {
                        id: cat.id,
                        url: cat.url,
                        breedId: cat.breeds[0].id,
                        breedName: cat.breeds[0].name,
                    }
                })
            }
        },
        [searchByBreedName.rejected]: (state) => {
            state.status = null;
            state.searchResults = [];
        },
       
    }

})

const {reducer,actions} = catsSlice;

export const {changeLimit, changeBreed,} = actions

export default reducer;