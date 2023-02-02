import Wattpad from "../src/classes/Wattpad.ts";
import storyTest from "./story.ts";
import chaptersTest from "./chapter.ts";
import searchTest from "./search.ts";
import userTest from "./user.ts";

const wattpad = new Wattpad();

storyTest(wattpad);
chaptersTest(wattpad);
searchTest(wattpad);
userTest(wattpad);
