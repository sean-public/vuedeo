<script>
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  props: {
    title: {
      type: String,
      default: null
    },
    chartdata: {
      type: Array,
      default: null
    },
    options: {
      type: Object,
      default: function() {
        return {
          spanGaps: true,
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            yAxes: [
              {id: 'big', type: 'linear', position: 'left'},
              {id: 'small', type: 'linear', position: 'right'}
            ]
          },
          title: {
            display: typeof this.title !== 'undefined',
            text: this.title
          }
        }
      }
    }
  },
  mounted () {
    console.log(this.chartdata)
    let labels = new Set()
    let videoSendBitsPerSecond = []
    let videoRecvBitsPerSecond = []
    let videoSendPacketLoss = []
    let videoRecvPacketLoss = []
    
    for (const sample of this.chartdata) {
      labels.add(sample.time)
      videoSendBitsPerSecond.push(sample.videoSendBitsPerSecond)
      videoRecvBitsPerSecond.push(sample.videoRecvBitsPerSecond)
      videoSendPacketLoss.push(sample.videoSendPacketLoss)
      videoRecvPacketLoss.push(sample.videoRecvPacketLoss)
    }

    const data = {
      labels: Array.from(labels).sort(),
      datasets: [
        { label: 'send bits/sec', data: videoSendBitsPerSecond, borderColor: '#56D', yAxisID: 'big'},
        { label: 'recv bits/sec', data: videoRecvBitsPerSecond, borderColor: '#5AD', yAxisID: 'big' },
        { label: 'send packet loss', data: videoSendPacketLoss, borderColor: '#DC5', yAxisID: 'small' },
        { label: 'send packet loss', data: videoRecvPacketLoss, borderColor: '#D77', yAxisID: 'small' }
      ]
    }
    this.renderChart(data, this.options);
  }
}</script>

<style scoped>
</style>
