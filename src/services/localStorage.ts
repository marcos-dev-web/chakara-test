interface ITodoList {
  id: string;
  description: string;
}

class LocalStorage {
  private readonly storage: Array<ITodoList> = [];
  private readonly key: string = "@todo-app-list";

  constructor() {
    const data: string = window.localStorage.getItem(this.key) || "";

    if (data.length > 0) {
      const json = JSON.parse(data);
      this.storage = json;
    }
  }

  public get getData() {
    return this.storage;
  }

  public save(data: Array<ITodoList>) {
    const formated = JSON.stringify(data);

    localStorage.setItem(this.key, formated);
  }
}

export default LocalStorage;
