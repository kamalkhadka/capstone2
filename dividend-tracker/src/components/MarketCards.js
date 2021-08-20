import { Col, Row } from "react-bootstrap";
import MarketCard from "./MarketCard.js";

const MarketCards = ({ stocks }) => {
    const mostActive = [];
    const gainers = [];
    const losers = [];
    return (
        <>
            <Row>
                <Col>
                    <MarketCard />
                </Col>
                <Col>
                    <MarketCard />
                </Col>
                <Col>
                    <MarketCard />
                </Col>
            </Row>
        </>
    );
};

export default MarketCards;
