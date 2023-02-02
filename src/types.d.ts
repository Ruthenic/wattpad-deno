import { newSession } from "./utils/http.ts";

export type Session = ReturnType<typeof newSession>;

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
    createDate: string;
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

export interface UserJSON {
    username: string;
    avatar: string;
    isPrivate: boolean;
    backgroundUrl: string;
    follower: boolean;
    following: boolean;
    followerRequest: string;
    followingRequest: string;
    safety: Safety;
    name: string;
    description: string;
    genderCode: string;
    language: number;
    createDate: string;
    location: string;
    verified: boolean;
    ambassador: boolean;
    facebook: string;
    twitter: string;
    website: string;
    votesReceived: number;
    numStoriesPublished: number;
    numFollowing: number;
    numFollowers: number;
    numLists: number;
    verified_email: boolean;
    is_staff: boolean;
    highlight_colour: string;
    programs: Programs;
    externalId: string;
    showSocialNetwork: boolean;
}

export interface Programs {
    wattpad_stars: boolean;
    wattpad_circle: boolean;
}

export interface Safety {
    isMuted: boolean;
    isBlocked: boolean;
}
