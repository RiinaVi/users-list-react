import React from "react";
import axios from 'axios';
import './Months.css';

export default class Months extends React.Component {
    createMonthTable = users => {
        let monthsList = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
        let monthsContainer = [], month = [], monthInfo = [],newClassName = '';
        for (let i = 0; i < monthsList.length; i++) {
            let counter = 0;
            for (let j = 0; j < users.length; j++) {
                if(new Date(Date.parse(users[j]['dob'])).getMonth()===i){
                    counter++;
                    monthInfo.push(<li key={users[j]['id']} type={'1'} className={'userInfo'}>{(users[j]['firstName']+' '+
                        users[j]['lastName'])+'\n'}</li>);
                }
            }
            if(counter < 3) {
                newClassName='month grey-bg';
            } else if(counter < 7) {
                newClassName='month blue-bg';
            } else if(counter < 11) {
                newClassName='month green-bg';
            } else {
                newClassName='month red-bg';
            }
            month.push(<div  onClick={() => {}} className={newClassName}>{monthsList[i]} </div>);
            month.push(<div className={'monthInfo'}><div className={'content'}>{monthInfo}</div></div>);
            monthInfo = [];
        }
        monthsContainer.push(<div className={'monthsContainer'}>{month}</div>);
        return monthsContainer;
    };
    constructor(props) {
        super(props);
        this.state = {users:[]};
    }
    UNSAFE_componentWillMount() {
        axios.get('https://yalantis-react-school.herokuapp.com/api/task0/users')
            .then(response => {
                const data = response.data;
                this.setState({users:data});
            });
    }
    render() {
        return (
            <div className={'mainContainer'}>
                <h1 id={'title'}>Users list:</h1>
                {this.createMonthTable(this.state.users)}
            </div>
        )
    }
}
