<template>
<Meta></Meta>
  <div v-show="loading" class="loader">
    <div class="loader_inner">
      <p>読み込み中</p>
    </div>
  </div>
  <div v-show="!loading" class="out">
    <article-search v-on:category-search="categorySearch"></article-search>
    <div class="article_list">
      <div
        class="article_cards"
        v-for="item in showlists"
        v-bind:key="item.link"
      >

        <div class="article_txt">
          <div class="cat_day">
            <div class="category">{{ item.tag }}</div>
            <div class="day">{{ item.date }}</div>
          </div>
          <div class="title">
            <router-link v-bind:to="item.link">
              <h1>{{ item.title }}</h1>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <paginate
      :page-count="pageCount"
      :click-handler="clickCallback"
      :page-range="pageRange"
      :prev-text="'<'"
      :next-text="'>'"
      :force-page="pagenateNumber"
    ></paginate>
  </div>
</template>

<script>
import ArticleSearch from "../components/ArticleSearch.vue";
import Paginate from "vuejs-paginate-next";
import Meta from '../components/meta.vue'
import axios from 'axios'


export default {
  name: "articleList",
  components: { ArticleSearch, Paginate,Meta },
  inject: ["blog"],
  data() {
    return {
      pageCount: 1,
      //表示しているものを格納している配列
      showlists: [],
      //絞り込み条件に応じた物が全て格納されている配列
      baselists: [],
      //postGet関数を用いて取得した記事が全て格納されている配列
      lists: [],
      pageRange: 4,
      //ページネーションのボタンの番号なのでもっといい名前にする
      pagenateNumber: 1,
      loading:true
    };
  },
  methods: {
    //ヘッダー上のボタンを選択の有無に応じて色を変更する関数
    buttonChange(){
      const tech = document.querySelector('.fa-wrench')
      const blog = document.querySelector('.fa-newspaper')
      if (blog.classList.contains('no-select')) {
        blog.classList.remove('no-select')
        tech.classList.add('no-select')
      } else {
        if(tech.classList.contains('no-select') === false)
        tech.classList.add('no-select')
      }
    },
    clickCallback(pageNumber) {
      this.pagenateNumber = pageNumber;
      this.showlists = this.baselists.slice(
        this.pageRange * (pageNumber - 1),
        this.pageRange * pageNumber
      );
    },
    //カテゴリで絞り込みした際に起動する関数
    categorySearch(e) {
      if (e === "") {
        //絞り込みの際、選択したものがなかった場合全カテゴリ表示の1ページ目に戻るようにする
        this.baselists = this.lists;
        this.pageCount = Math.ceil(this.baselists.length / this.pageRange);
        this.showlists = this.baselists.slice(0, 4);
        this.pagenateNumber = 1;
      } else {
        this.baselists = [];
        for (let i = 0; i < this.lists.length; i++) {
          if (e === this.lists[i].tag) {
            this.baselists.push(this.lists[i]);
          }
        }
        this.pageCount = Math.ceil(this.baselists.length / this.pageRange);
        this.showlists = this.baselists.slice(0, 4);
        this.pagenateNumber = 1;
      }
    
    },
    //postGetとかに変えた方がいい
    postGet(){
      let ths = this;
      const techArray = []
      const blogArray = []
    axios
    .get('ここにWP REST APIのURL')
    .then(function(response){
      console.log(response)
      for(let i = 0; i < response.data.length; i++) {
        if(response.data[i].categories_info[0].name === "技術系"){
          let dates = new Date(response.data[i].date)
          techArray.push(
            { 
              
              category: response.data[i].categories_info[0].name,
              title: response.data[i].title.rendered,
              date: dates.getFullYear() + '-' + (dates.getMonth() + 1) + '-' + dates.getDate(),
              thumb: response.data[i].thumbnail_url,
              tag:  response.data[i].tags_info[0].name,
              link : '/post' + response.data[i].id,
            }
            
          )


      } else if(response.data[i].categories_info[0].name === "ブログ"){
        let dates = new Date(response.data[i].date)
        blogArray.push(
          { 
            
            category: response.data[i].categories_info[0].name,
            title: response.data[i].title.rendered,
            date: dates.getFullYear() + '-' + (dates.getMonth() + 1) + '-' + dates.getDate(),
            thumb: response.data[i].thumbnail_url,
            tag:  response.data[i].tags_info[0].name,
            link : '/post' + response.data[i].id,
          }
          
        )


    } else {
          console.log("skip")
        }
      }
      ths.$emit('postTo',techArray,blogArray)
      ths.lists = blogArray
 
      ths.listin()
    })
    .catch(function(error) {
      console.log(error);
    });
    },
    //injectもしくはpostGetで取得したものを実際に表示する用の配列に格納していく
    listin(){
           this.baselists = this.lists
           this.showlists = this.baselists.slice(0,this.pageRange)
           this.pageCount = Math.ceil(this.baselists.length/this.pageRange);
    }
  },
  created(){
    this.loading=true
  },
mounted() {
  //injectされた値の有無に応じて処理を分ける。
  if(this.blog.length===0){
    this.postGet()
    
  } else {
    this.lists = this.blog
    this.listin();
  }
  
  
  this.buttonChange();
    }
    ,updated(){
      this.loading = false;
    }
};
</script>

