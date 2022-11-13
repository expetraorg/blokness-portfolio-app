import React from 'react'
import axios from "axios";
import { useState, useEffect } from "react";



function NFTsBlokness({ wallet, nfts, setNfts, collections, setCollections}){
    const [nameFilter, setNameFilter] = useState("");
    const [idFilter, setIdFilter] = useState("");

    async function getNftPortfolio(){
        //getUserCollections();
        getUserNfts();
    }
  
    async function getUserNfts() {
        const response = await axios.get("https://blokness-portfolio-app.vercel.app/nfts", {
          params: {
            address: wallet
          },
        });
        const response2 = await axios.get("https://blokness-portfolio-app.vercel.app/collections", {
          params: {
            address: wallet
          },
        });
    
        if (response.data.data && response2.data.data) {
            console.log(response.data.data)
            console.log(response2.data.data)
            nftProcessing(response.data.data, response2.data.data);
        }
    }
    function nftProcessing(t, coll) {
        for (let i = 0; i < t.length; i++) {
            for (let j = 0; j < coll.length; j++) {
                if (t[i].collection_address === coll[j].contract_address){
                    t[i].current_floor = coll[j].current_floor
                    break;
                }
            }
        }
        
        setCollections(t);
        setNfts(t);
    }



    return (
        <div className="NFTSSection">
                <h1 className='h1_port'>NFT portfolio by Blokness</h1>

                <div className='btn nftBTN' onClick={getNftPortfolio}>Fetch NFTs with Blokness</div>

        <br />
            {nfts.length > 0 && nfts.map((e) => {
                return (
                <>
                    {e.image && <img src={e.image} width={250} />}
                    <span>Name: {e.collection_name} </span>
                    <span>Floor: <b>{e.current_floor}</b> ETH </span>
                    <span>(ID: {e.token_id})</span>
                
                    
                    <br />
                </>
                );
            })}
        
        </div>
    );
}

export default NFTsBlokness