export abstract class Mapper<I> {
  abstract fromMap(obj: any): I;
  abstract toMap(obj: I): any;
}
