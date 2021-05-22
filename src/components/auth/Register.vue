
<template>
    <div class="login-form">
        <h2 class="login-heading">Register</h2>

        <form action="#" @submit.prevent="register">

            <div v-if="serverErrors" class="server-error">
                <div v-for="(value, key) in serverErrors" :key="key">
                    {{ value[0] }}
                </div>
            </div>

            <validation-provider rules="required" v-slot="{ errors }">
                <div class="form-control">
                    <label for="name">Name</label>
                    <input type="text" name="name" id="name" class="login-input" :class="{ 'input-error' : errors[0] }" v-model="name">
                    <span class="form-error">{{ errors[0] }}</span>
                </div>
            </validation-provider>

            <validation-provider rules="required|email" v-slot="{ errors }">
                <div class="form-control">
                    <label for="email">Email</label>
                    <input type="text" name="email" id="email" class="login-input" :class="{ 'input-error' : errors[0] }" v-model="email">
                    <span class="form-error">{{ errors[0] }}</span>
                </div>
            </validation-provider>

            <validation-provider rules="required|min:6" v-slot="{ errors }">
                <div class="form-control mb-more">
                    <label for="password">Password</label>
                    <input type="password" name="password" id="password" class="login-input" :class="{ 'input-error' : errors[0] }" v-model="password">
                    <span class="form-error">{{ errors[0] }}</span>
                </div>
            </validation-provider>

            <div class="form-control">
                <button type="submit" class="btn-submit">Create Account</button>
            </div>

        </form>
    </div>
</template>

<script>
import { ValidationProvider} from 'vee-validate'

export default {
    components: {
        ValidationProvider
    },

    data() {
        return {
            name: '',
            email: '',
            password: '',
            serverErrors: ''
        }
    },

    methods: {
        register() {
            this.$store.dispatch('register', {
                name: this.name,
                email: this.email,
                password: this.password
            })
                .then(response => {
                    this.$router.push({ name: 'login' });
                })
                .catch(error => {
                    this.serverErrors = Object.values(error.response.data.errors);
                });
        }
    }
}
</script>
