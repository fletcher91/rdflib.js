/* tslint:disable max-classes-per-file only-arrow-functions */

declare module "rdflib" {
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
    export type RequestCallbackHandler = (uri: string | NamedNode, error?: Error) => boolean | undefined;

    export type TermIsh = NamedNodeIsh | BlankNodeIsh | LiteralIsh;
    export type StatementIsh = StatementLike | Statement;

    export interface StatementLike {
        graph: TermIsh | undefined;
        object: TermIsh;
        predicate: NamedNodeIsh;
        subject: NamedNodeIsh | BlankNodeIsh;
    }

    export type SomeNode = NamedNode | BlankNode;

    export type SomeTerm = SomeNode | Literal | Collection;

    export type OptionalNode = Node | null | undefined;

    export type ActionFunction = (formula: Formula,
                                  subj: SomeNode,
                                  pred: NamedNode,
                                  obj: SomeTerm,
                                  why: Node) => boolean;

    export type ToJSOutputTypes = string | number | Date | boolean | object |
        string[] | number[] | Date[] | boolean[] | object[];

    export class Node {
        public static fromValue(value: any): Node;

        public static toJS(term: Node): ToJSOutputTypes;

        public readonly termType: string;
        public readonly value: string;

        public compareTerm(other: Node): number;

        public equals(other: Node): boolean;

        public hashString(): string;

        public sameTerm(other: Node): boolean;

        public toCanonical(): string;

        public toNT(): string;

        public toString(): string;
    }

    export class Term extends Node {
        public readonly sI: number;
    }

    export class NamedNode extends Term {
        public static find(iri: string | NamedNode, ln?: string): NamedNode;

        public static findByStoreIndex(si: number): NamedNode;

        public readonly termType: "NamedNode";

        public term?: string;

        public uri: string;

        public constructor(iri: NamedNode | string)

        public dir(): string;

        public doc(): NamedNode;

        public site(): NamedNode;
    }

    export class Literal extends Term {
        public static fromBoolean(value: boolean): Literal;

        public static fromDate(value: Date): Literal;

        public static fromNumber(value: number): Literal;

        public static fromValue(value: undefined | null | object | boolean | number | string): Literal;

        public static find(value: string, lang?: string | undefined, datatype?: NamedNode): Literal;

        public readonly datatype: NamedNode;

        public language: string;

        public readonly termType: "Literal";

        public constructor(value: string | number, language?: string, datatype?: NamedNode | undefined)
    }

    export class BlankNode extends Term {
        public static find(id?: string): BlankNode;

        public readonly termType: "BlankNode";

        public constructor(id?: string | null | undefined);
    }

    export class Collection extends Node {
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
        timeout?: number;
    }

    export interface FetchOpts {
        fetch?: GlobalFetch["fetch"];
        referringTerm?: NamedNode;
        contentType?: string;
        forceContentType?: string;
        force?: boolean;
        baseURI?: Node | string;
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

        public handleError(response: Response, docuri: string | NamedNode, options: RequestInit): Promise<any>;

        // tslint:disable-next-line no-any
        public load(url: NamedNode[] | string[] | NamedNode | string, options: FetchOpts): Promise<any>;

        public nowOrWhenFetched(uri: string | NamedNode,
                                options: RequestInit,
                                userCallback: FetchSuccessCallback | FetchFailureCallback): Promise<any>;
    }

    export class Formula extends Node {
        public statements: Statement[];

        public bnode(id: string): BlankNode;

        public holdsStatement(st: Statement): boolean;

        public literal(val: string, lang: string | undefined, dt: NamedNode | undefined): Literal;

        public sym(uri: string | NamedNode, name?: string): NamedNode;
    }

    export class IndexedFormula extends Formula {
        public defaultGraphIRI: NamedNode;

        public length: number;

        public classActions: ActionFunction[];

        public features: string[];

        public index: Statement[][];

        public objectIndex: { [k: string]: Statement[] };

        public predicateIndex: { [k: string]: Statement[] };

        public propertyActions: { [k: string]: ActionFunction[] };

