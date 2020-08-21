import { Component, OnInit } from '@angular/core';
import { RecipeService }     from 'src/app/services/recipe.service';
import { ActivatedRoute }    from '@angular/router';
import { Observable }        from 'rxjs';
import { FirestoreData }     from 'src/app/models/firestore-data.interface';
import { Location }          from '@angular/common';

@Component({
  selector   : 'app-view-recipe',
  templateUrl: './view-recipe.component.html',
  styleUrls  : ['./view-recipe.component.css']
})
export class ViewRecipeComponent implements OnInit {

  public uidPatient: string = "";
         recipe$   : Observable<FirestoreData>;

  constructor(
    private recipeService: RecipeService,
    private route        : ActivatedRoute,
    private location     : Location
  ) {
    this.uidPatient = this.route.snapshot.parent.params['uid'];
  }

  GoBack() {
    this.location.back();
  }

  ngOnInit() {
    var uid          = this.route.snapshot.params['uid'];
        this.recipe$ = this.recipeService.GetById(uid);
  }

}
