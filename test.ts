import Wattpad from "./mod.ts";

const wp = new Wattpad();

/*const search = wp.search({
    query: "bendy x reader",
});*/

const search = wp.tagSearch({
    tags: [
        "bendyxreader",
    ],
});

await search.update(0);

await search.results[0].init();

console.log(search.results[0]);
