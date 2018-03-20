/**
 * @function encodeFormData
 *
 * 将post,put的requestBody 转化成 urlEncode表单编码
 * */
function encodeFormData(data) {
    let pairs = []

    for (let key in data) {
        if (data[key]) {
            let name = encodeURIComponent(key.toString().replace(' ', ''))
            let value = encodeURIComponent(data[key].toString().replace(' ', ''))

            if (value) {
                // 过滤value为假值的属性
                pairs.push(name + '=' + value)
            }
        }
    }

    return pairs.join('&')
}

/**
 * @function report
 * 性能数据上报
 * */
function report(data) {
    let url = `${url}${image}`
    let query = ''
    let imgElement = new Image()

    if (url && data) {
        query = encodeFormData(data)

        if (data) {
            url = url + '?' + query
        }
    }

    imgElement.src = url

    imgElement.onload = imgElement.onerror = function imgCallback() {
        imgElement = null
    }
}

/**
 * @function getPerformanceInfo
 *
 * 通过浏览器提供的window.performance接口去获取网页的性能数据
 *
 * @provide:
 * dns DNS查询耗时
 * tcp 建立tcp链接耗时
 * request 发出请求耗时
 * response 服务器响应资源耗时 （便于分析服务器的性能：带宽，处理速度）
 * dom 构建整个dom树的过程耗时 (用于分析首页dom结构优化)
 * whiteScreen 白屏时间间隔 (可优化用户体验)
 * domReady 网页加载到dom树构建完成的时间戳ms (分析网页首屏加载性能)
 * load 网页加载完所有资源的时间戳ms (分析网页)
 *
 * @note: 所有的数据参数单位为: ms 毫秒级
 * */
function getPerformanceInfo() {
    let navigationTiming = null
    let data = {}

    if (!window.performance) {
        console.log('当前你的浏览器不支持window.performance')
        data.notSupport = 1 // 在客户端不支持的情况下，也需要将不支持的客户端提供到数据统计中心，否则数据就会失真
    }

    navigationTiming = window.performance.timing

    data.dns = navigationTiming.domainLookupEnd - navigationTiming.domainLookupStart
    data.tcp = navigationTiming.connectEnd - navigationTiming.connectStart
    data.request = navigationTiming.responseStart - navigationTiming.requestStart
    data.response = navigationTiming.responseEnd - navigationTiming.responseStart
    data.dom = navigationTiming.domComplete - navigationTiming.domLoading
    data.whiteScreen = navigationTiming.responseStart - navigationTiming.navigationStart
    data.domReady = navigationTiming.domContentLoadedEventStart - navigationTiming.navigationStart
    data.load = navigationTiming.loadEventStart - navigationTiming.navigationStart

    return data
}

/**
 * @function analysisPerformance
 *
 * 分析性能数据回调函数
 * */
function analysisPerformance() {
    let data = getPerformanceInfo()

    report(data)
}

/**
 * @function errorFn
 *
 * 网页发生错误的时候,捕捉错误并发送报告到统计中心
 * */
function windowError(msg, url, lineNo, columnNo, error) {
    let data = {}

    data.msg = msg
    data.url = url
    data.lineNo = lineNo
    data.columnNo = columnNo

    report(data)
}


let url = ''
let image = '' // 默认: v.gif

/**
 * @function monitor
 *
 * @param {Object | String} options 监控的参数配置
 *
 * @return void
 * */
function monitor(options) {
    if (!options) {
        throw new Error('You need to config first!')
    }

    if (typeof options === 'string') {
        url = options
    }

    url = options['url']
    image = options['image'] || 'v.gif'

    if (!url) {
        throw new Error('Url is required!')
    }

    window.onload = analysisPerformance
    window.onerror = windowError
}

export default monitor