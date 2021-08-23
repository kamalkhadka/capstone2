import { useContext, useEffect, useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import InvestmentApi from "../InvestmentApi.js";
import UserContext from "../UserContext.js";

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

    const { currentUser } = useContext(UserContext);

    

    document.title = `Viewing ${symbol}`;

    if (stock) {

        return (
            <>
                <h2 className="text-center">{symbol}</h2>
                {JSON.stringify(stock)}

            </>
        );
    } else {
        return "Loading...";
    }
}