import Wattpad from "../mod.ts";
import type { User } from "../mod.ts";
import { assert } from "https://deno.land/std@0.167.0/testing/asserts.ts";

export default function test(watt: Wattpad) {
    Deno.test("users", async (test) => {
        let user: User;
        await test.step("initialization", async () => {
            user = watt.getUser("DustyAngel47");
            await user.init();
        });

        await test.step("metadata", () => {
            assert(
                user.username === "DustyAngel47",
                "incorrect username (somehow)",
            );
            assert(
                user.displayName === "DustyAngel47",
                "incorrect display name",
            );
        });

        await test.step("stories", async () => {
            await user.updateStories(0);
            // FIXME: should be resistant to me publishing more than one fic
            assert(
                user.stories.find((story) => story.id === "327425279"),
                "incorrect stories found",
            );
        });
    });
}
