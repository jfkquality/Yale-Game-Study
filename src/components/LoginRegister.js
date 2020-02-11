import { mapState, mapActions, mapMutations, mapGetters } from 'vuex';

export default {
  name: 'LoginRegister',
  data() {
    return {
      register: false,
      username: '',
      password: '',
      confPass: '',
      group: '',
    };
  },
  methods: {
    ...mapActions({
      sendLogin: 'login',
      sendRegister: 'register',
      logout: 'logout',
    }),
    checkRegister() {
      if (this.username && (this.password === this.confPass)) {
        console.log(this.password);
        this.sendRegister({ email: `${this.username}@yale.test`, password: this.password, group: this.group });
      }
    },
  },
};
