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
            .then( async (res) => {
                if (res.data.message === 'not_super_admin') {
                    await this.$axios.post('/signIn-ministry', user)
                        .then((res) => {
                            const token = res.data.token
                         
                            const data = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
                            // console.log('login',data);
                            this.$cookies.set('name', data.name);
                            this.$cookies.set('userId', data.id);
                            this.$cookies.set('role', data.role);
                            this.$cookies.set('profile', data.profile);
                            this.$cookies.set('title', data.title);
                            this.$cookies.set('token', token);
                            this.$cookies.set('pid', data.pid);
                            
                            if (data.role == 'ministry_admin') {
                                    this.$router.push(`/ministry/department/${data.id}`)
                            } else {
                                this.$router.push(`/rural/department/departmentType/data?id=${data.id}&pid=${data.pid}`)
                                }
                        }).catch(() => {
                            this.$toast.error('ຊື່ ແລະ ລະຫັດຜ່ານບໍ່ຖືກຕ້ອງ');
                   })
                }

                const token = res.data.token;
                
                const data = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
                this.$cookies.set('token', res?.data.token);
                commit('setLoading', false)
                
                if (data?.role == 'super_admin') {
                    this.$cookies.set("name", data.name);
                    this.$cookies.set("lastName", data.lastName);
                    this.$cookies.set("phone", data.phone);
                    this.$cookies.set("role", data.role);
                    this.$cookies.set("userId", data.id);
                    this.$cookies.set("email", data.email);
                    this.$cookies.set("profile", data.profile);
                    this.$router.push('/');  
                } 
            }).catch(() => {
                // console.log(err);
                commit('setLoading', false)
            })
    }
}