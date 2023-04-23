import { Environment } from 'vitest';

export default <Environment>{
  name: 'prisma',
  setup: async () => {
    console.log('hello from environment.');

    return {
      teardown: async () => {
        console.log('goodbye from environment.');
      },
    };
  },
};
