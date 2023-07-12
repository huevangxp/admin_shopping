export const state = () => ({
    loading: false,
})

export const mutations = {
    setLoading(state, data) {
        state.loading = data;
    }
}

export const actions = {
    async isLogin({ commit }, user) {
        commit('setLoading', true);
        await this.$axios.post('/login', user)
            .then((res) => {    
                const token = res.data;
                const data = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
                this.$cookies.set("name", data.name);
                this.$cookies.set("lastName", data.lastName);
                this.$cookies.set("phone", data.phone);
                this.$cookies.set("role", data.role);
                this.$cookies.set("userId", data.id);
                this.$cookies.set("email", data.email);
                this.$cookies.set("profile", data.profile);
                this.$cookies.set('token', res?.data);
                commit('setLoading', false)
                
                if (data?.role == 'super_admin') {
                    this.$router.push('/');  
                } else {
                    this.$router.push('/ministry'); 
                }

            }).catch((err) => {
                console.log(err);
                commit('setLoading', false)
            })
    }
}