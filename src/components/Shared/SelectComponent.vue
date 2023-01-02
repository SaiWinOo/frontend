<template>
  <el-select class="w-full" v-model="value" placeholder="Select">
    <el-option
        v-for="category in categories"
        :key="category.id"
        :value="category.id"
        :label="category.title"
    />
  </el-select>
</template>

<script>
import  {mapState} from "vuex";

export default {
  data() {
    return {
      value: ''
    }
  },
  watch: {
    value(selectedOption) {
      this.$emit('selected', selectedOption)
    }
  },
  computed: {
    ...mapState(['categories']),
  }
}

</script>

