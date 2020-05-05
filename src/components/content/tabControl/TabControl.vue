<template>
  <div class="tab-control">
    <div v-for="(item, index) in titles" :key="index">
      <span @click="inshow(index)"
            :class="{active: index === isActive}">
        {{item}}
      </span>
    </div> 
  </div>
</template>

<script scoped>
export default {
  name: 'TabControl',
  props: {
    titles: {
      type: Array,
      default() {
        return []
      }
    },
    // active: {
    //   type: String,
    //   default() {
    //     return 'active'
    //   }
    // }
  },
  data() {
    return {
      isActive: 0
    }
  },
  methods: {
    inshow(index) {
      this.isActive = index
      this.$emit('tabClick', index)
    }
  }
}
</script>

<style>
  .tab-control {
    display: flex;
    text-align: center;
    line-height: 50px;
    z-index: 99;
  }

  .tab-control div {
    flex: 1;
  }

  .tab-control div span {
    padding: 5px;
  }

  .active {
    color: var(--color-high-text);
    border-bottom: 2px solid var(--color-high-text);
  }

</style>