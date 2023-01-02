<template>
    <div>
        <h1 class="text-2xl font-mono font-semibold text-center ">This Month order</h1>
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
    name: 'ThisMonth',
    components: { Bar },
    data() {
        return {
            dataForChart : null,
            chartData: {
                labels: [ 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31 ],
                datasets: [ {
                    label : 'This Month Orders',
                    data: null,
                    backgroundColor : '#0f9d22',
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
                this.chartData.datasets[0].data = Object.values(res.data.monthOrders)
                this.dataForChart   = 'something';
            })
    }
}
</script>
