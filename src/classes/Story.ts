import Chapter from "./Chapter.ts";
import { Session, StoryJSON } from "../types.d.ts";

export default class Story {
    #session: Session;
    /**
     * ID of the work
     */
    id: string;
    /**
     * internal story JSON; access for more detailed information
     */
    storyJSON!: StoryJSON;
    /**
     * the name of the work
     */
    name = "";
    /**
     * a list of Chapters in the work
     */
    chapters: Chapter[] = [];
    /**
     * a list of tags in the work
     */
    tags: string[] = [];
    /**
     * the approximate date the work was created
     */
    created?: Date;
    /**
     * the approximate date the work was last updated
     */
    updated?: Date;

    /**
     * represents a work on AO3
     * @param id the ID of the work
     * @param body the HTML body of the work (in text)
     * @param session an axiod session (used for fetching additional details)
     */
    constructor(
        id: string,
        session: Session,
    ) {
        this.#session = session;
        this.id = id;
    }

    async init() {
        this.storyJSON = await (await this.#session.get(
            `/api/v3/stories/${this.id}`,
            false,
            {
                params: new URLSearchParams({
                    drafts: "0",
                    include_deleted: "1",
                    fields:
                        "id,title,length,createDate,modifyDate,voteCount,readCount,commentCount,url,promoted,sponsor,language,user,description,cover,highlight_colour,completed,isPaywalled,paidModel,categories,numParts,readingPosition,deleted,dateAdded,lastPublishedPart(createDate),tags,copyright,rating,story_text_url(text),,parts(id,title,voteCount,commentCount,videoId,readCount,photoUrl,modifyDate,length,voted,deleted,text_url(text),dedication,url,wordCount),isAdExempt,tagRankings",
                }),
            },
        )).json();

        this.name = this.storyJSON.title;
        this.tags = this.storyJSON.tags;
        this.created = new Date(this.storyJSON.createDate);
        this.updated = new Date(this.storyJSON.modifyDate);
        this.chapters = this.storyJSON.parts.map((part) =>
            new Chapter(this.storyJSON.id, part, this.#session)
        );
    }
}
