import React, { useEffect, useRef } from 'react'
import * as echarts from 'echarts'
import { EchartsPlugin, Column, BaseData, KidarEchartsContext } from '../types/index'
import { kidarDarkTheme } from './theme/index'
import { kidarLightTheme } from './theme/kidarLightTheme'

import { removeListenElResize, listenElResize } from 'nkxrb-tools'

const KidarEcharts = React.memo(data => {

  const KidarEchartsEl = useRef(null);
  let chart: echarts.ECharts | null = null
  const init = () => {
    let themeName: string | Object = 'light'
    chart = echarts.init(KidarEchartsEl.current, themeName)

    listenElResize(KidarEchartsEl.current, () => {
      resetOption()
      chart && chart.resize()
    })
    resetOption()
  }

  const resetOption = () => {
    chart.setOption({
      series: [
        { type: 'pie', data: [{ name: '132', value: 123 }] }
      ]
    })
  }

  useEffect(() => {
    init()
  })


  return (
    <div ref={KidarEchartsEl} style={{ ...data.style, overflow: 'hidden' }}>echarts</div>
  )
})

export { KidarEcharts }