import React, { Component, useState } from 'react';

import auth from '../auth';

import Datetime from 'react-datetime';
import moment from 'moment';
import 'react-datetime/css/react-datetime.css';
import axios from 'axios';

const AvailableList = props => (
    <li className="list-group-item">{moment(props.provider.date).format("dddd, MMMM Do YYYY, h:mm a")}</li>
    )
const RequestedList = props => (
    <div>
<li className="list-group-item">
            <label>{props.provider.requester} -{moment(props.provider.date).format("dddd, MMMM Do YYYY, h:mm a")}</label>
          
                <label className="btn btn-success" onClick={() =>{props.onSlotUpdate(props.provider._id,2)}}>
                        Accept</label>
            <label className="btn btn-danger" onClick={() => { props.onSlotUpdate(props.provider._id,3) }}>
                           Decline</label>
                 
                </li>
                </div>
    )

    
export default class Provider extends Component {

    constructor(props) {
        super(props);

        this.onChangeSlot = this.onChangeSlot.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onSlotUpdate = this.onSlotUpdate.bind(this);


        this.state = {
            providers: [],
            provider_id: '5eff260eb71f921d8c95b320',
            username: '',
            slot: {
                date: '',
                username: '',
                status: 0
            },
            alertmsg: ''
        }

    }

    componentDidMount() {
        axios.get('https://novaappointmentbackend.herokuapp.com/providers/slots/' + this.state.provider_id)
            .then(response => {
                this.setState({ providers: response.data })
                console.log(response.data)
            })


            .catch((error) => {
                console.log(error);
            })
    }

   

    availableSlot() {
        return this.state.providers.filter( pro => pro.requester === '')
                    .map(aslot => {
                        return <AvailableList provider={aslot} key={aslot._id} />
                    })
    }
    requestedSlot() {
        return this.state.providers.filter( pro =>  pro.slot_status == 1)
                    .map(aslot => {
                        return <RequestedList provider={aslot} onSlotUpdate={this.onSlotUpdate} key={aslot._id} />
                    })
    }
    bookedSlot() {
        return this.state.providers.filter(pro => pro.username !== '' && pro.slot_status == 2)
                    .map(aslot => {
                        return <AvailableList provider={aslot} key={aslot._id} />
                    })
    }
    rejectedSlot() {
        return this.state.providers.filter(pro => pro.username !== '' && pro.slot_status == 3)
                    .map(aslot => {
                        return <AvailableList provider={aslot} key={aslot._id} />
                    })
    }

    onSlotUpdate(s,v) {


        console.log(s+' '+v);
        const slot = {
            status: v,
            slot_id: s
        }

        axios.post('https://novaappointmentbackend.herokuapp.com/providers/slotupdate/5eff260eb71f921d8c95b320', slot)
            .then(res => {
                console.log(res)
                this.setState({
                    alertmsg: res.data.alertmsg,
                    providers: res.data.newslots
                });

            });
    }

    onChangeSlot(et) {
        this.setState({
            slot: {
                date: et,
                requester: '',
                slot_status: 0
            }
        })
        console.log(this.state.slot);
    }
    

    onSubmit(e) {
        e.preventDefault();
        const slot = {
            slot: this.state.slot
        }
        console.log(slot);
        axios.post('https://novaappointmentbackend.herokuapp.com/providers/slot/5eff260eb71f921d8c95b320', slot)
            .then(res => {
                console.log(res)
                this.setState({ 
                    alertmsg: res.data.alertmsg,
                    providers: res.data.newslots
                 });
             
            });

        this.setState({
            slot: ''
        })
    }

    render() {
        let alert = '';
        if (this.state.alertmsg) {
            alert = <div className="alert alert-info alert-dismissible fade show"
                role="alert">
                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <strong>{this.state.alertmsg}</strong>
            </div>
        } else {
            alert = '';
        }

        return (
            <div>
                {alert}
                <div className="container text-center">
                    <h1 className="display-7">Qatar Cars</h1>
                    <button className="btn btn-sm btn-danger"
                        onClick={
                            () => {
                                auth.logout(() => {
                                    this.props.history.push("/")
                                })
                            }
                        }>Provider Logout</button>
                    <p className="">We are Qatar Cars, help to anything regarding your cars. <br />
                    Book an appointment with us.</p>
                    <hr className="my-1" />
                    <h4>Appointment Slots</h4>
                    <p> Select your preferred Available Date</p>
                    <form onSubmit={this.onSubmit} className="row text-center">
                        <div className="form-group col-4">
                            
                            <Datetime
                                inputProps={{required:true}}
                                value={this.state.slot.date}
                                onChange={val =>this.onChangeSlot(val)}
                                showTimeSelect
                                dateFormat="DD-MM-YYYY"
                                timeFormat="hh:mm A"

                            /> 
                        </div>
                        <div className="form-group col-4">
                            <input type="submit" value="Create New Slot" className="btn btn-primary" />
                        </div>
                    </form>


                </div>


                <div className="container">
                    <div className="row row-cols-2">
                        <div className="col">

                            <label className="col-sm-5 col-form-label col-form-label-lg">Available Slots</label>
                            <ul className="list-group">
                                {this.availableSlot() }
                            </ul>

                        </div>
                        <div className="col">
                            <label className="col-sm-5 col-form-label col-form-label-lg">Requested Slots</label>
                            {this.requestedSlot()}
                        </div>

                    </div>
                    <div className="row row-cols-2">
                        <div className="col">
                            <label className="col-sm-5 col-form-label col-form-label-lg">Booked Slots</label>
                            {this.bookedSlot()}
                        </div>
                        <div className="col">
                            <label className="col-sm-5 col-form-label col-form-label-lg">Rejected Slots</label>
                            {this.rejectedSlot()}
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}