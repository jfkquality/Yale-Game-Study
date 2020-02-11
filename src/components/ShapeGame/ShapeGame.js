import { mapState } from 'vuex';
import Instruction from './Instruction/Instruction.vue';
import Game from './Game/Game.vue';

export default {
  name: 'ShapeGame',
  data() {
    return {
      readInstructions: false,
    };
  },
  components: {
    'instruction': Instruction,
    'game': Game,
  },
  computed: {
    ...mapState('shapes', {
      scoreChart: state => state.scoreChart,
    }),
  },
};
