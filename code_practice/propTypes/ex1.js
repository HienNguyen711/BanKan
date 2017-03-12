//import
//...

let titlePropType = (props,propName,componentName) => {
  if(props[propname]) {
    let value = props[propName];
    if(typeof value !== 'string' || value.length > 80){
      return new Error(
        `${propName} in ${componentName} is longer than 80 characters`
      );
    }

  }



}





//...
