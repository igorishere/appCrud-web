import { Component } from '@angular/core';
import { DbServiceService } from './service/db-service.service';
import { Observable, empty } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

    private storedItems: Observable<any[]>;
    private lastStoredItem: any;
    private newItemName: string;
    
    constructor(
    private db: DbServiceService
  ){
    //getting all items on DB
    this.storedItems = this.db.read();

    //retrieving the last saved
    this.db.getLastSavedItem().subscribe(
      (lastSavedItem)=>{
        this.lastStoredItem = lastSavedItem;
      }
    )
  }


  //UPDATE
  editItem( itemId,newItemName){
    var editedItemName = prompt(
      `Old name: ${newItemName}`,//INPUT TITLE
      newItemName //input with data loaded
      );

      if(editedItemName!=""){ 
          this.db.update(itemId,editedItemName);
          alert("Alterações salvas");  
      }else{
        alert("OPS! o campo está vazio, não há nada para salvar" )
      }
  }


  //DELETE
  deleteItem(itemId: string,itemName: string){ 
    
    //Confirmating delete
    if( confirm(`Deseja excluir o item ${itemName}?`) ){
        let digitedItemName = prompt(`Digite ${itemName}`);

        if( digitedItemName == itemName ){
          //to confirm the delete, the user must write the deleted item name,
          //if the digited name is equal, the delete rotine will be executed
          this.db.delete(itemId);
          alert(`o item ${itemName} de ID ${itemId} foi EXCLUÍDO!`);
        }
        else{
          alert("O nome digitado não é o mesmo do item, tente novamente");
        }
    }
  }


  //CREATE
  addNewItem(){
    if(this.newItemName != null){
        let itemName = this.newItemName;//getting the value from input
        this.db.create(itemName);//saving data on firebase
        this.clearField();//clearing the input
        alert("saved!")//feedback for user
    }else{
      alert("Empty field, there´s nothing to save")
    }
  }

  //HELPER
  clearField(){
    //this function clear the input for save a nem item
    this.newItemName = "";
  }
}
