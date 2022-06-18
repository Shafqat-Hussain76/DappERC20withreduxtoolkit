import { getname, getsymbol, getsupply, getdecimals, getbalance } from "./redux/appreducer";
import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import { LoadBlockchain } from "./redux/appreducer";
import { assert } from "chai";

function App() {
  const dispatch = useDispatch();
  const list = useSelector((e)=>e.finalappreducer);
  const {contractProvider, conractSigner, accounts } = list;
  const reading = useSelector((e)=>e.finalappreducer.reading);
  console.log(accounts);
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [supply, setSupply] = useState("");
  const [decimals, setDecimals] = useState(0);
  const [bal, setBal] = useState("");
  const [add, setAdd] = useState("");
  const [apAdd, setApAdd] = useState("");
  const [apAmt, setApAmt] = useState("");
  const [trAdd, setTrAdd] = useState("");
  const [trAmt, setTrAmt] = useState("");
  const [frAdd, setFrAdd] = useState("");
  const [toAdd, setToAdd] = useState("");
  const [trfAmt, setTrfAmt] = useState(0);

  console.log(list);

  const load = ()=>{
    dispatch(LoadBlockchain());
  };

  const readvals = async ()=>{
    const val1 = await contractProvider.name();
    setName(val1);
    const val2 = await contractProvider.symbol();
    setSymbol(val2);
    const val3 = await contractProvider.decimals();
    setDecimals(val3);
    const val4 = await contractProvider.totalSupply();
    const val5 = val4.toString();
    setSupply(val5);
  };

  const getbal = async ()=>{
    const val1 = await contractProvider.balanceOf(add);
    const val2 = val1.toString();
    setBal(val2);
  }
  const appTK = async ()=>{
    const val1 = await conractSigner.approve(apAdd, apAmt);
    await val1.wait();
  };
  const traTK = async ()=>{
    const val1 = await conractSigner.transfer(trAdd, trAmt);
    await val1.wait();
  }
  const trafTK = async()=>{
    const val1 = await conractSigner.transferFrom(frAdd, toAdd, trfAmt);
    await val1.wait();

  }
  const buy= async()=>{
    const val1 = await conractSigner.buyTokens();
    await val1.wait();

  }
  return (
    <>
    <div className="App">
      <button onClick={load}>Connect Metamask</button><br /><br />
      <button onClick={buy}>Buy Tokens</button>
      <h5>The Contract Name is:- { name }</h5>
      <h5>The Contract Symbol is:- { symbol }</h5>
      <h5>The Token Total Supply is:- { supply } WEI</h5>
      <h5>The Contract Decimals are:- { decimals }</h5>
      <button onClick={readvals}>Update the Values</button>
      <h5>Enter address for Balance</h5>
      <input value={add} onChange={(e)=>setAdd(e.target.value)} /><br />
      <button onClick={getbal}>Click for Balance</button>
      <h5>The Balance of address:-<small> { add }</small> is :- { bal }</h5>   
    </div>
    <div>
      <h3>Approve the Tokens</h3>
      <input value={apAdd} onChange={(e)=>setApAdd(e.target.value)} placeholder="address"/>
      <input value={apAmt} onChange={(e)=>setApAmt(e.target.value)} placeholder="tokens"/>
      <button onClick={appTK}>Click for Approval</button><br />

      <h3>Transfer the Tokens</h3>
      <input value={trAdd} onChange={(e)=>setTrAdd(e.target.value)} placeholder="address"/>
      <input value={trAmt} onChange={(e)=>setTrAmt(e.target.value)} placeholder="tokens" />
      <button onClick={traTK}>Click for Transfer</button>

      <h3>Transfer From the Tokens</h3>
      <input value={frAdd} onChange={(e)=>setFrAdd(e.target.value)} placeholder="address-from"/>
      <input value={toAdd} onChange={(e)=>setToAdd(e.target.value)} placeholder="address-to"/>
      <input value={trfAmt} onChange={(e)=>setTrfAmt(e.target.value)} placeholder="tokens" />
      <button onClick={trafTK}>Click for Transfer From</button>

    </div>
    </>

  );
}

export default App;
