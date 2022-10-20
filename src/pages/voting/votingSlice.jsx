import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { APIKEY } from "../../variables";
import { userId } from "../../variables";




const initialState = {
    voteResponse:{},
    voteStatus: '',
    logs:[],
}


export const getVotes = createAsyncThunk('voting/getVotes', async () => {
    let res = await fetch(`https://api.thecatapi.com/v1/votes?&order=DESC&limit=30&attach_image=1&sub_id=${userId}`,{
        method:"GET",
        headers: {
            "Content-Type": 'application/json',
            "x-api-key": APIKEY
        },
    })

    res = await res.json();

    let likes = res.filter((vote) => vote.value > 0).map(like => like.image);
    let dislikes = res.filter((vote) => vote.value <0).map(like => like.image);

    res = await fetch(`https://api.thecatapi.com/v1/favourites?sub_id=${userId}`,{
        method:"GET",
        headers: {
            "Content-Type": 'application/json',
            "x-api-key": APIKEY
        },
    })
    res = await res.json()
    const favorites =  res.map((favorite) => ({
        id: favorite.image.id,
        url:favorite.image.url
    }));
   
   
    return {likes, dislikes, favorites}
})



export const removeFromFavorites = createAsyncThunk('voting/removeFromFavorites', async (id) => {
    let res = await fetch(`https://api.thecatapi.com/v1/votes/?${id}`,{
        method:"DELETE",
        headers: {
            "Content-Type": 'application/json',
            "x-api-key": APIKEY
        },
    })
    res = await res.json()
    console.log(res);
})


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
        [getVotes.pending]: (state) => {state.getVoteStatus = 'loading'},
        [getVotes.fulfilled]: (state, action) => {
            state.getVoteStatus = 'success';
            state.likes = action.payload.likes;
            state.dislikes = action.payload.dislikes;
            state.favorites = action.payload.favorites;
        },
    }
})

const {reducer} = votingSlice

export default reducer

