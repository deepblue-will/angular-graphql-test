import { Injectable } from "@angular/core";
import { Query, gql } from "apollo-angular";
import { AnimeListComponent } from "./anime-list.component";

@Injectable()
export class AnimeListQuery extends Query<any> {
  document = gql`
    ${AnimeListComponent.fragments.media},
    ${AnimeListComponent.fragments.pageInfo}

    query ($id: Int, $page: Int, $perPage: Int, $search: String) {
      Page (page: $page, perPage: $perPage) {
        pageInfo {
          ...MediaPageInfo
        }
        media (id: $id, search: $search) {
          ...MediaItem
        }
      }
    }
  `
}