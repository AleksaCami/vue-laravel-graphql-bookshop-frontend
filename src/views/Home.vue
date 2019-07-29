<template>
  <div class="home">
    <ApolloQuery :query="categoriesQuery">
      <template slot-scope="{ result: { data, loading }, isLoading }">
        <div v-if="isLoading">Loading...</div>
        <div v-else>
          <a href="#" class="link-margin" @click.prevent="selectCategory('all')">All</a>
          <a href="#" class="link-margin" @click.prevent="selectCategory('featured')">Featured</a>
          <a href="#" v-for="category of data.categories" :key="category.id" class="user link-margin"
          @click.prevent="selectCategory(category.id)"
          >
            {{ category.id }}. {{ category.name }}
          </a>
        </div>
      </template>
    </ApolloQuery>

    <div v-if="selectedCategory === 'all'">
      <ApolloQuery :query="query">
        <template slot-scope="{ result: { data, loading }, isLoading }">
          <div v-if="isLoading">Loading...</div>
          <div v-else>
            <div v-for="book of data.books" :key="book.id" class="user link-margin">
              {{ book.id }}. {{ book.title }} / {{ book.author }}
            </div>
          </div>
        </template>
      </ApolloQuery>
    </div>

    <div v-else-if="selectedCategory === 'featured'">
      <ApolloQuery :query="query" :variables="{ featured: true }">
        <template slot-scope="{ result: { data, loading }, isLoading }">
          <div v-if="isLoading">Loading...</div>
          <div v-else>
            <div v-for="book of data.booksByFeatured" :key="book.id">
              {{ book.id }}. {{ book.title }}
            </div>
          </div>
        </template>
      </ApolloQuery>
    </div>

    <div v-else>
      <ApolloQuery :query="query" :variables="{id: selectedCategory}">
        <template slot-scope="{ result: { data, loading }, isLoading }">
          <div v-if="isLoading">Loading...</div>
          <div v-else>
            <div v-for="book of data.category.books" :key="book.id" class="user link-margin">
              {{ book.id }}. {{ book.title }}
            </div>
          </div>
        </template>
      </ApolloQuery>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src
// import gql from 'graphql-tag'
import categoryQuery from '@/graphql/queries/category.gql'
import booksQuery from '@/graphql/queries/books.gql'
import categoriesQuery from '@/graphql/queries/categories.gql'
import booksFeaturedQuery from '@/graphql/queries/booksFeatured.gql'


export default {
  name: 'home',
  components: {

  },
  data() {
    return {
      categoryQuery,
      categoriesQuery,
      booksFeaturedQuery,
      booksQuery,
      categories: [],
      selectedCategory: 'all',
      query: booksQuery
    }
  },
  // apollo: {
  //   categories: gql`{
  //     categories {
  //       id
  //       name
  //     }
  //   }`,
  // },
  methods: {
    selectCategory(category) {
      if(category === 'all') {
        this.query = booksQuery
      } else if(category === 'featured') {
        this.query = booksFeaturedQuery
      } else {
        this.query = categoryQuery
      }
      this.selectedCategory = category
    }
  }
}
</script>

<style scoped>

.link-margin {
  margin-right: 24px;
}

</style>

