import { PassDataService } from './../../../shared/serivces/pass-data.service';
import { ActivatedRoute } from '@angular/router';
import { Http } from '@angular/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-wiki-article',
  templateUrl: './wiki-article.component.html',
  styleUrls: ['./wiki-article.component.scss']
})
export class WikiArticleComponent implements OnInit {

  public article;

  public articleInfo;

  public articleId;

  constructor(private http: Http, private route: ActivatedRoute, private pData: PassDataService) { }

  ngOnInit() {
    this.pData.subject.subscribe(data => {
      this.articleInfo = data;
      console.log(this.articleInfo);
    });
    this.route.params.subscribe( params => {
      if(params['id']){
        this.articleId = params['id'];
      }
      this.http.get(`https://en.wikipedia.org/w/api.php?action=query&prop=info&pageids=${this.articleId}&inprop=url&format=json&origin=*`)
      .subscribe( data => {
        Object.keys(data.json()['query']['pages']).map(key => {
          this.article = data.json()['query']['pages'][key];
        });
        console.log(this.article);
      });
    });
    
  }

}
