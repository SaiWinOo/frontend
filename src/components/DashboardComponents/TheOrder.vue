<template>
    <div>
        <div class="max-w-5xl mx-auto mt-10">
            <h1 class="text-3xl text-center my-10">Order History</h1>
            <div class="flex justify-between items-center ">
                <el-date-picker
                    v-model="date"
                    type="date"
                    placeholder="Filter by Date"
                    format="YYYY/MM/DD"
                />
                <div>

                    <select id="countries" @change="monthChange($event)" class=" border border-gray-200 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full ">
                        <option value="">Filter by Months</option>
                        <option value="01">This Month</option>
                        <option value="1">Last Month</option>
                        <option value="2">Last Two Month</option>
                        <option value="3">Last Three Month</option>
                        <option value="6">Last Six Month</option>
                    </select>

                </div>
            </div>
            <div v-if="isLoading" class=" h-[20vh] flex items-center justify-center">
                <div role="status">
                    <svg class="inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-green-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
            <div v-if="orders.length === 0" class="text-center">
                <div v-if="!isLoading">
                    <h3 class="text-3xl mb-10">  There is no order yet!</h3>
                </div>
            </div>

            <div v-if="!isLoading && orders.length !== 0"  v-for="order in orders">
                <div   class="custom_shadow gap-5 flex-wrap  flex justify-between items-center py-3 my-3  px-10">
                    <div>
                        voucher - <span class="font-medium">{{ order.voucher }}</span>
                    </div>
                    <div>
                        TotalCost - <span class="font-medium"> {{ new Intl.NumberFormat('en-US').format(order.total_cost)  }} mmk</span>
                    </div>
                    <div>
                        <router-link class="text-green-400 text-3xl" :to="{name: 'order-detail', params : {id : order.id}}"><i class="bi bi-eye"></i></router-link>
                    </div>
                    <div>
                        Status
                        <select :class="{'bg-green-400' : order.status === 'paid', 'bg-yellow-300':  order.status  === 'shipped'}"   @change="statusChange($event,order.id)"  >
                            <option :selected="order.status === 'paid'"  value="paid">Paid</option>
                            <option :selected="order.status === 'shipped'"  value="shipped">Shipped</option>
                        </select>
                    </div>
                    <div>
                        Time  <span class="bg-secondary px-3 py-2 ">{{ order.time  }}</span>
                    </div>
                </div>
                <div   class="custom_shadow gap-5 flex-wrap max-w-3xl mx-auto  flex justify-between items-center py-3 my-3  px-10">
                    <div>
                        <div class="flex gap-7">
                            <img :src="order.user.profile_image" class="w-[50px] h-[50px] rounded-full" alt="">
                            <div>
                                <h4>{{ order.user.name  }}</h4>
                                <h4>{{ order.user.email  }}</h4>
                            </div>
                        </div>
                        <h4 class="my-4 font-semibold ">About {{ order.user.name }}</h4>
                        <p>{{ order.user.bio }}</p>
                    </div>
                    <div>
                        <h3 class="font-semibold mb-3">{{ order.user.name }} address</h3>
                        <h5>Country - <span class="font-bold text-xl">{{ order.user.address.country }}</span></h5>
                        <h5>State - <span class="font-bold text-xl">{{ order.user.address.state }}</span></h5>
                        <h5>Street - <span class="font-bold text-xl">{{ order.user.address.street }}</span></h5>
                    </div>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import axios from "axios";
import {mapActions, mapState} from "vuex";

export default {
    name: "TheOrder",
    data() {
        return {
            orders: [],
            isLoading : false,
            date : null,
            dateToFilter : null,
            monthToFilter : null,
        }
    },
    watch:{
      date(x){
          let date = `${x.getFullYear()}-${x.getMonth()+1}-${x.getDate()}`;
          this.fetchOrders(this.url + 'admin/orders?date='+date);
          this.dateToFilter = date;
      }
    },
    computed: {
        ...mapState(['url']),
    },
    methods: {
        ...mapActions(['showAlert']),
        fetchOrders(url) {
            this.isLoading = true;
            axios.get(url)
                .then(res => {
                    if (res.data.success === true) {
                        this.orders = res.data.orders;
                        this.isLoading = false;
                    }
                })
                .catch(e => {
                    this.showAlert(['Error', e.response.data.message, 'error']);
                })
        },
        statusChange(e,orderId){
            let formData = new FormData();
            formData.append('status', e.target.value);
            this.isLoading = true;
            axios.put(this.url + 'admin/orders/'+orderId, new URLSearchParams(formData).toString() )
            .then(res => {
                this.showAlert(['Success', res.data.message, 'success']);
                let url = '';
                if(this.dateToFilter !==  null){
                    url = this.url+'admin/orders?date='+this.dateToFilter;
                }else if(this.monthToFilter !== null){
                    url = this.url+'admin/orders?month='+this.monthToFilter;
                }else{
                    url = this.url+'admin/orders';
                }
                this.fetchOrders(url);
            })
            .catch(e => {
                alert(e.response.data.message)
            })
        },
        monthChange(month){
            this.fetchOrders(this.url+'admin/orders?month=' +month.target.value)
            this.monthToFilter = month.target.value;
            this.dateToFilter = null;
        }
    },
    mounted() {
        this.fetchOrders(this.url + 'admin/orders');
    }
}
</script>

<style scoped>

</style>
