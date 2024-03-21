

// Function to change key name
// Function to change key name in all objects within the array
function changeKey(array, oldKey, newKey) {
    array.forEach(obj => {

      if (obj.hasOwnProperty(oldKey) && (oldKey != newKey)) {
        obj[newKey] = obj[oldKey];
        delete obj[oldKey];
      }
    });
  }


function changeToGeneralType(arrayOfObjects, typeName, typePrice, typeContent, typeImage) {
    changeKey(arrayOfObjects, typeName, "name");
    changeKey(arrayOfObjects, typePrice, "price");
    changeKey(arrayOfObjects, typeContent, "content");
    changeKey(arrayOfObjects, typeImage, "image");

}

function getServiceElements(arrayOfObjects) {
    //console.log(arrayOfObjects[0].serviceElements);
    return arrayOfObjects[0].serviceElements;
}
export { changeToGeneralType, getServiceElements };
