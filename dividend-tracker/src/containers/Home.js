import { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import Jumbotron from "../components/Jumbotron.js";
import StockTables from "../components/StockTables.js";
import InvestmentApi from "../InvestmentApi.js";
import UserContext from "../UserContext.js";

export default function Home() {
    const [stocks, setStocks] = useState();

    useEffect(() => {
        async function fetchMarketData() {
            const stks = await InvestmentApi.market();
            setStocks(stks);
        };

        fetchMarketData();

    }, []);

    const { currentUser } = useContext(UserContext);

    if (currentUser) {
        return <Redirect to="/dashboard" />
    }

    document.title = "Investment Portfolio Tracker";

    if (stocks) {

        return (
            <>
                <Jumbotron />
                <StockTables stocks={stocks} />
            </>
        );
    } else {
        return "Loading...";
    }
}