import { Card, Table } from "react-bootstrap";
import TableRow from "./TableRow.js";

const StockTable = ({ title, stocks }) => {
    return (
        <>
            <h3>{title}</h3>
            <Card>
                <Table>
                    <thead>
                        <tr>
                            <th>Symbol</th>
                            <th>Last Price</th>
                            <th>Change</th>
                            <th>% Change</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stocks.map((stock) => <TableRow symbol lastPrice change percentChange/>)}
                    </tbody>
                </Table>
            </Card>
        </>
    );
};

export default StockTable;
