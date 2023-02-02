import Wattpad from "../mod.ts";
import type { Story } from "../mod.ts";
import { assert } from "https://deno.land/std@0.167.0/testing/asserts.ts";

export default function test(watt: Wattpad) {
    Deno.test("stories", async (test) => {
        let story: Story;
        await test.step("initialization", async () => {
            story = watt.getStory("327425279");
            await story.init();
        });

        await test.step("tags", () => {
            assert(story.tags.length > 0, "Failed to parse any tags");
            assert(
                story.tags.includes("bendyxreader"),
                "Failed to get correct tags",
            );
        });

        await test.step("other metadata", () => {
            assert(
                story.name === "Inky Desires [Bendy X Reader]",
                "incorrect story name",
            );
        });

        await test.step("getting author displayname", async () => {
            const author = story.getAuthor();
            await author.init();
            assert(
                author.displayName === "DustyAngel47",
                "incorrect author displayname",
            );
        });
    });
}
