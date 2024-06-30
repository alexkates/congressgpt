export type BillsFeed = {
  copyright: string;
  description: string;
  image: Image;
  items: Bill[];
  language: string;
  lastBuildDate: string;
  link: string;
  title: string;
  ttl: string;
};

type Image = {
  link: string;
  title: string;
  url: string;
};

export type Bill = {
  categories: string[];
  content: string;
  contentSnippet: string;
  guid: string;
  isoDate: string;
  link: string;
  pubDate: string;
  title: string;
};
