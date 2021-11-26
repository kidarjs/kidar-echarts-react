import { Fragment, useState } from "react";
import Mock from "mockjs";
import { KidarEcharts, addKidarEchartsPlugin } from '../src/index'
import LineBarX from 'kidar-echarts-plugins/line-bar-x'
import { BaseData } from "kidar-echarts-plugins/helper";
import './style.less'
addKidarEchartsPlugin('line-bar-x', LineBarX)
const App = () => {

  const loadData = (len: number) => {
    let res = Mock.mock({
      [`data|${len}`]: [
        {
          name: "@city",
          value: "@natural(1600, 19600)",
          va: "@natural(2100, 19040)",
          vb: "@natural(1700, 5466)",
          tos: function () {
            let value = Mock.mock("@natural(1600, 9600)")
            let toVal = Number(this.value) - value
            return [{
              name: Mock.mock("@city"),
              value,
              toVal
            }]
          },
          ratio: function () {
            return Number.prototype.toFixed.call(Number(this.va) / (Number(this.va) + Number(this.vb)) * 100, 2)
          }
        }
      ]
    }).data
    const nameSet = new Set()
    return res.filter((t: BaseData) => !nameSet.has(t.name) && nameSet.add(t.name))
  }

  const cols = [
    { name: '2019', prop: 'value', color: '#fbd161', type: 'pictorialBar' },
    { name: '2021', prop: 'vb', color: '#1890ff', type: 'bar', stack: 'year' },
    { name: '2020', prop: 'va', color: '#ff90ff', type: 'bar', stack: 'year' },
    { name: '比例', prop: 'ratio', color: '#44ff99', type: 'line', y1: true }
  ]

  const [data] = useState(loadData(22))
  const [theme, setTheme] = useState('')

  const changeTheme = () => {
    theme ? setTheme('') : setTheme('dark')
  }

  return (
    <Fragment>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div style={{ width: '100%', textAlign: 'center' }}>
          <h1>Hello KidarEcharts</h1>
          <p>
            <button onClick={() => changeTheme()}>切换主题</button>
          </p>
          <KidarEcharts className='charts' cols={cols} data={data} extra={{ omit: 14 }} type='line-bar-x'></KidarEcharts>
          <KidarEcharts className='charts' theme={theme} cols={cols} data={data} type='line-bar-x'></KidarEcharts>
          <KidarEcharts className='charts' cols={cols} data={data} type='line-bar-x'></KidarEcharts>
        </div>
      </div>
    </Fragment>
  );
};

export default App;
