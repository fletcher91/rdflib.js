/* tslint:disable max-classes-per-file only-arrow-functions */

declare module "rdflib" {
  import { BasicNamedNode } from "@ontologies/core"
  type CoreNamedNode = import("@ontologies/core").NamedNode
  type CoreBlankNode = import("@ontologies/core").BlankNode
  type CoreNode = import("@ontologies/core").Node
  type CoreLiteral = import("@ontologies/core").Literal
  type CoreTerm = import("@ontologies/core").Term
  type CoreQuad = import("@ontologies/core").Quad

  export interface BlankNodeIsh {
    termType: "BlankNode";
    value: string;
  }

  export interface LiteralIsh {
    datatype?: NamedNodeIsh;
    language?: string;
    termType: "Literal";
    value: string;
  }

  export interface NamedNodeIsh {
    termType: "NamedNode";
    value: string;
  }

  /**
   * Should return a truthy value to be kept as a callback.
   */
  export type RequestCallbackHandler = (uri: string | BasicNamedNode, error?: Error) => boolean | undefined;

  export type SomeTerm = CoreNode | CoreLiteral | Collection;

  export type OptionalNode = CoreNode | null | undefined;

  export type ActionFunction = (formula: Formula,
                                   subj: CoreNode,
                                   pred: CoreNamedNode,
                                   obj: CoreTerm,
                                   why: CoreNode) => boolean;

  export type Quadruple = [CoreNode, CoreNamedNode, CoreTerm, CoreNode];

  export type ToJSOutputTypes = string | number | Date | boolean | object |
    string[] | number[] | Date[] | boolean[] | object[];

  export class Node<RDFBase = {}> {
    public static fromValue<RDFBase, T extends CoreNode>(value: any): T;

    public static toJS(term: CoreNode): ToJSOutputTypes;

    public readonly termType: string;
    public readonly value: string;

    public compareTerm(other: CoreNode): number;

    public equals(other: CoreNode): boolean;

    public hashString(): string;

    public sameTerm(other: CoreNode): boolean;

    public toCanonical(): string;

    public toNT(): string;

    public toString(): string;
  }

  export class NamedNode extends Node implements CoreNamedNode {
    public readonly termType: "NamedNode";

    public term?: string;

    public uri: string;

    public constructor(iri: CoreNamedNode | string)

    public dir(): string;

    public doc(): CoreNamedNode;

    public site(): CoreNamedNode;
  }

  export class Literal extends Node implements CoreLiteral {
    public static fromBoolean(value: boolean): CoreLiteral;

    public static fromDate(value: Date): CoreLiteral;

    public static fromNumber(value: number): CoreLiteral;

    public static fromValue<CoreLiteral>(value: undefined | null | object | boolean | number | string): CoreLiteral;

    public readonly datatype: CoreNamedNode;

    public language: string;

    public readonly termType: "Literal";

    public constructor(value: string | number, language?: string, datatype?: CoreNamedNode | undefined)
  }

  export class BlankNode extends Node implements CoreBlankNode {
    public readonly termType: "BlankNode";

    public constructor(id?: string | null | undefined);
  }

  export class Collection extends Node<any> {
    public readonly closed: boolean;
    public readonly elements: SomeTerm[];
    public readonly termType: "Collection";

    public close(): boolean;

    public append(...elements: SomeTerm[]): number;

    public shift(): SomeTerm | undefined;

    public unshift(...elements: SomeTerm[]): number;
  }

  export class DefaultGraph extends Node {
  }

  export interface FetcherOpts {
    fetch?: GlobalFetch["fetch"];
    headers?: { [k: string]: string };
    handlers?: any[];
    timeout?: number;
  }

  export interface FetchOpts {
    fetch?: GlobalFetch["fetch"];
    referringTerm?: CoreNamedNode;
    contentType?: string;
    forceContentType?: string;
    force?: boolean;
    baseURI?: CoreNode | string;
    proxyUsed?: boolean;
    withCredentials?: boolean;
    clearPreviousData?: boolean;
    noMeta?: boolean;
    noRDFa?: boolean;
  }

  export type FetchSuccessCallback = (success: true, error: null, result: Response) => void;
  export type FetchFailureCallback = (success: false, error: string, result: undefined) => void;

  export class Fetcher {
    public static crossSiteProxyTemplate: string;

    public mediatypes: { [k: string]: { [k: string]: number } };

    public requested: { [k: string]: string | number | boolean };

    public constructor(store: Formula, options: FetcherOpts)

    public addCallback(hook: string, callback: RequestCallbackHandler): void;

    public handleError(response: Response, docuri: string | CoreNamedNode, options: RequestInit): Promise<any>;

    // tslint:disable-next-line no-any
    public load(url: CoreNamedNode[] | string[] | CoreNamedNode | string, options: FetchOpts): Promise<any>;

    public nowOrWhenFetched(uri: string | NamedNode,
                            options: RequestInit,
                            userCallback: FetchSuccessCallback | FetchFailureCallback): Promise<any>;
  }

  export class Formula extends Node {
    public statements: CoreQuad[];

    public bnode(id: string): CoreBlankNode;

    public holdsStatement(st: CoreQuad): boolean;

    public literal(val: string, lang: string | undefined, dt: CoreNamedNode | undefined): CoreLiteral;

    public sym(uri: string | CoreNamedNode, name?: string): CoreNamedNode;
  }

  export class IndexedFormula extends Formula {
    public defaultGraphIRI: CoreNamedNode;

    public length: number;

    public classActions: ActionFunction[];

    public features: string[];

    public index: CoreQuad[][];

