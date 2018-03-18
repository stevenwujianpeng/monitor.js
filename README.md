# monitor
前端web应用性能&amp;异常监控解决方案

##  核心需求: 网页加载时的性能数据, 集中在Navigation Timing
> 1. DNS查询耗时 ：domainLookupEnd - domainLookupStart
> 2. TCP链接耗时 ：connectEnd - connectStart
> 3. request请求耗时 ：responseEnd - responseStart 
> 4. 解析dom树耗时 ： domComplete - domLoading 
> 5. 白屏时间 ：responseStart - navigationStart
> 6. domready时间 ：domContentLoadedEventEnd - navigationStart
> 7. onload时间 ：loadEventEnd - navigationStart