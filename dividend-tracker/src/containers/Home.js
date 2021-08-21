import { useEffect, useState } from "react";
import Jumbotron from "../components/Jumbotron.js";
import StockTables from "../components/StockTables.js";
import InvestmentApi from "../InvestmentApi.js";

export default function Home() {
    const [stocks, setStocks] = useState();

    useEffect(() => {
        async function fetchMarketData(){
            const stks = await InvestmentApi.market();
            setStocks(stks);
        };

        fetchMarketData();
        
      }, []);


    document.title = "Investment Portfolio Tracker";

    if(stocks){

    return (
        <>
            <Jumbotron />
            <StockTables stocks={stocks}/>
        </>
    );
    }else{
        return "Loading...";
    }
}