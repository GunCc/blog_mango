<template>
  <div class="home">
    <el-button>123</el-button>
    <button @click="addCount">count is: {{ count }}</button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "../store/index";
export default defineComponent({
  name: "Home",
  components: {},
  setup() {
    
    const store = useStore();
    console.log(store)
    const count: any = computed({
      get() {
        return store.state.count;
      },
      set(value) {
        store.commit("increment", value);
      },
    });

    function addCount() {
      count.value += 1;
    }

    return {
      count,
      addCount,
    };
  },
});
</script>
