import Wattpad from "../mod.ts";
import {
    assert,
    AssertionError,
} from "https://deno.land/std@0.167.0/testing/asserts.ts";

export default function test(watt: Wattpad) {
    Deno.test("chapters", async (test) => {
        const work = watt.getStory("327425279");
        await work.init();

        await test.step("initialization", async () => {
            assert(
                work.chapters.length > 0,
                "chapters array is not initialized",
            );

            try {
                await work.chapters[0].init();
                await work.chapters[3].init();
            } catch {
                throw new AssertionError("failed to initialize chapters");
            }
        });

        await test.step("IDs", () => {
            assert(
                work.chapters[0].id === "1288785987",
                "incorrect chapter ID",
            );
            assert(
                work.chapters[0].workID === "327425279",
                "incorrect work ID",
            ); //why do we even store the work's ID publicly in a chapter?
        });
        await test.step("name", () => {
            assert(
                work.chapters[0].name === "Chapter 1 - Welcome to the Studio",
                "incorrect/missing chapter names",
            );
        });
        await test.step("content", () => {
            //FIXME: this should probably be tested better
            assert(
                (work.chapters[0].text).length > 0,
                "text/content is completely missing",
            );
        });
    });
}