    public objectIndex: { [k: string]: CoreQuad[] };

    public predicateIndex: { [k: string]: CoreQuad[] };

    public propertyActions: { [k: string]: ActionFunction[] };

    public subjectIndex: { [k: string]: CoreQuad[] };

    public whyIndex: { [k: string]: CoreQuad[] };

    public add(subj: CoreNode, pred: CoreNamedNode, obj: CoreTerm, why?: CoreNode): this | null | CoreQuad;

    public add(subj: CoreQuad | CoreQuad[] | IndexedFormula | IndexedFormula[]): this;

    public addAll(statements: CoreQuad[]): void;

    public addStatement(st: CoreQuad): CoreQuad | null;

    public any(subj: OptionalNode,
               pred?: OptionalNode,
               obj?: OptionalNode,
               why?: OptionalNode): CoreTerm | undefined;

    public anyStatementMatching(subj: OptionalNode,
                                pred?: OptionalNode,
                                obj?: OptionalNode,
                                why?: OptionalNode): CoreQuad | undefined;

    public anyValue(subj: OptionalNode,
                    pred?: OptionalNode,
                    obj?: OptionalNode,
                    why?: OptionalNode): string | undefined;

    public canon(term: CoreNode): CoreNode;

    public match(subj: OptionalNode,
                 pred?: OptionalNode,
                 obj?: OptionalNode,
                 why?: OptionalNode): CoreQuad[];

    public newPropertyAction(pred: CoreNamedNode, action: ActionFunction): boolean;

    public remove(st: CoreQuad[] | CoreQuad | IndexedFormula): this;

    public removeMany(sub: CoreNode, pred: CoreNode, obj: CoreNode, why: CoreNode, limit: number): void;

    public removeMatches(sub?: CoreNode | null, pred?: CoreNode | null, obj?: CoreNode | null, why?: CoreNode | null): this;

    public removeStatement(st: CoreQuad): this;

    public removeStatements(st: CoreQuad[]): this;

    public replaceWith(big: CoreNode, small: CoreNode): undefined | true;

    public statementsMatching(subj: CoreNode | undefined,
                              pred?: CoreNode | undefined,
                              obj?: CoreNode | undefined,
                              why?: CoreNode | undefined,
                              justOne?: boolean): CoreQuad[];

    public wildcardCompare(subj?: CoreNode, pred?: CoreNode, obj?: CoreNode, why?: CoreNode): (st: CoreQuad) => boolean;
  }

  export class Variable extends Node<any> {
  }

  export class Serializer {
    private flags: string;
    private base: string | null;
    private store: IndexedFormula;

    constructor(store: IndexedFormula);

    public fromStr(s: string): IndexedFormula;

    public setBase(base: string): this;

    public setFlags(flags: string): this;

    public toStr(): string;

    public toN3(f: IndexedFormula): string;

    public statementsToNTriples(sts: CoreQuad[]): string;

    public statementsToN3(sts: CoreQuad[]): string;

    public statementsToXML(sts: CoreQuad[]): string;

    public stringToN3(str: string, flags: string): string;

  }

  export class Statement implements CoreQuad {
    public static from(
      s: CoreNode,
      p: CoreNamedNode,
      o: SomeTerm,
      g?: CoreNode
    ): CoreQuad;

    public object: SomeTerm;

    public predicate: CoreNamedNode;

    public subject: CoreNode;

    public why: CoreNode;

    public graph: CoreNamedNode;

    public constructor(subject: CoreNode,
                       predicate: CoreNamedNode,
                       object: SomeTerm,
                       why?: CoreNode);

    public equals(other: CoreQuad): boolean;

    public substitute(bindings: CoreQuad): CoreQuad;

    public toNT(): string;

    public toQuad(): Quadruple;

    public toString(): string;
  }

  type NSFactory = (ln: string) => NamedNode;

  export type NamedNamespace<P extends {}> = P & NSFactory;

  export function Namespace<RDFBase, T extends string, U = { [K in T]: CoreNamedNode }>(nsuri: string, terms?: T[]): NamedNamespace<U>;

  export function generateNamespaceMap<T extends {}, U = { [k: string]: NamedNamespace<unknown & object> }>(nsm: T): Readonly<U>;

  export function parse(str: string, kb: Formula, base: string, contentType: string, callback: () => void): void;

  export namespace uri {
    export function docpart(uri: string): string;
    export function document(x: object): CoreNamedNode;
    export function hostpart(u: string): string;
    export function join(given: string, base: string): string;
    export function protocol(uri: string): string | null;
    export function refTo(base: string, uri: string): string;
  }

  /**
   * Data-factory functions
   */
  export function blankNode(value: string): CoreBlankNode;

  export function collection(value: string): Collection;

  export function defaultGraph(value: string): DefaultGraph;

  export function fetcher(value: string): Fetcher;

  export function graph(): IndexedFormula;

  export function lit(val: string, lang: string, dt: CoreNamedNode): CoreLiteral;

  export function literal(value: string, languageOrDatatype: string | NamedNode): CoreLiteral;

  export function namedNode(subject: CoreNode, predicate: CoreNode, object: CoreNode): CoreNamedNode;

  export function quad(subject: CoreNode, predicate: CoreNode, object: CoreNode): CoreQuad;

  export function st(subject: CoreNode, predicate: CoreNode, object: CoreNode): CoreQuad;

  export function triple(subject: CoreNode, predicate: CoreNode, object: CoreNode): CoreQuad;

  export function variable(subject: CoreNode, predicate: CoreNode, object: CoreNode): Variable;
}
