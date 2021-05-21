import { Injectable } from "@angular/core";
import { Query, gql } from "apollo-angular";

const FETCH_ANIME_LIST_QUERY = gql`
query ($id: Int, $page: Int, $perPage: Int, $search: String) {
  Page (page: $page, perPage: $perPage) {
    pageInfo {
      total
      currentPage
      lastPage
      hasNextPage
      perPage
    }
    media (id: $id, search: $search) {
      id
      title {
        romaji,
        native,
      }
    }
  }
}
`

@Injectable()
export class AnimeListQuery extends Query<any> {
  document = FETCH_ANIME_LIST_QUERY
}