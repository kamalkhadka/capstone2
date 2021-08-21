import {  Table } from "react-bootstrap";
import TableRow from "./TableRow.js";

const StockTable = ({ title, stocks }) => {
    return (
        <>
            <h3>{title}</h3>
            
                <Table hover>
                    <thead>
                        <tr>
                            <th>Symbol</th>
                            <th>Last Price</th>
                            <th>Change</th>
                            <th>% Change</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stocks.map((stock) => 
                            <TableRow key={stock.symbol} 
                                            symbol={stock.symbol} l
                                            astPrice change={stock.change} 
                                            percentChange={stock.changePercent}/>)}
                    </tbody>
                </Table>
            
        </>
    );
};

export default StockTable;
