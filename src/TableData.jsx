import React from "react";
import ResultTable from "./ResultTable";

class TableData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            latitude: "",
            longitude: "",
            locations: [],
            data: null
        };
    }

    fetchData = async () => {
        let response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${this.state.latitude}&longitude=${this.state.longitude}&current=temperature_2m`
    );
        let data = await response.json();
        this.setState({ data: data });
    }

    addNewLocation = () => {
        this.fetchData();
        const newLocation = {
            latitude: this.state.latitude,
            longitude: this.state.longitude
        };
        this.setState({
            locations: [...this.state.locations, newLocation],
            latitude: "",
            longitude: ""
        });
    }

    removeLocation = (index) => {
        const updatedLocations = [...this.state.locations];
        updatedLocations.splice(index, 1);
        this.setState({ locations: updatedLocations });
    }

    render() {
        return (
            <div className="container">
                <table>
                    <tbody>
                    <tr>
                        <th>Location</th>
                        <th>Control</th>
                    </tr>
                    {this.state.locations.map((location, index) => (
                        <tr key={index}>
                            <td>
                                <span>{location.latitude}</span>
                                <br />
                                <span>{location.longitude}</span>
                            </td>
                            <td>
                                <button onClick={() => this.removeLocation(index)}>
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
                                value={this.state.latitude}
                                onChange={(e) => this.setState({ latitude: e.target.value })}
                            />
                            <br />
                            <input
                                type="text"
                                placeholder="longitude"
                                value={this.state.longitude}
                                onChange={(e) => this.setState({ longitude: e.target.value })}
                            />
                        </td>
                        <td>
                            <button onClick={() => this.addNewLocation()}>Add Location</button>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <ResultTable data={this.state.data} />
            </div>
        );
    }
}

export default TableData;