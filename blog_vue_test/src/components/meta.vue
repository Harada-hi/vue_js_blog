<template>
    <div></div>
  </template>
  
  <script>
  export default {
    name: 'MetaComponent',
    props: [ 'pageTitle' ],
    mounted() {
      this.setMeta();
    },
    watch: { 
      '$route' () {
        this.setMeta();
      },
      'pageTitle' (){
        this.setMeta();
      }
    },
    methods : {
      setMeta(){
      let route = this.$route;
        if(this.pageTitle){
          let metaTitle = this.pageTitle;
          document.title = metaTitle +  " | ピンク色のハンガー";
        }else {
          let metaTitle = route.meta.title;
          document.title = metaTitle;
        }
      }
    }
  }
  </script>