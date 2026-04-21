export function convertToSerializableObject(leanDocument) {
  for (const key of Object.keys(leanDocument)) {
    if (leanDocument[key].toJSON && leanDocument[key].toString) {
      leanDocument[key] = leanDocument[key].toString();
    }
  }
  return leanDocument;
}
// basically all we need to do here is to check to see if each of the lean documents/properties that's passed in, if they have a `toJSON`  method, and if they have a `toString` method. And if they do, then we just want to set it to the string version using toString method
