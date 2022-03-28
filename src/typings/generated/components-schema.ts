export interface FeatureStoryblok {
  name?: string;
  _uid: string;
  component: "feature";
  [k: string]: any;
}

export interface FooterNavListStoryblok {
  title?: string;
  links?: NavItemStoryblok[];
  _uid: string;
  component: "footer_nav_list";
  [k: string]: any;
}

export interface GlobalStoryblok {
  header_nav?: NavItemStoryblok[];
  header_logo?: {
    alt?: string;
    copyright?: string;
    id: number;
    filename: string;
    focus?: string;
    name: string;
    title?: string;
  };
  header_search_text?: string;
  footer_logo?: {
    alt?: string;
    copyright?: string;
    id: number;
    filename: string;
    focus?: string;
    name: string;
    title?: string;
  };
  footer_text?: string;
  footer_nav?: FooterNavListStoryblok[];
  footer_social?: NavItemStoryblok[];
  _uid: string;
  component: " global";
  [k: string]: any;
}

export interface GridStoryblok {
  columns?: any[];
  _uid: string;
  component: "grid";
  [k: string]: any;
}

export interface NavItemStoryblok {
  link?:
    | {
        cached_url?: string;
        linktype?: string;
        [k: string]: any;
      }
    | {
        id?: string;
        cached_url?: string;
        linktype?: "story";
        [k: string]: any;
      }
    | {
        url?: string;
        cached_url?: string;
        linktype?: "asset" | "url";
        [k: string]: any;
      }
    | {
        email?: string;
        linktype?: "email";
        [k: string]: any;
      };
  title?: string;
  icon?: {
    alt?: string;
    copyright?: string;
    id: number;
    filename: string;
    focus?: string;
    name: string;
    title?: string;
  };
  _uid: string;
  component: "nav_item";
  [k: string]: any;
}

export interface PageStoryblok {
  body?: any[];
  _uid: string;
  component: "page";
  uuid?: string;
  [k: string]: any;
}

export interface TeaserStoryblok {
  headline?: string;
  _uid: string;
  component: "teaser";
  [k: string]: any;
}
