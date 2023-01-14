export type ID = BigInt | number | string;
export type {
    DOMParser,
} from "https://deno.land/x/deno_dom@v0.1.36-alpha/src/dom/dom-parser.ts";
export type {
    Element,
} from "https://deno.land/x/deno_dom@v0.1.36-alpha/src/dom/element.ts";
export type {
    HTMLDocument,
} from "https://deno.land/x/deno_dom@v0.1.36-alpha/src/dom/document.ts";

export interface StoryJSON {
    id: string;
    title: string;
    length: number;
    createDate: string;
    modifyDate: string;
    voteCount: number;
    readCount: number;
    commentCount: number;
    language: Language;
    user: SearchUser;
    description: string;
    cover: string;
    completed: boolean;
    categories: number[];
    tags: string[];
    rating: number;
    copyright: number;
    url: string;
    numParts: number;
    lastPublishedPart: LastPublishedPart;
    parts: Part[];
    deleted: boolean;
    tagRankings: TagRanking[];
    highlight_colour: string;
    promoted: boolean;
    sponsor: any[];
    isAdExempt: boolean;
    story_text_url: TextURL;
    isPaywalled: boolean;
    paidModel: string;
}

export interface Language {
    id: number;
    name: string;
}

export interface LastPublishedPart {
    createDate: string;
}

export interface Part {
    id: number;
    title: string;
    url: string;
    modifyDate: string;
    length: number;
    videoId: string;
    photoUrl: string;
    commentCount: number;
    voteCount: number;
    readCount: number;
    wordCount: number;
    text_url: TextURL;
    deleted?: boolean;
}

export interface TextURL {
    text: string;
}

export interface TagRanking {
    name: string;
    rank: number;
    total: number;
}

export interface SearchUser {
    name: string;
    avatar: string;
    fullname: string;
}

export interface SearchResults {
    nextUrl: string;
    stories: SearchStory[];
    tags: SearchTag[];
    total: number;
}

export interface SearchStory {
    completed: boolean;
    cover: string;
    description: string;
    id: string;
    isPaywalled: boolean;
    lastPublishedPart: LastPublishedPart;
    mature: boolean;
    numParts: number;
    paidModel: null;
    readCount: number;
    tags: string[];
    title: string;
    user: SearchUser;
    voteCount: number;
}

export interface SearchUser {
    name: string;
}

export interface SearchTag {
    count: number;
    id: string;
    name: string;
}
