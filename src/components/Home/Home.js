import { mapState, mapActions, mapMutations, mapGetters } from 'vuex';

export default {
  name: 'Home',
  data() {
    return {
      msg: 'Welcome to CogTrain!',
    };
  },
  computed: {
    ...mapGetters({
      group: 'info',
      user: 'id',
    }),
  },
  methods: {
    ...mapActions({
      logout: 'logout',
    }),
  },
};
