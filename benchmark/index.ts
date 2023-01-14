import Wattpad from "../mod.ts";

const wp = new Wattpad();

const search = wp.search({
    query: "bendy x reader",
});

await search.update(0);

await search.results[0].init();

console.log(search.results[0].name);

/*await search.results[0].chapters[0].init();

console.log(search.results[0].chapters[0].text);*/