<style>
.loader {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.out {
  padding: 50px 0;
  min-height: calc(100vh);
  background: #ebf0f0;
}

.article_list {
  display: grid;
  grid-template-columns: 1fr; /* 子要素を縦並び */
  gap: 0; /* 隙間なし */
  max-width: 800px;
  margin: 0 auto; /* 中央寄せ */
}

.article_cards {
  display: flex;
  align-items: flex-start;
  padding: 16px;
  position: relative;
}

.article_cards::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  border-bottom: 2px dashed #ccc; /* 破線の区切り */
}



.article_txt {
  flex: 1;
  display: flex;
  flex-direction: column;
  /* 上揃え */
  padding-left: 16px;
}

.cat_day {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
}

.category {
  background: black;
  color: white;
  font-weight: bold;
  font-size: 12px;
  padding: 4px 8px;
  width: 60px; /* 横幅固定 */
  text-align: center; /* 文字中央揃え */
  border-radius: 5%;
}

.day {
  color: #888;
  font-weight: bold;
}

.title {
  margin-top: 8px;
}

.title h1 {
  font-size: 14px;
  margin: 0;
}


/* タブレットのレスポンシブ対応 */
@media (min-width: 768px) {
  .article_list {
    max-width: 900px;
    grid-template-columns: repeat(3, 1fr); /* 横に3列 */
  }


  .article_txt {
    padding-left: 0;
  }

  .article_cards {
    flex-direction: column;
  }

  .cat_day {
    margin-top: 10px;
  }

  .title h1 {
    font-size: 18px;
    margin: 0;
  }
}

/* PCのレスポンシブ対応 */
@media (min-width: 1024px) {
  .article_list {
    max-width: 1200px;
    grid-template-columns: repeat(4, 1fr); /* 横に4列 */
  }
}

.pagination {
  display: flex;
  justify-content: center; /* 中央に配置 */
  align-items: center;
  margin: 20px 0;
  padding: 0;
}

.pagination button,
.pagination a {
  border: 2px solid #313131;
  background-color: white;
  padding: 8px 16px;
  margin: 0 5px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s, color 0.3s;
  width: 40px;
}

.pagination .active a {
  background-color: rgba(205, 205, 205, 0.2);
  border: 2px solid #3131311b;
  color: rgba(0, 0, 0, 0.2);
}

.pagination .disabled {
  color: #ccc;
  cursor: not-allowed;
  border-color: #ddd;
}

.pagination .prev,
.pagination .next {
  font-weight: bold;
}

.pagination .prev:hover,
.pagination .next:hover {
  background-color: #f0f0f0;
}

li {
  list-style: none;
}
</style>