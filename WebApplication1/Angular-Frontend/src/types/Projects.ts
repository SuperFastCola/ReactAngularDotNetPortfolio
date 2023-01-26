
export interface ProjectsInterface{
    length: number;
    projects:Array<ProjectDefinition>
}

export interface MainJson{
    contents:any,
    labels: any,
    projects: Array<ProjectDefinition>,
    sprites: any,
    types: any
}

export type BaseLanguageType = {
    [index: string]:any;
    en:string | undefined | null;
    fr:string | undefined | null;
}

export type BaseLanguageArrayType = {
    [index: string]:any;
    en:string[] | undefined | null;
    fr:string[] | undefined | null;
}

export type ImageType = {
    [index: string]:any;
    en:ImageSubType[]  | undefined | null;
    fr:ImageSubType[]  | undefined | null;
}

export type ImageSubType = {
    [index: string]:any;
    order:number;
    s:string;
    m:string;
    l:string;
    xl:string;
    show?:boolean;
}

export type UrlType = {
    [index: string]:any;
    en:UrlSubType[] | undefined | null;
    fr:UrlSubType[] | undefined | null;
}

export type UrlSubType = {
    [index: string]:any;
    link:string | undefined | null;
    text:string | undefined | null;
}

export type ProjectDefinition = {
    [index: string]:any;
    url: UrlType,
    id?: number;
    name: BaseLanguageType;
    description: BaseLanguageType;
    role: BaseLanguageType;
    tech: BaseLanguageArrayType;
    image:ImageType;
    projid:string;
    type: string[];
}

export type ErrorObject = {
    message?: string,
    callback?(args:any):any;
}

export type InputUpdateObject={
    name:string,
    value:any
}
