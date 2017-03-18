import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import ReactEcharts from 'echarts-for-react';
import styles from './style'

class Chart extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div styleName="pie-react">
                <ReactEcharts ref='echarts_react'
                        option={this.props.option} 
                        style={{height: '100%',width:'100%'}} />
            </div>
        )
    }
}
export default CSSModules(Chart,styles);