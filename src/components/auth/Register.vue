
<template>
    <div class="login-form">
        <h2 class="login-heading">Register</h2>
        <validation-observer v-slot="{ invalid }">
            <form action="#" @submit.prevent="validate(invalid)">

                <!-- <div v-if="successMessage" class="success-message">
                    {{ successMessage }}
                </div> -->

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
        </validation-observer>
    </div>
</template>

<script>
import { ValidationProvider} from 'vee-validate'
import { ValidationObserver} from 'vee-validate'

export default {
    components: {
        ValidationProvider,
        ValidationObserver
    },

    data() {
        return {
            name: '',
            email: '',
            password: '',
            serverErrors: '',
            successMessage: ''
        }
    },

    methods: {
        validate(invalid) {
            if(!invalid) {
                this.register();
            }
        },

        register() {
            this.$store.dispatch('register', {
                name: this.name,
                email: this.email,
                password: this.password
            })
                .then(response => {
                    this.successMessage = 'Registered successfully!';
                    this.$router.push({
                        name: 'login',
                        params: {
                            dataSuccessMessage: this.successMessage
                        }
                    });

                    this.$toast.success({
                        title: this.successMessage,
                        message:'You can log in here'
                    });
                })
                .catch(error => {
                    this.serverErrors = Object.values(error.response.data.errors);
                });
        }
    }
}
</script>
