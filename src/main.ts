import Logger from "./Logger";
import Initialize from "./Initialize";

const logger = new Logger();
const core = new Initialize();

logger.initLog();
core.startApplication();