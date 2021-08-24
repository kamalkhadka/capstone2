

const KeyStat = ({ stock }) => {
    return (
        <>
            <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    Open
                    <span>{stock.open}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    High
                    <span >{stock.high}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    Low
                   <span>{stock.low}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    Volume
                    <span>{stock.volume}</span>
                </li>
            </ul>
        </>
    );
};

export default KeyStat;
