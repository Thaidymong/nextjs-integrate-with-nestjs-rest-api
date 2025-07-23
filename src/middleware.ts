import {
  chain,
  authMiddleware,
} from './common/middleware';

export default chain([authMiddleware]);
