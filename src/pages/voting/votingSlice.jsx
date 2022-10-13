import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { APIKEY } from "../../variables";



const userId = 'testUser5351';

const initialState = {
    voteResponse:{},
    voteStatus: '',
    logs:[],
}


export const vote = createAsyncThunk('voting/vote', async (cat) => {
    let res = await fetch(`https://api.thecatapi.com/v1/votes`,{
        method:"POST",
        headers: {
            "Content-Type": 'application/json',
            "x-api-key": APIKEY
        },
        body: JSON.stringify({
            "image_id":cat.imageId,
            "sub_id": userId,
            "value":cat.vote,
        })
    })
    let status = res.ok ? 'Success' : 'Error';
    res = await res.json();
    let type = res.value > 0 ? 'Likes' : 'Dislikes'
    
    
    return  {...res, status, type}
})

export const addToFavorite = createAsyncThunk('voting/addToFavorite', async (id) => {
    let res = await fetch(`https://api.thecatapi.com/v1/favourites`,{
          method:"POST",
          headers: {
              "Content-Type": 'application/json',
              "x-api-key": APIKEY
          },
          body: JSON.stringify({
            "image_id": id,
            "sub_id":userId
        })
      })
    let status = res.ok ? 'Success' : 'Error';
    let type = 'Favorites';
    res = await res.json()
    
    return  {...res, status, type}
  })
  

const createLog = ({id,type,status,message}) => ({
    time: `${new Date().getHours() > 9 ? new Date().getHours(): '0' + new Date().getHours()} : ${ new Date().getMinutes() > 9 ? new Date().getMinutes() : '0' + new Date().getMinutes() }`,
    id,
    type,
    status,
    message
})


const votingSlice = createSlice({
    name:'voting',
    initialState,
    reducers:{
    },
    extraReducers: {
        [vote.fulfilled]: (state, action) => {
            state.logs.push(createLog(action.payload));
            state.voteResponse = action.payload;
        },
        [vote.rejected]: (state, action) => {
            state.logs.push(createLog(action.payload));
            state.voteResponse = {status: 'error', message:'Fetching error'}
        },
        [addToFavorite.fulfilled]: (state, action) => {
            state.logs.push(createLog(action.payload));
            state.voteResponse = action.payload;
        },
        [addToFavorite.rejected]: (state, action) => {
            state.logs.push(createLog(action.payload));
            state.voteResponse = {status: 'error', message:'Fetching error'}
        },
        
    }
})

const {reducer} = votingSlice

export default reducer

