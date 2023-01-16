import { Part as PartType, Session } from "../types.d.ts";

export default class Chapter {
    #session: Session;
    id: string;
    workID: string;
    /**
     * internal part JSON; includes more detailed info
     */
    partJSON: PartType;
    /**
     * name of the part
     */
    name = "";
    /**
     * exact html of the part
     */
    html = "";
    /**
     * the html of the part converted to markdown
     */
    text = "";

    constructor(
        workId: string,
        part: PartType,
        session: Session,
    ) {
        this.#session = session;
        this.workID = workId;
        this.partJSON = part;
        this.id = part.id.toString();
        this.name = part.title;
    }

    async init() {
        const html = await (await this.#session.get("/apiv2/storytext", false, {
            params: new URLSearchParams({
                id: this.id,
                mature: "1",
            }),
        })).text();

        this.html = html;

        // "parse" html to markdown with regex
        this.text = html
            .replaceAll(
                /<p( data-p-id=".{32}")?( style="(text-align):(left|right|center);")?>/g,
                "",
            ) //strip starting paragraph tags (they're useless)
            .replaceAll(/<\/?(em|i)>/g, "*") // i/emphasis tags -> md italics
            .replaceAll(/<\/?strong>/g, "**") // strong tag -> md bold
            .replaceAll(/<\/?u>/g, "__") // u tag -> discord md underline (the normal spec doesn't support underlines)
            .replaceAll(/<\/p>/g, "\n") // make ending p tags into newlines, to be consistent with wattpad rendering
            .replaceAll(/<br>/g, "\n") // make line break tags into real newlines
            .trim();
    }
}
