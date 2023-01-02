<template>
    <div>
        <h1 class="text-2xl font-mono font-semibold text-center ">This Year order</h1>
        <Bar v-if="dataForChart"
             id="my-chart-id"
             :options="chartOptions"
             :data="chartData"
        />
    </div>
</template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import axios from "axios";
import {mapState} from "vuex";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
    name: 'ThisYear',
    components: { Bar },
    data() {
        return {
            dataForChart : null,
            chartData: {
                labels: [ 'Jan', 'Feb', 'Mar','Apr','May','June','July','Aug','Sep','Oct','Nov','Dec' ],
                datasets: [ {
                    label : 'This Year Orders',
                    data: null,
                    backgroundColor : '#f2d100',
                } ]
            },
            chartOptions: {
                responsive: true,
            }
        }
    },
    computed:{
        ...mapState(['url']),
    },
    mounted() {
        axios.get(this.url+ 'admin/orders-chart')
        .then(res =>{
            this.chartData.datasets[0].data = Object.values(res.data.yearOrders)
            this.dataForChart   = 'something';
        })
    }
}
</script>
