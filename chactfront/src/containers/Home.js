import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import echarts from 'echarts';
import { queryInit, query, modifyProps } from 'actions/test';
import Chart from './Chart'
import Details from './Details'
import styles from './style'
import { dateToFormatStr, formatStrToDate } from 'utils/moment'

import { Layout, DatePicker, Button, Select, Menu, Icon } from 'antd';
const { Header, Footer, Sider, Content } = Layout;
const Option = Select.Option;
const { RangePicker } = DatePicker;

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            env: 'online',
            current: '.$bar',
            timeCondition: 'day',
            date: []
        })
        this.handleClick = this.handleClick.bind(this);
        this.changeEnv = this.changeEnv.bind(this);
        this.queryList = this.queryList.bind(this);
        this.changeDate = this.changeDate.bind(this);
        this.changeDates = this.changeDates.bind(this);
        this.changeErr = this.changeErr.bind(this);
        this.changeTime = this.changeTime.bind(this);
        this.setPieOption = this.setPieOption.bind(this);
        this.setLineOption = this.setLineOption.bind(this);
        this.setBarOption = this.setBarOption.bind(this);
        this.disabledDate = this.disabledDate.bind(this);
        this.disabledDates = this.disabledDates.bind(this);
        this.findTime = this.findTime.bind(this);
    }
    componentWillMount() {
        this.props.queryInit();
    }
    changeDate(date) {
        this.props.modifyProps({ time: [date.format('YYYYMMDD')] });
    }
    changeDates(date) {
        this.props.modifyProps({ time: this.findTime(date[0].format('YYYYMMDD'), date[1].format('YYYYMMDD')) });
    }
    findTime(sdate, edate) {
        const list = [];
        while (sdate != edate) {
            list.push(sdate);
            sdate = dateToFormatStr(new Date(formatStrToDate(sdate).getTime() + 24 * 60 * 60 * 1000));
        }
        list.push(sdate);
        return list;
    };
    queryList() {
        this.props.query()
    }
    changeEnv(e) {
        this.setState({
            env: e
        }, () => {
            this.props.modifyProps({ env: e });
        })
    }
    changeErr(e) {
        this.props.modifyProps({ err_id: e });
    }
    changeTime(e) {
        this.setState({
            timeCondition: e,
        });
        const nowtime = dateToFormatStr(new Date());
        this.props.modifyProps({ time: [nowtime] });
    }
    disabledDate(date) {
        return date && date.valueOf() > Date.now();
    }
    disabledDates(date) {
        return date && (date.valueOf() < Date.now() - 7 * 24 * 60 * 60 * 1000 || date.valueOf() > Date.now());
    }
    handleClick(e) {
        this.setState({
            current: e.key,
        });
    }
    //饼状图echarts图表配置函数
    setPieOption(data, list, num, count) {
        return {
            title: {
                text: `错误总数 ${count}`,
                textStyle: {
                    fontWeight: 'normal'
                },
                top: '30px'
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                x: 'center',
                y: 'bottom',
                data: list
            },
            calculable: true,
            series: [
                {
                    name: '面积模式',
                    type: 'pie',
                    radius: [30, 110],
                    center: ['50%', '50%'],
                    roseType: 'area',
                    data
                }
            ]
        }
    }
    //柱状图echarts图表配置函数
    setBarOption(list, num, count) {

        return {
            title: {
                text: `错误总数 ${count}`,
                textStyle: {
                    fontWeight: 'normal'
                },
                top: '30px'
            },
            grid: {
                top: '100px'
            },
            xAxis: {
                data: list,
                axisLabel: {
                    inside: true,
                    textStyle: {
                        color: '#fff'
                    }
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                z: 10
            },
            yAxis: {
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    textStyle: {
                        color: '#999'
                    }
                }
            },
            dataZoom: [
                {
                    type: 'inside'
                }
            ],
            series: [
                { // For shadow
                    type: 'bar',
                    itemStyle: {
                        normal: { color: 'rgba(0,0,0,0.05)' }
                    },
                    barGap: '-100%',
                    barCategoryGap: '40%',
                    animation: false
                },
                {
                    type: 'bar',
                    itemStyle: {
                        normal: {
                            barBorderRadius: [5, 5, 0, 0],
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [
                                    { offset: 0, color: '#83bff6' },
                                    { offset: 0.5, color: '#188df0' },
                                    { offset: 1, color: '#188df0' }
                                ]
                            )
                        },
                        emphasis: {
                            barBorderRadius: [5, 5, 0, 0],
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [
                                    { offset: 0, color: '#2378f7' },
                                    { offset: 0.7, color: '#2378f7' },
                                    { offset: 1, color: '#83bff6' }
                                ]
                            )
                        }
                    },
                    data: num
                }
            ]
        }
    }
    setLineOption(count) {
        const { app } = this.props;
        const dateinfo = app.get('dateinfo').toJS();
        dateinfo.map(value=>{
            return value[0] = formatStrToDate(value[0])
        })
        return {
            title: {
                text: `错误总数 ${count}`,
                textStyle: {
                    fontWeight: 'normal'
                },
                top: '30px'
            },
            tooltip: {
                trigger: 'axis',
                formatter: function (params) {
                    params = params[0].data;
                    const date = params[0];
                    return date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate() + ' : ' + params[1];
                },
                axisPointer: {
                    animation: false
                }
            },
            xAxis: {
                type: 'time',
                splitLine: {
                    show: false
                }
            },
            yAxis: {
                type: 'value',
                boundaryGap: [0, '100%'],
                splitLine: {
                    show: false
                }
            },
            series: [{
                type: 'line',
                showSymbol: false,
                hoverAnimation: false,
                data: dateinfo
            }]
        };

    }
    render() {
        const { current, timeCondition, env } = this.state;
        const { app } = this.props;
        const data = app ? app.get('data') : '';
        const count = app ? app.get('count') : 0;
        const link = env == 'online' ? '' : `?env=${env}`;
        const list = [], num = [], pieData = [];
        data && data.map(value => {
            const type = value.get('type');
            const listIndex = list.indexOf(type);
            if (listIndex != -1) {
                num[listIndex]++;
            } else {
                list.push(type);
                num.push(1);
            }
        })
        list.length && list.map((value, index) => {
            pieData.push({ value: num[index], name: list[index] })
        })
        return (
            <div styleName='container'>
                <Layout style={{ height: '100%' }}>
                    <Sider styleName='sider'>
                        <div styleName='con'>
                            <p styleName='sidertitle'>查询环境:</p>
                            <Select defaultValue="online" style={{ width: 120 }} onChange={this.changeEnv}>
                                <Option value="online">online</Option>
                                <Option value="test">test</Option>
                                <Option value="offline">offline</Option>
                            </Select>
                        </div>
                        <div styleName='con'>
                            <p styleName='sidertitle'>筛选类型:</p>
                            <Select defaultValue="day" style={{ width: 120 }} onChange={this.changeTime}>
                                <Option value="day">按天查询</Option>
                                <Option value="days">按时间段查询</Option>
                            </Select>
                            <div styleName='choseTime'>
                                {
                                    timeCondition == 'day' ?
                                        <DatePicker defaultValue={moment().locale('en').utcOffset(0)} allowClear={false}
                                            disabledDate={this.disabledDate} onChange={this.changeDate} /> :
                                        < RangePicker defaultValue={[moment().locale('en').utcOffset(0), moment().locale('en').utcOffset(0)]}
                                            allowClear={false} onChange={this.changeDates} disabledDate={this.disabledDates} />
                                }
                            </div>
                        </div>
                        <div styleName='con'>
                            <p styleName='sidertitle'>异常类型:</p>
                            <Select defaultValue="200000" style={{ width: 120 }} onChange={this.changeErr}>
                                <Option value="200000">异常崩溃</Option>
                                <Option value="100002">连接失败</Option>
                                <Option value="100004">返回错误</Option>
                            </Select>
                        </div>
                        <Button type='primary' styleName='envSub' onClick={this.queryList}>查询</Button>

                        <a href={`http://oa.mioji.com/opui/logQuery/index${link}`}>戳这里查询详情</a>

                    </Sider>
                    {
                        data ?
                            <Content styleName='main'>
                                <Menu onClick={this.handleClick} selectedKeys={[current]} mode="horizontal" styleName='menu'>
                                    <Menu.Item key="bar">
                                        <Icon type="bar-chart" />柱状图
                                    </Menu.Item>
                                    <Menu.Item key="pie">
                                        <Icon type="pie-chart" />饼图
                                    </Menu.Item>
                                    {
                                        timeCondition == 'days' ?
                                            <Menu.Item key="line">
                                                <Icon type="dot-chart" />折线图
                                        </Menu.Item> : ''
                                    }
                                    <Menu.Item key="list">
                                        <Icon type="bars" />列表详情
                                    </Menu.Item>
                                </Menu>
                                {
                                    count > 0 ?
                                        <div styleName='chart'>
                                            {data && current == '.$pie' && <Chart option={this.setPieOption.bind(this, pieData, list, num, count)()} />}
                                            {data && current == '.$bar' && <Chart option={this.setBarOption.bind(this, list, num, count)()} />}
                                            {data && current == '.$line' && <Chart option={this.setLineOption.bind(this,count)()} />}
                                            {data && current == '.$list' && <Details data={data.toJS()} list={list} />}
                                        </div> : <p styleName='nodata'>暂无数据</p>
                                }
                            </Content>
                            : ''
                    }
                </Layout>
            </div>
        );
    }
}
function mapStateToProps(state) {
    const app = state.get('app');
    return { app }
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({ queryInit, query, modifyProps }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(Home, styles))