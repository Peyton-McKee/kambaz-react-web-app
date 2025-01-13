// I wrote this function a while ago
export const displayEnum = (enumString: string) => {
  enumString = enumString.toLowerCase();
  while (enumString.indexOf("_") !== -1) {
    enumString =
      enumString.substring(0, enumString.indexOf("_")) +
      " " +
      enumString.charAt(enumString.indexOf("_") + 1).toUpperCase() +
      enumString.slice(enumString.indexOf("_") + 2);
  }
  enumString = enumString.charAt(0).toUpperCase() + enumString.slice(1);
  return enumString;
};
