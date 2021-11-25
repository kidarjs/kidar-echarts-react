import React, { useEffect, useRef } from 'react'
import * as echarts from 'echarts'
import { EchartsPlugin, Column, BaseData } from 'kidar-echarts-plugins/helper'

import { removeListenElResize, listenElResize } from 'nkxrb-tools'

type Context = {
  col: Column,
  item: BaseData,
  type: string
}

type Prop = {
  style: Object
  type: string
  data: BaseData[],
  cols?: Column[],
  theme?: string
  tooltip?: (params: Context) => string,
  click?: (params: unknown) => void
}

const __DEV__ = process.env.NODE_ENV === 'development'
const PLUGINS: Map<string, EchartsPlugin> = new Map()

const KidarEcharts = React.memo<Prop>(prop => {
  const { style, type, cols, data, theme, tooltip, click } = prop
  const KidarEchartsEl = useRef(null);
  let chart: echarts.ECharts | null = null
  const init = () => {
    chart = echarts.init(KidarEchartsEl.current, theme)

    listenElResize(KidarEchartsEl.current, () => {
      resetOption()
      chart && chart.resize()
    })
  }

  const resetOption = () => {
    if (!PLUGINS.has(type)) {
      __DEV__ && console.warn(`it's not exist ${type} plugin, you can try [ npm i kidar-echarts-plugins or custom plugins]`)
      return
    }

    const option = PLUGINS.get(type).resetOption(cols, data, { ...prop, chart, init })
    if (option) {
      chart.setOption(option, true)
    }
  }

  useEffect(() => {
    !chart && init()
    resetOption()
    return () => {
      removeListenElResize(KidarEchartsEl.current)
    }
  }, [type, cols, data, tooltip])

  useEffect(() => {
    chart.dispose()
    init()
  }, [theme])

  useEffect(() => {
    chart.on('click', params => click(params))
  }, [click])


  return (
    <div ref={KidarEchartsEl} style={{ ...style, overflow: 'hidden' }}></div>
  )
})

const addKidarEchartsPlugin = (pluginName: string, plugin: EchartsPlugin) => {
  if (PLUGINS.has(pluginName)) {
    __DEV__ && console.warn(`pluginName is exist 【${pluginName}】 该插件名已存在, 重复注册将覆盖已有的插件！`)
  }
  PLUGINS.set(pluginName, plugin)
}


export { KidarEcharts, addKidarEchartsPlugin }