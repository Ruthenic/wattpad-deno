import Wattpad from "../mod.ts";
import type { Story } from "../mod.ts";
import { assert } from "https://deno.land/std@0.167.0/testing/asserts.ts";

export default function test(watt: Wattpad) {
    Deno.test("stories", async (test) => {
        let work: Story;
        await test.step("initialization", async () => {
            work = watt.getStory("327425279");
            await work.init();
        });

        await test.step("tags", () => {
            assert(work.tags.length > 0, "Failed to parse any tags");
            assert(
                work.tags.includes("bendyxreader"),
                "Failed to get correct tags",
            );
        });

        await test.step("other metadata", () => {
            assert(
                work.name === "Inky Desires [Bendy X Reader]",
                "incorrect work name",
            );
        });
    });
}
