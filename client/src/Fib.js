import React, {Component} from 'react';
import axios from 'axios';


class Fib extends Component {
    state = {
        seenIndecies: [],
        values: {},
        index: ''
    }

    componentDidMount() {
        this.fetchValues();
        this.fetchIndecies();
    }

    async fetchValues() {
        const values = await axios.get('/api/values/current');
        this.setState({values: values.data});
    }

    async fetchIndecies() {
        const seenIndecies = await axios.get('/api/values/all');
        this.setState({seenIndecies: seenIndecies.data});
    }

    renderSeenIndecies() {
        return this.state.seenIndecies.map(({number})=> number).join(', ');
    }

    renderValues() {
        const entries = [];
        for(let key in this.state.values){
            entries.push(
                <div key={key}>
                    For index {key}, calculated value: {this.state.values[key]}
                </div>
            );
        }
        return entries;
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('/api/values', {
            index: this.state.index
        });
        this.setState({index: ''});
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Enter an index:
                    </label>             
                    <input 
                        value={this.state.index} 
                        onChange={e => this.setState({index: e.target.value})}
                    />
                    <button>Submit</button>
                </form>
                <h3>Indecies I Have Seen</h3>
                    {this.renderSeenIndecies()}
                <h3>Calculated Values</h3>
                    {this.renderValues()}
            </div>
        );
    }
}

export default Fib;