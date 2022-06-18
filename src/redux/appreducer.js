import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ethers } from "ethers";
import MYERC20 from "../artifacts/contracts/MYERC20.sol/MYERC20.json";
const contractAddress = "0x02658D0dAbca48cE22140dda5BcB889FBD6cABa6";//ropsten

const initialState = {
    contractProvider: null,
    conractSigner: null,
    accounts:[],

    reading : {
        token_name:null,
        token_symbol: null,
        token_totSupply: null,
        token_decimals: null,
        balanceof: null,
    }  
}
export const LoadBlockchain = createAsyncThunk("LoadBlockchain", async (_, thunkAPI)=>{
    try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const contractProvider = new ethers.Contract(contractAddress, MYERC20.abi, provider);
        const signer = provider.getSigner();
        const conractSigner = new ethers.Contract(contractAddress, MYERC20.abi, signer);
        const accounts = await signer.getAddress();
        return {
            contractProvider,
            conractSigner,
            accounts
        }

    }catch (err) {
        console.log(err);
    }
});

export const ercslicer = createSlice({
    name: "appslice",
    initialState,
    reducers: {
        getname: (state, action)=>{
            state.reading.token_name = action.token_name;
        },

        getsymbol: (state, action)=>{
            state.reading.token_symbol = action.token_symbol;
        },

        getsupply: (state,action)=>{
            state.reading.token_totSupply = action.token_totSupply;
        },
        getdecimals: (state,action)=>{
            state.reading.token_decimals = action.token_decimals;
        },
        getbalance: (state,action)=>{
            state.reading.balanceof = action.balanceof;
        },
    },


    extraReducers:{
        [LoadBlockchain.fulfilled.toString()]: (state, {payload})=>{
            state.contractProvider = payload?.contractProvider;
            state.conractSigner = payload?.conractSigner;
            state.accounts = payload?.accounts;
        }
    }
})

export const appreducer = ercslicer.reducer;
export const { getname, getsymbol, getsupply, getdecimals, getbalance } = ercslicer.actions;