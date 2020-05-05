<template>
  <div>
    <cart-list-item v-for="item in cartList" :key="item.iid" :item-info="item"/>
  </div>
</template>

<script>

import CartListItem from './CartListItem'

import {mapGetters} from 'vuex'

export default {
  name: 'CartList',
  computed: {
    ...mapGetters(['cartList'])
  },
  components: {
    CartListItem
  }
}
</script>

<style>
 
</style>
