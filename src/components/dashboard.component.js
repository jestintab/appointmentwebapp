import React, { Component } from 'react';

import auth from "../auth";
import {
    Link
} from "react-router-dom";


export default class Dashboard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container text-center mt-5 " >
                <div className="mb-5">
                   <Link to="/users" className="btn  btn-primary mr-1" href="#">Create User</Link>
                </div>
                <button className="btn btn-lg btn-success"
                    onClick={
                        () => {
                            auth.login(() => {
                                this.props.history.push("/provider")
                            })
                        }
                    }>Provider Login</button>
            </div>
        );
    }
}

