<template>
  <Meta v-bind:pageTitle="title"></Meta>
  <div v-show="loading" class="loader">
      <div class="loader_inner">
        <p>読み込み中</p>
      </div>
    </div>
    <div  v-show="!loading" class="wrap">
      <div class="wrap-inner">
        <div class="article_inner">
          <p class="title">{{ title }}</p>
          
          
          
          <div class="cat_data">
            <div class="cat_tag">
            <div class="cat">{{ category }}</div>
            <div class="tag">{{ tag }}</div>
            </div>
            <p>{{ date }}</p>
          
          </div>
          <div class="sns-wrap">
          <div class="sns">
    <a class="twitter" :href="twitter" target="_blank" rel="noopener noreferrer">
      <i class="fa-brands fa-x-twitter"></i>
    </a>
    <a class="line" :href="line" target="_blank" rel="noopener noreferrer">
      <i class="fa-brands fa-line"></i>
    </a>
    <a class="bluesky" :href="blsk" target="_blank" rel="noopener noreferrer">
      <i class="fa-brands fa-bluesky"></i>
    </a>
    <a class="facebook" :href="facebook" target="_blank" rel="noopener noreferrer">
      <i class="fa-brands fa-facebook"></i>
    </a>
          </div>
        </div>
          
          
          <div class="content" v-html="content"></div>
          <div class="sns-wrap">
            <div class="sns_bottom">
            <p>SNSへのシェアはこちらから</p>
          <div class="sns bottom">
            <a class="twitter" :href="twitter" target="_blank" rel="noopener noreferrer">
      <i class="fa-brands fa-x-twitter"></i>
    </a>
    <a class="line" :href="line" target="_blank" rel="noopener noreferrer">
      <i class="fa-brands fa-line"></i>
    </a>
    <a class="bluesky" :href="blsk" target="_blank" rel="noopener noreferrer">
      <i class="fa-brands fa-bluesky"></i>
    </a>
    <a class="facebook" :href="facebook" target="_blank" rel="noopener noreferrer">
      <i class="fa-brands fa-facebook"></i>
    </a>
          </div>
        </div>
      </div>
      </div>
    </div>
    </div>
    </template>
  
  <script>
  import axios from 'axios'
  import Meta from './meta.vue'


  export default {
    name: 'PostComponent',

    components: {
      Meta
  },
  emits: [ 'pageTitle' ],
    data() {
      return{
        title : '',
        content : '',
        date : '',
        category:'',
        tag:'',
        link:'',
        twitter:'',
        line:'',
        blsk:'',
        facebook:'',
        loading:true
      };
    },
    created(){
      this.loading=true
    },
    mounted() {
      
      this.postContent();
      
    },
    updated(){
      this.loading = false;
    },
    methods: {
      buttonChange(){
        const tech = document.querySelector('.fa-wrench')
        const blog = document.querySelector('.fa-newspaper')

        if(this.category === '技術系') {
          if (tech.classList.contains('no-select')) {
        tech.classList.remove('no-select')
        blog.classList.add('no-select')
      } else {
        if(blog.classList.contains('no-select') === false)
        blog.classList.add('no-select')
      }
        } else if (this.category === 'ブログ') {
          if (blog.classList.contains('no-select')) {
        blog.classList.remove('no-select')
        tech.classList.add('no-select')
      } else {
        if(tech.classList.contains('no-select') === false)
        tech.classList.add('no-select')
      }
        }
      },
      postContent(){
        let ths = this;
        let forApi = this.$route.path;

        forApi = 'ここにWP REST APIのURL' + forApi.replace('/post','');

        axios
        .get(forApi)
        .then(function(response){
          console.log(response)
          let postDate = new Date(response.data.date);
          ths.title = response.data.title.rendered,
          ths.content = response.data.content.rendered,
          ths.date = postDate.getFullYear() + '-' + (postDate.getMonth() + 1) + '-' + postDate.getDate(),
          ths.tag =  response.data.tags_info[0].name,
          ths.category =response.data.categories_info[0].name,
          ths.thumb = response.data.thumbnail_url
          ths.link = 'http://localhost:8080/post' + response.data.id
          ths.twitter = 'https://x.com/intent/tweet?url=' + ths.link +'&text='+ ths.title + ' | ブログ'
          ths.line = 'https://social-plugins.line.me/lineit/share?url=' + ths.link
          ths.blsk = 'https://bsky.app/intent/compose?text='+ths.title + ' | ブログ'+ ths.link
          ths.facebook = 'http://www.facebook.com/share.php?u='+ths.link
          
          ths.buttonChange();
        })
        .catch(function(error) {
          console.log(error);
        });
  
      }
    }
  }
  </script>
  <style>
  .wrap {
    padding: 50px 0;
  }

  .wrap-inner {
    
    max-width: 600px;
    margin: auto;
    background-color: rgb(255, 255, 255);
    

  }

  .article_inner {
    margin: 0 25px;
    
  }

  .title {
    margin: 10px 0;
    font-size: 30px;
    font-weight: bold;
    line-height: 1.3;
  }

  .cat_tag {
    display: flex;
    gap: 10px;
  }

  .thumb {
    max-width: 600px;
 

  }


  .cat_data {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  .cat_data p {
    font-weight: bold;
    font-size: 16px;
    color: rgb(75, 75, 75);
  }

  .cat,.tag{
    background: black;
  color: white;
  font-weight: bold;
  font-size: 16px;
  padding: 4px 8px;
  width: 80px; /* 横幅固定 */

  text-align: center; /* 文字中央揃え */
  border-radius: 2px;
  }

  figure {
    max-width: 600px;
    margin: auto;
  }

  .content p {
    line-height: 2.5;
    margin: 15px 0;
    font-size: 18px;
  }

  .sns {
  display: flex;
  gap: 10px;
  width:fit-content;
  margin:10px 0 10px auto;
}

.sns a {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 5px;
  color: white;
  text-decoration: none;
  font-size: 20px;
}

i {
  font-family: sans-serif;
}

.twitter {
  background-color: #000000;
}

.line {
  background-color: #00c300;
}

.bluesky {
  background-color: #1185fe;
}

.facebook {
  background-color: #1877f2;
}

.bottom {
  margin: 10px auto;

}

.sns-wrap p {
  text-align: center;
  font-weight: bold;
}

.sns_bottom {
  background: #c2c2c2;
  max-width: 300px;
  margin: 15px auto;
  padding: 10px 0;
  border-radius: 10px;
}

.content h1 {
  font-size: 24px;
  padding-bottom: 3px;
  border-bottom: #343434 solid 5px;
  margin: 15px 0;
  font-weight: bold;
}

.content h2 {
  font-size: 20px;
  border-left: #343434 solid 5px;
  padding-left: 5px;
  padding-bottom: -1px;
  margin: 15px 0;
  font-weight: bold;
}

blockquote {
  max-width: 400px;
  margin: 5px auto;
    position: relative;
    padding: 8px 15px;
    box-sizing: border-box;
    font-style: italic;
    background: #efefef;
    color: #555;
}

blockquote p {
    padding: 0;
    margin: 10px 0;
    line-height: 2;
}

blockquote cite {
    display: block;
    text-align: right;
    color: #888888;
    font-size: 0.9em;
}

.content ul, ol {
  list-style: square;
  margin: auto;
  max-width: 400px;
  background: rgb(255, 255, 255);/*背景色*/
  padding: 0.5em 0.5em 0.5em 2em;/*ボックス内の余白*/
  border: solid 3px #343434;/*線の種類 太さ 色*/
}

.content ul li, ol li {
  
  margin: auto;
  line-height: 1.5; /*文の行高*/
  padding: 0.5em 0; /*前後の文との余白*/
}

.content figure {
  max-width: fit-content;
  margin: auto;
}

@media (min-width: 768px){
  .thumb {
    margin: 50px auto;
  }


  .wrap {
    padding: 100px 0 50px;
    background: #ebf0f0;
  }
  .wrap-inner {
    max-width: 800px;
    border: solid 2px black;
    border-radius: 10px;
  }
}
</style>