import React from "react";
class ResultTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableData: []
        };
    }

    componentDidUpdate(prevProps) {
        if (this.props.data !== prevProps.data) {
            if (this.props.data) {
                const newData = {
                    time: this.props.data.current.time.slice(11),
                    temperature: `${this.props.data.current.temperature_2m} ${this.props.data.current_units.temperature_2m}`
                };
                this.setState((prevState) => ({
                    tableData: [...prevState.tableData, newData]
                }));
            }
        }
    }

    createResLocation() {
        return this.state.tableData.map((item, index) => (
            <tr key={index}>
                <td>{item.time}</td>
                <td>{item.temperature}</td>
            </tr>
        ));
    }

    render() {
        return (
            <div>
                {this.state.tableData.length > 0 && (
                    <table>
                        <tbody>
                        <tr>
                            <th>Time</th>
                            <th>Value</th>
                        </tr>
                        {this.createResLocation()}
                        </tbody>
                    </table>
                )}
            </div>
        );
    }
}

export default ResultTable;