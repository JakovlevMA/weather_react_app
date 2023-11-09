import React, { useState } from "react";
import ResultTable from "./ResultTable";

const TableData = () => {
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");
    const [locations, setLocations] = useState([]);
    const [data, setData] = useState(null);

    async function fetchData() {
        let response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m`
    );
        let data = await response.json();
        setData(data);
    }

    function addNewLocation() {
        fetchData();
        const newLocaton = {
            latitude,
            longitude,
        };
        setLocations([...locations, newLocaton]);
        setLatitude("");
        setLongitude("");
    }

    function removeLocation(index) {
        const updatedLocations = [...locations];
        updatedLocations.splice(index, 1);
        setLocations(updatedLocations);
    }
    return (
        <div className="container">
            <table>
                <tbody>
                <tr>
                    <th>Location</th>
                    <th>Control</th>
                </tr>
                {locations.map((location, index) => (
                    <tr key={index}>
                        <td>
                            <span>{location.latitude}</span>
                            <br />
                            <span>{location.longitude}</span>
                        </td>
                        <td>
                            <button onClick={() => removeLocation(index)}>
                                Remove Location
                            </button>
                        </td>
                    </tr>
                ))}
                <tr>
                    <td>
                        <input
                            type="text"
                            placeholder="latitude"
                            value={latitude}
                            onChange={(e) => setLatitude(e.target.value)}
                        />
                        <br />
                        <input
                            type="text"
                            placeholder="longitude"
                            value={longitude}
                            onChange={(e) => setLongitude(e.target.value)}
                        />
                    </td>
                    <td>
                        <button onClick={() => addNewLocation()}>Add Location</button>
                    </td>
                </tr>
                </tbody>
            </table>
            <ResultTable data={data} />
        </div>
    );
};

export default TableData;