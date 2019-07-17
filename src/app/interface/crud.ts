export interface crud{

    create(name: string);
    read();
    update(idItem,editedName);
    delete(idItem: string);

}