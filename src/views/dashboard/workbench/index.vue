<template>
  <div class="workplace">
    <top-box />
    <div class="work-center">
      <b-row :gutter="16">
        <b-col span="14">
          <project-box />
          <div class="banner">
            <img src="@/assets/images/bg/work.png" alt="work">
          </div>
        </b-col>
        <b-col span="10">
          <quick-link />
          <todos />
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import TopBox from './top-box.vue'
import ProjectBox from './project-box.vue'
import QuickLink from './quick-link.vue'
import Todos from './todos.vue'

export default {
  name: 'Workbench',
  components: { Todos, QuickLink, TopBox, ProjectBox },
}
</script>

<style lang="stylus" scoped>
.work-center {
  margin: 16px;
  .banner {
    padding: 16px;
    margin: 16px 0;
    background: #fff;
    text-align: center;
    img {
      height: 260px;
    }
  }
}
</style>
