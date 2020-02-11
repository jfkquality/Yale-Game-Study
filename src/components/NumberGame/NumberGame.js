import { mapState } from 'vuex';
import Instruction from './Instruction/Instruction.vue';
import Game from './Game/Game.vue';

export default {
  name: 'NumberGame',
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
    ...mapState('numbers', {
      scoreChart: state => state.scoreChart,
    }),
  },
};
