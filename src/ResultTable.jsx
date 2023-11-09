import React, { useEffect, useState } from "react";

const ResultTable = ({ data }) => {
    const [tableData, setTableData] = useState([]);
    console.log(tableData);

    useEffect(() => {
        if (data) {
            const newData = {
                time: data.current.time.slice(11),
                temperature: `${data.current.temperature_2m} ${data.current_units.temperature_2m}`,
            };
            setTableData((prevData) => [...prevData, newData]);
        }
    }, [data]);

    function createResLocation() {
        return tableData.map((item, index) => (
            <tr key={index}>
                <td>{item.time}</td>
                <td>{item.temperature}</td>
            </tr>
        ));
    }

    return (
        <div>
            {tableData.length > 0 && (
                <table>
                    <tbody>
                    <tr>
                        <th>Time</th>
                        <th>Value</th>
                    </tr>
                    {createResLocation()}
                    </tbody>
                </table>
            )}
        </div>
    );
};


export default ResultTable;