interface ITodoList {
  id: string;
  description: string;
}

class LocalStorage {
  private readonly storage: Array<ITodoList> = [];
  private readonly title: string = "";
  private readonly keyOfList: string = "@todo-app-list";
  private readonly keyOfTitle: string = "@todo-app-title";

  constructor() {
    const data: string = window.localStorage.getItem(this.keyOfList) || "";
    const title: string = window.localStorage.getItem(this.keyOfTitle) || "";

    if (data.length > 0) {
      const json = JSON.parse(data);
      this.storage = json;
    }

    if (title.length > 0) {
      this.title = title;
    }
  }

  public get getData(): Array<ITodoList> {
    return this.storage;
  }

  public get getTitle(): string {
    return this.title;
  }

  public save(data: Array<ITodoList>) {
    const formated = JSON.stringify(data);

    localStorage.setItem(this.keyOfList, formated);
  }

  public updateTitle(title: string) {
    localStorage.setItem(this.keyOfTitle, title);
  }
}

export default LocalStorage;
