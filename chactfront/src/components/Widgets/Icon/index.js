import React,{Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';

class Icon extends Component{
  constructor(props){
    super(props);
  }
  handleClick(e){
    const {onClick} = this.props;
    onClick && onClick(e);
  }
  render(){
    const {type, size, color, pointer} = this.props;
    return(
      <i className={`iconfont icon-${type}`}
        style={{color, fontSize:`${size}px`,cursor:`${pointer?'pointer':'default'}`}}
        onClick={this.handleClick.bind(this)}>
      </i>
    )
  }
}
Icon.propsTypes = {
  type: PropTypes.string,
  onClick: PropTypes.func
};

export default Icon;
