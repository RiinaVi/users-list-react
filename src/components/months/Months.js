import React from "react";
import axios from 'axios';
import './Months.css';

export default class Months extends React.Component {

    fillMonthInfo = users =>{};

    createMonthTable = users => {
        let monthsList = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
        let monthsContainer = [], month = [], monthInfo = [], bgColor = '';
        for (let i = 0; i < monthsList.length; i++) {
            let counter = 0;
            for (let j = 0; j < users.length; j++) {
                if (new Date(Date.parse(users[j]['dob'])).getMonth() === i) {
                    counter++;
                    monthInfo.push(<li key={users[j]['id']}
                                       className={'userInfo'}>{(users[j]['firstName'] + ' ' +
                        users[j]['lastName']) + '\n'}</li>);
                }
            }
            if (counter < 3) {
                bgColor = 'grey-bg';
            } else if (counter < 7) {
                bgColor = 'blue-bg';
            } else if (counter < 11) {
                bgColor = 'green-bg';
            } else {
                bgColor = 'red-bg';
            }
            month.push(
                <div key={monthsList[i]} onClick={() => {
                }} className={"month " + bgColor}>
                    {monthsList[i]}
                </div>
            );
            month.push(
                <div className={'monthInfo'}>
                    <ol className={'content'}>{monthInfo}</ol>
                </div>
            );
            monthInfo = [];
        }
        monthsContainer.push(<div className={'monthsContainer'}>{month}</div>);
        return monthsContainer;
    };

    constructor(props) {
        super(props);
        this.state = {users: []};
    }

    componentDidMount() {
        axios.get('https://yalantis-react-school.herokuapp.com/api/task0/users')
            .then(response => {
                const data = response.data;
                this.setState({users: data});
            });
    }

    render() {
        return this.createMonthTable(this.state.users);
    }
}
