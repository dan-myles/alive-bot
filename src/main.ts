import Logger from "./logger";
import { Init } from './init';

const logger = new Logger();
const core = new Init();

logger.initLog();
core.startApplication();