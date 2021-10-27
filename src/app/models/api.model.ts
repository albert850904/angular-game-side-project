export interface Game {
  id: number;
  background_image: string;
  name: string;
  released: string;
  metacritic_url: string;
  website: string;
  description: string;
  metacritic: number;
  genres: Array<Genre>;
  parent_platforms: Array<ParentPlatform>;
  publishers: Array<Publisher>;
  ratings: Array<Rating>;
  screenshots: Array<ScreenShot>;
  trailers: Array<Trailer>;
}

// 動態型別，傳進去的東西當作是型別
export interface APIResponse<T> {
  results: Array<T>;
  next: string;
  previous?: string;
}

interface Genre {
  name: string;
}

interface ParentPlatform {
  platform: {
    name: string;
    slug: string;
  };
}

interface Publisher {
  name: string;
}

interface Rating {
  id: number;
  count: number;
  title: string;
}

interface ScreenShot {
  image: string;
}

interface Trailer {
  data: {
    max: string;
  };
}
