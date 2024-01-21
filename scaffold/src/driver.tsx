import './opal.rb';
import { OpalDriver } from 'gamefic-driver';

// @ts-ignore
const driver = new OpalDriver(Opal, 'GAMEFIC_PLOT_CLASS');
export default driver;
