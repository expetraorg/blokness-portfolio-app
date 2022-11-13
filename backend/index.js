import axios from 'axios';
import express from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});


// constants
const apiUrl = 'http://api.blokness.io/'
const apiKey = '3AF57A73-DD38-459D-9B90-119CB01DA383'//'BLK.pxBOd7gi1FzvYoKaHR9yV1Mp4Ujr9ALl4Mqj2PzwPgnjxT9tK/kgYbMHbhrpC5ww'
//const wallet = '0xd131207F08FED0f83502aE40CE0774bb008e55E5' //'0xE35e2E4624987575dFD263b124a3999E180b8b89'
//const exampleCall = 'http://api.blokness.io/nfts?wallet=0xd131207F08FED0f83502aE40CE0774bb008e55E5';


app.get("/nfts", async (req, res) => {
    
    try{

    let { address } = req.query;
    let url =`http://api.blokness.io/nfts?wallet=${address}`
    //console.log(url);
    const response = await axios.get(url, { headers: { 'x-api-key': apiKey } });
    const userNFTs = response.data;
    res.send(userNFTs);
    } catch (err) {
        res.send(err);
    }
});


app.get("/collections", async (req, res) => {
    
    try{

    let { address } = req.query;
    let url =`http://api.blokness.io/collections?wallet=${address}&limit=10`
    //http://api.blokness.io/collections?wallet=0xE35e2E4624987575dFD263b124a3999E180b8b89&limit=10
    const response = await axios.get(url, { headers: { 'x-api-key': apiKey } });
    const userNFTs = response.data;
    res.send(userNFTs);
    } catch (err) {
        res.send(err);
    }
});
