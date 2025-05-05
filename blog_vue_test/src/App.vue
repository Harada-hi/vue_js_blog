<template>
  <Header></Header>
  <router-view v-on:post-to="postCatch"/>


</template>

<script>


import Header from './components/Header.vue';

import { computed } from 'vue';




export default {
    name:'app',
    components:{


      Header

    },
  data(){
    return {
      tech: [],
      blog: [],
      loading:true
    }
  },
  provide(){
    return {
      tech: computed(()=>this.tech),
      blog: computed(()=>this.blog)

    }
  },
  methods: {
    postCatch(catchtech,catchBlog){
      console.log(catchtech.length)
      console.log(catchBlog.length)
      this.tech=catchtech
      this.blog=catchBlog
    }
  }
    

}
</script>

<style>
@import "./css/destyle.css";
#app {
  background-color: rgb(255, 255, 255);
}

</style>
