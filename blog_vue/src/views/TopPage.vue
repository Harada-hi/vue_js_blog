<template>
  <div v-show="loading" class="loader">
    <div class="loader_inner">
      <p>読み込み中</p>
    </div>
  </div>
  <div v-show="!loading" class="top_wrap">
  
    <div class="top_inner">

      <div class="content_flex">
        <div class="contents tech">
          <div class="head">New Tech</div>
          <div class="contents_inner">
            <div class="contents_thumb">
              <router-link v-bind:to="techTop.link">
              <img :src="techTop.thumb">
              </router-link>
            </div>
            <div class="contents_tag">
              <p>{{ techTop.tag }}</p>
            </div>
            <div class="contents_title">
              <router-link v-bind:to="techTop.link">
              <p>{{ techTop.title }}</p>
            </router-link>
            </div>
          </div>
          <div class="contents_link">
            <router-link to="/tech">
              <p>ほかの記事を読む</p>
            </router-link>
          </div>
        </div>
  
        <div class="contents blog">
          <div class="head">New Blog</div>
          <div class="contents_inner">
            <div class="contents_thumb">
              <router-link v-bind:to="blogTop.link">
              <img :src="blogTop.thumb">
            </router-link>
            </div>
            <div class="contents_tag">
              <p>{{ blogTop.tag }}</p>
            </div>
            <div class="contents_title">
              <router-link v-bind:to="blogTop.link">
              <p>{{ blogTop.title }}</p>
            </router-link>
            </div>
          </div>
          <div class="contents_link">
            <router-link to="/blog">
              <p>ほかの記事を読む</p>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    
  </div>
  </template>
  
  <script>
  import axios from 'axios'

  
  
  export default {
    name: 'TopPage',
    inject:['tech','blog'],
    emits:['postTo'],
    data(){
      return {
        techTop:[],
        blogTop:[],
        loading:true
      }
    },
    methods: {
      buttonChange(){
        const tech = document.querySelector('.fa-radio')
        const blog = document.querySelector('.fa-newspaper')
       
        if(tech.classList.contains('no-select') === false){
          tech.classList.add('no-select')
        }
  
        if(blog.classList.contains('no-select') === false) {
          blog.classList.add('no-select')
        }
      },
      postGet(){
        
        let ths = this;
        axios
      .get('https://pinky-hanger.com/wp/wp-json/wp/v2/posts/')
      .then(function(response){

        for(let i = 0; i < response.data.length; i++) {
          if(response.data[i].categories_info[0].name === "動画"){
            let dates = new Date(response.data[i].date)
            ths.techTop.push(
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
          ths.blogTop.push(
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
        ths.$emit('postTo',ths.techTop,ths.blogTop)
        ths.techTop = ths.techTop[0]
        ths.blogTop = ths.blogTop[0]
      })
      .catch(function(error) {
        console.log(error);
      });
      }
    },
    created(){
    this.loading=true
  },
    mounted(){
      if (this.tech.length === 0) {
 
        this.postGet()
      } else {


        this.techTop = this.tech[0]
        this.blogTop = this.blog[0]

      }

      this.buttonChange()
    },
    updated(){
      this.loading = false;
    }
    }
  
  </script>
  
  <style>
.loader {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

  .top_wrap {
    padding: 50px 0 ;
  min-height: calc(100vh);
  background: #ebf0f0;
  }

  .top_inner {
    max-width: 1200px;
    margin: 20px auto;
    
  }

  .top_img {
    width: 300px;
    margin: auto;
    
  }

  .top_img img {
    display: block;
    position: relative;
  }

  .top_img p {

text-align: center;
margin: 20px 0 40px;
font-size: 20px;
  }



  .head {
    text-align: center;
    font-weight: bold;
    font-size: 24px;
  }

  .contents_inner {
    margin: 20px 10px 0;
  }
.contents {
  max-width: 400px;
  margin: auto;
  

}

.tech {
  margin-bottom: 20px;
}
 

.contents_thumb {
  max-width: 250px;
  margin: auto;
}

.contents_title {
  font-size: 18px;
  font-weight: bold;
}

  .contents_tag {
  background: black;
  color: white;
  font-weight: bold;
  font-size: 12px;
  padding: 4px 8px;
  width: 60px; /* 横幅固定 */
  text-align: center; /* 文字中央揃え */
  border-radius: 5%;
  margin: 10px 0;
  }

  .contents_link {
    width: 200px;
    margin: 20px auto;
    background: black;
    color: white;
    font-weight: bold;
    font-size: 14px;
    text-align: center;
    border-radius: 10px;
    padding: 10px 0;
  }
  
  .fa-radio {
    color: black;
  }
  
  .fa-newspaper {
    color: black;
  }
  
  .no-select {
    
    color: #818181;
  }

  @media (min-width: 768px) {

  .contents {
 
    border-radius: 3px;
  box-shadow: 0px 5px 15px 0px rgba(0, 0, 0, 0.35);
    background: rgba(0, 0, 0, 0.05);
  }
.tech {
  margin: auto;
}

.head {
  margin: 20px 0;
}

.content_flex {

  display: flex;

}

    .contents_inner {
      margin: 20px 20px 0;
    width: 350px;
    height: 280px;
    margin: auto;
    padding: 0 10px;

    

  }


.contents_thumb {
  max-width: 300px;
}
  }
  </style>