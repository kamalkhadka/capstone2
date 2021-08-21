
const TableRow = ({ symbol, lastPrice, change, percentChange }) => {

   

    return (
        <>
            <tr>

                <td>{symbol || "RNG"}</td>
                <td>${lastPrice || 250.88}</td>
                <td>${change || -0.11}</td>
                <td>{percentChange || "-0.04" }%</td>
            </tr>
        </>
    );
};

export default TableRow;
