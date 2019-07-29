<template>
    <div class="create">
        <h1>Add new book</h1>
        <form action="#" method="POST" @submit.prevent="addBook">
            <div class="form-group">
                <label for="title">Title</label>
                <input type="text" name="title" id="title" v-model="title">
            </div>
            <div class="form-group">
                <label for="author">Author</label>
                <input type="text" name="author" id="author" v-model="author">
            </div>
            <div class="form-group">
                <label for="image">Image</label>
                <input type="text" name="image" id="image" v-model="image">
            </div>
            <div class="form-group">
                <label for="description">Description</label>
                <textarea cols="30" rows="10" type="text" name="description" id="description" v-model="description"></textarea>
            </div>
            <div class="form-group">
                <label for="link">Link</label>
                <input type="text" name="link" id="link" v-model="link">
            </div>
            <div class="form-group">
                <label for="featured"><input type="checkbox" name="featured" id="author" v-model="featured">Featured</label>
            </div>
            <div class="form-group">
               <ApolloQuery :query="require('@/graphql/queries/categories.gql')">
                <template slot-scope="{ result: { data, loading }, isLoading }">
                    <div v-if="isLoading">Loading...</div>
                    <select v-else v-model="category">
                        <option v-for="category of data.categories" :key="category.id" class="user link-margin"
                        :value="category.id"
                        >
                            {{ category.id }}. {{ category.name }}
                        </option>
                    </select>
                </template>
            </ApolloQuery>
            </div>
            <div class="form-group">
                <button type="submit">Add book</button>
            </div>

        </form>
    </div>
</template>

<script>
import addBook from '@/graphql/mutations/addBook.gql'

export default {
    data() {
        return {
            title: '',
            author: '',
            image: '',
            description: '',
            link: '',
            featured: false,
            category: 1
        }
    },
    methods: {
        addBook() {

        this.$apollo.mutate({
                // Query
                mutation: addBook,
                // Parameters
                variables: {
                    title: this.title,
                    author: this.author,
                    image: this.image,
                    link: this.link,
                    description: this.description,
                    featured: this.featured,
                    category_id: this.category
                }

            }).then((data) => {
                // Result
                console.log(data)
                this.$router.push('/')
            }).catch((error) => {
                // Error
                console.error(error)
            })
        }
    }
}
</script>


<style scoped>
.form-group {
    margin-bottom: 32px;
}

input[type="text"] {
    padding: 10px 14px;
}

button {
    padding: 16px;
    background: #027bff;
    color: white;
    border-radius: 5px;
    font-size: 16px;
}
</style>

