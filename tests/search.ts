import Wattpad from "../mod.ts";
import { assert } from "https://deno.land/std@0.167.0/testing/asserts.ts";

export default function test(watt: Wattpad) {
    Deno.test("normal searches", async (test) => {
        await test.step("specific search", async () => {
            const search = watt.search({
                query: "Inky Desires [Bendy x Reader]",
                type: "text",
            }); // if a search for the exact name of my fic doesn't return the fic i will shit myself

            await search.update(0);

            await search.results[0].init();

            assert(
                search.results[0].id === "327425279",
                "incorrect work found",
            );
        });
        await test.step("broad search", async () => {
            const search = watt.search({
                query: "huggy wuggy smut",
                type: "text",
            });

            await search.update(0);

            assert(search.results.length == 30, "not enough search results");

            await search.update(1);
            assert(
                search.results.length == 30,
                "could not find second page of results",
            );
        });
    });
    Deno.test("tag searches", async (test) => {
        await test.step("specific search", async () => {
            const search = watt.search({
                query: ["bluesourpachkid"],
                type: "tag",
            }); // if somebody else uses this exact tag (including misspelling) i will also shit myself

            await search.update(0);

            await search.results[0].init();

            assert(
                search.results[0].id === "290528000",
                "incorrect work found",
            );
        });
        await test.step("broad search", async () => {
            const search = watt.search({
                query: ["batim", "bendyxreader"],
                type: "tag",
                limit: 20,
            });

            await search.update(0);
            assert(search.results.length == 20, "not enough search results");

            await search.update(1);
            assert(
                search.results.length == 20,
                "could not find second page of results",
            );
        });
    });
}
