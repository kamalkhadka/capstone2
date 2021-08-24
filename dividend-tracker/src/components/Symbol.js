import {  useEffect, useState } from "react";
import {  useParams } from "react-router-dom";
import KeyStat from "./KeyStat.js";
import InvestmentApi from "../InvestmentApi.js";

export default function Symbol() {
    const [stock, setStock] = useState();
    const { symbol } = useParams();

    useEffect(() => {
        async function fetchStockQuote() {
            const stk = await InvestmentApi.yesterday(symbol);
            setStock(stk);
        };

        fetchStockQuote();

    }, [symbol]);




    document.title = `Viewing ${symbol}`;

    if (stock) {

        return (
            <>
                <div className="row justify-content-center">
                    <h1 className="text-center">{symbol}</h1>
                    <p className="text-center lead">KEY STATS</p>
                    <div className="col-md-6">
                        <KeyStat stock={stock} />
                    </div>
                </div>
            </>
        );
    } else {
        return "Loading...";
    }
}