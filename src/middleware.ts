import { chain, authMiddleware } from "./common/middleware";
import { refreshTokenMiddleware } from "./common/middleware/refresh-token-middleware";

export default chain([refreshTokenMiddleware, authMiddleware]);
