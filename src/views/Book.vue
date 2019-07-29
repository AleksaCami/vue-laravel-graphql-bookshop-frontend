<template>
  <div class="book">
    <ApolloQuery :query="require('@/graphql/queries/book.gql')" :variables="{ id: $route.params.id }">
        <template slot-scope="{ result: { data, loading }, isLoading }">
          <div v-if="isLoading">Loading...</div>
          <div v-else>
            <div>
              {{ data.book.title }}
            </div>
            <div>
              {{ data.book.author }}
            </div>
            <img :src="`http://localhost:8000/img/${data.book.image}`" alt="book cover image">
            <div>
              <router-link :to="`/books/${data.book.id}/edit`" href="#" class="link-margin">Edit</router-link>
              <!-- <router-link href="#" class="link-margin">Delete</router-link> -->
            </div>
          </div>
        </template>
      </ApolloQuery>
  </div>
</template>
