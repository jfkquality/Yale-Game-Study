import { mapState } from 'vuex';
import Instruction from './Instruction/Instruction';
import Game from './Game/Game.vue';

export default {
  name: 'LotteryGame',
  data() {
    return {
      readInstructions: false,
    };
  },
  components: {
    instruction: Instruction,
    game: Game,
  },
  computed: {
    ...mapState('lottery', {
      scoreChart: state => state.scoreChart,
    }),
  },
};
