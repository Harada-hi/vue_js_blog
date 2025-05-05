<template>
<div class="header">
    <div class="header-inner">
    <router-link to="/">
      <img class="headImg" src="../utiles/hung.png">
    </router-link>
    <nav>
    <router-link to="/tech">
      <div class="link">
        <i class="fa-solid fa-wrench"></i>
      </div>
    </router-link>
    <router-link to="/blog">
      <div class="link">
        <i class="fa-solid fa-newspaper"></i>
      </div>
      </router-link>
  </nav>
    </div>
</div>
</template>

<script>
export default{
    name:'Header'
}
</script>

<style>
    .header {
        background-color: rgb(255, 255, 255);
  height: 50px;
  position: fixed;
  z-index: 10;
  width: 100%;
  padding: 0 8px;
  border-bottom: 2px solid #4d4c4c;
    }

    .header-inner {
        max-width: 1200px;
        margin: 5px auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .header-inner a {
        display: block;

    }

    .headImg {
      height: 40px;
    }

    nav {
  display: flex;
  gap: 15px;
  justify-content: center;
  margin: 5px 0;
}

.link {
  display: block;
  font-weight: bold;
  text-align: center;
}

i {
  font-size: 24px;
}

</style>