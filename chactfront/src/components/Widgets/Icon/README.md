# mj-icon

###  通用按钮

### 示例
```js
import Icon from './components/Icon';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {}
  componentDidMount() {}
  componentWillReceiveProps() {}
  componentWillUnmount() {}
  changeFun(){
    console.log('click');
  }

  render() {
    return (
      <div>
        <Icon
        className='aa'
        type='searchb'   //icon类名
        size='16'         //icon font-size
        color='#333'  //颜色
        onClick={this.changeFun.bind(this)}
        />
      </div>
    )
  }
}
