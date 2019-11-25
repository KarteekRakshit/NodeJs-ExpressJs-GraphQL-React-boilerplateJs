import React, { Component } from 'react'
import Axios from 'axios'
export default class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            restaurants: []
        }
    }

    componentDidMount() {
        Axios({
            url: 'http://localhost:3000/graphql',
            method: 'post',
            data: {
                query: `
                {
                    getRestaurant{
                      id
                      name
                      cuisine
                      Address
                      rating
                    }
                  }
                `
            }
        }).then((result) => {
            console.log(result.data.data.getRestaurant)
            this.setState({
                restaurants: result.data.data.getRestaurant
            });
        });
    }
    render() {
        const myRestaurants = this.state.restaurants.map(data => {
            return <div key={data.id}>{data.name}</div>
        })

        return (
            <div>
                {myRestaurants}
            </div>
        )
    }
}
