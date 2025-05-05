<template>

    <div class="search">
        <div class="search-inner">
        <form>
            <span>カテゴリ：</span><select v-on:change="selectChange" v-model="selected">
    <option value="">全て</option>
    <option value="js">js</option>
    <option value="css">css</option>
    <option value="html">html</option>
    <option value="その他">その他</option>
  </select>
</form>
        </div>
    </div>
</template>

<script>
export default {
name: 'artcilesearch',
data(){
    return {
        selected:""
    }
},
emits:['categorySearch'],
methods:{
    selectChange(){
        this.$emit('categorySearch',this.selected)
    }
}
}
</script>

<style>
 select {
    border: none;
    background-color: rgb(231, 231, 231)

 }

 form {
    background-color: rgb(231, 231, 231);
    font-family: sans-serif;
 }

 .search {
    margin: auto;
    max-width: 1200px;
    display: flex;
    justify-content: flex-end;

 }

 .search-inner {
    width: 160px;
 }
</style>