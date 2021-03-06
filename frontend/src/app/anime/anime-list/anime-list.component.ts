import { Component, OnInit } from '@angular/core';
import { gql, QueryRef } from 'apollo-angular';
import { BehaviorSubject } from 'rxjs';
import { AnimeListQuery } from './anime-list.query';

const fragments = {
  pageInfo: gql`
    fragment MediaPageInfo on PageInfo {
      total
      currentPage
      lastPage
      hasNextPage
      perPage
    }
`,
  media: gql`
    fragment MediaItem on Media {
      id
      title {
        romaji,
        native,
      }
    }
`
}

@Component({
  templateUrl: './anime-list.component.html',
  styleUrls: ['./anime-list.component.scss'],
  providers:[AnimeListQuery]
})
export class AnimeListComponent implements OnInit {
  static fragments = fragments;

  fetchQuery!: QueryRef<any>;

  state$ = new BehaviorSubject<any>({});

  constructor(private query: AnimeListQuery) { }

  ngOnInit(): void {
    this.fetchQuery = this.query.watch({ page: 1, perPage: 20 });

    this.fetchQuery.valueChanges.subscribe(({loading, data}) => {
      this.state$.next({loading, animeList: data.Page.media, pageInfo: data.Page.pageInfo});
    })
  }
  
  more(page: number = 1) {
    this.fetchQuery.fetchMore({ 
      variables: { page },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) { return prev; }
      
        return fetchMoreResult;
      },
    });
  }
}
