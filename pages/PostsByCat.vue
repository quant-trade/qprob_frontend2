<template>
<div>
    <div class="col-sm-9">
      <div class="row">
        <div class="col-sm-8">
          <div class="tr-content">
            <ad-component></ad-component>
          <div class="tr-section bg-transparent">
            <h1>{{ posts[0].category_id.Title | capFirst }}<span v-if="page > 0">, page {{ page }}</span></h1>
            <div class="row" v-for="chunk in chunkPosts">
              <div class="col-md-6 medium-post" v-for="post in chunk">
                <div class="tr-post">
                  <div class="entry-header">
                    <div class="entry-thumbnail" v-if="post.image">
                      <a :href="baseUrl+post.slug+'/'">
                      <img class="img-responsive" :src="imgBaseUrl+post.image" :alt="post.title"></a>
                    </div>
                  </div>
                  <div class="post-content">
                    <div v-bind:class="[(post.image) ? 'crop' : 'crop-no-img']">
                          <a :href="baseUrl+'source/'+post.category_id.Slug+'/'" v-if="post.category_id.Thumbnail">
                          <img class="img-responsive circle-img" :src="imgBaseUrl+post.category_id.Thumbnail" :alt="post.category_id.Title"></a>
                        </div>
                        <div class="entry-meta">
                          <ul>
                            <li>Source: <a :href="baseUrl+'source/'+post.category_id.Slug+'/'">{{ post.category_id.Title }}</a></li>
                            <li>{{ post.date | formatDate }}</li>
                          </ul>
                        </div>
                        <h2 class="entry-title">
                        <a :href="baseUrl+post.slug+'/'">{{ post.title }}</a>&nbsp;
                        <div v-bind:class="[(post.sentiment >= 0) ? 'sentiment-pos' : 'sentiment-neg']" v-if="post.sentiment">[{{ post.sentiment }}]</div></h2>
                        <p v-if="post.summary">{{ post.summary }}</p>
                  </div>
                </div>
              </div>
            </div>
            <paginator-component v-once :pages="calcPages" :source="type" :value="category" :active="page"></paginator-component>            
          </div>
        </div>
      </div>

      <div class="col-sm-4 tr-sidebar">
        <div>
          <ad-component></ad-component>
          <div class="tr-section tr-widget tr-ad ad-before">
            <popular-posts></popular-posts>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import chunk from '../plugins/chunk'

import Paginator from '../components/Paginator.vue'
import Popular from '../components/PopularSidebar.vue'
import Ads from '../components/Ads.vue'

import axios from 'axios'

export default {
  data () {
    return {
      posts: [],
      baseUrl: process.env.BASE_URL,
      imgBaseUrl: process.env.IMG_URL,
      title: process.env.SITE_NAME,
      category: null,
      page: null,
      type: 1
    }
  },
  asyncData ({ req, params, error }) {
    return axios.get('/cat/' + params.catSlug + '/' + (Number(params.page) || '0') + '/')
      .then((response) => {
        return { posts: response.data, category: params.catSlug, page: Number(params.page) || 0 }
      })
      .catch((e) => {
        error({ statusCode: 500, message: e })
      })
  },
  components: {
    'popular-posts': Popular,
    'paginator-component': Paginator,
    'ad-component': Ads
  },
  computed: {
    chunkPosts () {
      return chunk(this.posts, 2)
    },
    calcPages () {
      const pages = Math.floor(this.posts[0].total_posts / 20)
      return pages <= 250 ? pages : 250
    }
  },
  head () {
    return {
      title: Number(this.$route.params.page) ? 'Page ' + Number(this.$route.params.page) + ' ' + this.$route.params.catSlug + ' | ' + this.title : this.title
    }
  }
}
</script>

<style>
</style>
