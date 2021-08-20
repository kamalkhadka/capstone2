import { Card, Row } from "react-bootstrap";

const MarketCard = ({ symbol, position, changeData }) => {
    return (
        <Card>
            <Card.Body>
                <Card.Title>
                    {symbol || "DJIA"}
                    <br />
                    <span>{position || "35,120.08"}</span>

                </Card.Title>
                <Card.Text>
                    <span>
                        {changeData || "+225.96 | +0.65%"}
                    </span>
                </Card.Text>
            </Card.Body>
        </Card >
    );
};

export default MarketCard;