        public subjectIndex: { [k: string]: Statement[] };

        public whyIndex: { [k: string]: Statement[] };

        public add(subj: SomeNode, pred: NamedNode, obj: SomeTerm, why?: Node): this | null | Statement;

        public add(subj: Statement | Statement[] | IndexedFormula | IndexedFormula[]): this;

        public addAll(statements: Statement[]): void;

        public any(subj: OptionalNode,
                   pred?: OptionalNode,
                   obj?: OptionalNode,
                   why?: OptionalNode): SomeTerm | undefined;

        public anyStatementMatching(subj: OptionalNode,
                                    pred?: OptionalNode,
                                    obj?: OptionalNode,
                                    why?: OptionalNode): Statement | undefined;

        public anyValue(subj: OptionalNode,
                        pred?: OptionalNode,
                        obj?: OptionalNode,
                        why?: OptionalNode): string | undefined;

        public canon(term: Node): Node;

        public match(subj: OptionalNode,
                     pred?: OptionalNode,
                     obj?: OptionalNode,
                     why?: OptionalNode): Statement[];

        public newPropertyAction(pred: NamedNode, action: ActionFunction): boolean;

        public remove(st: Statement[] | Statement | IndexedFormula): this;

        public removeMany(sub: Node, pred: Node, obj: Node, why: Node, limit: number): void;

        public removeMatches(sub?: Node | null, pred?: Node | null, obj?: Node | null, why?: Node | null): this;

        public removeStatement(st: Statement): this;

        public removeStatements(st: Statement[]): this;

        public replaceWith(big: Node, small: Node): undefined | true;

        public statementsMatching(subj: Node | undefined,
                                  pred?: Node | undefined,
                                  obj?: Node | undefined,
                                  why?: Node | undefined,
                                  justOne?: boolean): Statement[];

        public wildcardCompare(subj?: Node, pred?: Node, obj?: Node,  why?: Node): (st: Statement) => boolean;
    }

    export class Variable extends Node {
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

        public statementsToNTriples(sts: Statement[]): string;

        public statementsToN3(sts: Statement[]): string;

        public statementsToXML(sts: Statement[]): string;

        public stringToN3(str: string, flags: string): string;

    }

    export class Statement {
        public static from(s: SomeNode, p: NamedNode, o: SomeTerm, g: Node): Statement;

        public object: SomeTerm;

        public predicate: NamedNode;

        public subject: SomeNode;

        public why: Node;

        public constructor(subject: SomeNode,
                           predicate: NamedNode,
                           object: SomeTerm,
                           why?: Node | string | undefined);

        public equals(other: Statement): boolean;

        public substitute(bindings: Statement): Statement;

        public toNT(): string;

        public toString(): string;
    }

    export type NamedNamespace = (ln: string) => NamedNode;

    export function Namespace(nsuri: string): (ln: string) => NamedNode;

    export function parse(str: string, kb: Formula, base: string, contentType: string, callback: () => void): void;

    export namespace uri {
        export function docpart(uri: string): string;
        export function document(x: object): NamedNode;
        export function hostpart(u: string): string;
        export function join(given: string, base: string): string;
        export function protocol(uri: string): string | null;
        export function refTo(base: string, uri: string): string;
    }

    /**
     * Data-factory functions
     */
    export function blankNode(value: string): BlankNode;

    export function collection(value: string): Collection;

    export function defaultGraph(value: string): DefaultGraph;

    export function fetcher(value: string): Fetcher;

    export function graph(): IndexedFormula;

    export function lit(val: string, lang: string, dt: NamedNode): Literal;

    export function literal(value: string, languageOrDatatype: string | NamedNode): Literal;

    export function namedNode(subject: Node, predicate: Node, object: Node): NamedNode;

    export function quad(subject: Node, predicate: Node, object: Node): Statement;

    export function st(subject: Node, predicate: Node, object: Node): Statement;

    export function triple(subject: Node, predicate: Node, object: Node): Statement;

    export function variable(subject: Node, predicate: Node, object: Node): Variable;
}
