import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { APIKEY } from "../../variables";



const userId = 'testUser5351';

const initialState = {
    voteResponse:{},
    voteStatus: '',
}


export const vote = createAsyncThunk('voting/vote', async (cat) => {
  const res = await fetch(`https://api.thecatapi.com/v1/votes`,{
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
  return await res.json()
})

export const addToFavorite = createAsyncThunk('voting/addToFavorite', async (id) => {
    const res = await fetch(`https://api.thecatapi.com/v1/favourites`,{
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
    return await res.json()
  })
  


const votingSlice = createSlice({
    name:'voting',
    initialState,
    reducers:{},
    extraReducers: {
        [vote.fulfilled]: (state, action) => {
            state.voteStatus = 'success';
            state.voteResponse = action.payload;
        },
        [vote.rejected]: (state) => {state.voteStatus = 'error';},
        [addToFavorite.fulfilled]: (state, action) => {
            state.voteStatus = 'success';
            state.voteResponse = action.payload;
        },
        [addToFavorite.rejected]: (state) => {state.voteStatus = 'error';},
        
    }
})

const {reducer} = votingSlice

export default reducer