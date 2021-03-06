import { Col, Row } from "react-bootstrap";
import StockTable from "./StockTable.js";


const StockTables = ({ stocks }) => {

    const mostActive = stocks.data.actives || [];
    const gainers = stocks.data.gainers || [];
    const losers = stocks.data.losers || [];

    return (
        <>
            <Row className="mt-4">
                <Col>
                    <StockTable title="Most Active" stocks={mostActive} />
                </Col>
                <Col>
                    <StockTable title="Gainers" stocks={gainers} />
                </Col>
                <Col>
                    <StockTable title="Losers" stocks={losers} />
                </Col>

            </Row>
        </>
    );
};

export default StockTables;
