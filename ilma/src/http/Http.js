import axios from 'axios';
import React, { Component } from 'react'
import { View, Text, Alert } from 'react-native'
import Constants from './Constants';

export default class Http extends Component {
    constructor(props) {
        super(props);
    }

    static post = async (endpoint, data) => {
        console.log(" post request ");
        console.log(data);
        return axios.post(Constants.BASE_URL + endpoint, data)

    }
    static get = async (endpoint) => {
        return axios.get(Constants.BASE_URL + endpoint)

    }
    


}