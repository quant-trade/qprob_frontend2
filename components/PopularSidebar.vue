<template>
<div class="tr-section tr-widget">
    <div class="widget-title">
        <span>Popular this month</span>
    </div>
    <ul class="medium-post-list">
        <li class="tr-post" v-for="post in posts">
			    <div class="post-content">
			      <div class="catagory">
				      <a :href="baseUrl+'source/'+post.category_id.Slug+'/'">{{ post.category_id.Title }} [{{ post.hits }}]</a>
				    </div>
			      <h2 class="entry-title">
				      <a :href="baseUrl+post.slug+'/'">{{ post.title }}</a>
				    </h2>
			    </div>
		    </li>
        <li class="tr-post">
			    <div class="post-content">
			      <div class="catagory">
				      More...
				    </div>
			      <h2 class="entry-title">
				      <a :href="baseUrl + keyword + '/popular/'">All popular posts</a>
				    </h2>
			    </div>
		    </li>
        <li class="tr-post">
        <!-- <calendar-component></calendar-component> -->
        <a href="appUrl"><img :src="imgBaseUrl + 'uploads/screenshots/' + siteFolder + '.png'" alt="Get our app"></a>
        </li>
	  </ul>
</div>
</template>

<script>
import axios from 'axios'
// import Calendar from './Calendar.vue'

export default {
  name: 'popularComp',
  data () {
    return {
      posts: this.posts,
      baseUrl: process.env.BASE_URL,
      imgBaseUrl: process.env.IMG_URL,
      keyword: process.env.KEYWORD,
      siteFolder: process.env.SITE_FOLDER,
      appUrl: 'https://play.google.com/store/apps/details?id=talaikis.qprob.' + process.env.SITE_FOLDER
    }
  },
  methods: {
    fetchPosts () {
      axios.get('/most_popular/0/').then(response => {
        this.posts = response.data
      }).catch(e => {
        console.log(e)
      })
    }
  },
  components: {
    // 'calendar-component': Calendar
  },
  mounted () {
    this.fetchPosts()
  }
}
</script>

<style></style>