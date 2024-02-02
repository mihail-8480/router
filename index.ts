export abstract class RouteParser<TPart> {
  public abstract parse(src: string): TPart[];
  public abstract stringify(path: TPart[]): string;
  public normalize(path: string): string {
    return this.stringify(this.parse(path));
  }
}

export abstract class Router<T, TPart> {
  #parser: RouteParser<TPart>;
  public constructor(parser: RouteParser<TPart>) {
    this.#parser = parser;
  }
  protected abstract preformRegister(path: TPart[], action: T): void;
  protected abstract preformRoute(path: TPart[]): T | undefined;

  public get parser() {
    return this.#parser;
  }
  public register(path: string, action: T) {
    this.preformRegister(this.#parser.parse(path), action);
  }

  public route(path: string): T | undefined {
    return this.preformRoute(this.#parser.parse(path));
  }
}
