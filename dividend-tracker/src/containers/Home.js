import MarketCards  from "../components/MarketCards.js";
import StockTables from "../components/StockTables.js";

export default function Home() {

    document.title = "Investment Portfolio Tracker";

    const stocks = [];

    return (
        <>
            <h1>Market</h1>
            <MarketCards />
            <StockTables stocks={stocks}/>
        </>
    );
}