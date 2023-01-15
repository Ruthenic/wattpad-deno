import Wattpad from "../src/classes/Wattpad.ts";
import workTest from "./story.ts";
import chaptersTest from "./chapter.ts";
import searchTest from "./search.ts";

const wattpad = new Wattpad();

workTest(wattpad);
chaptersTest(wattpad);
searchTest(wattpad);
