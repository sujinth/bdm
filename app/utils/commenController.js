// Function to format an array into a specific string format
export const formatDynamicOutput = async(arr) => {
    const result = arr.map(item =>{ 
      if(item !==''){
        return item
      }else{
        // If item is an empty string, return `''`
        return "''"
      }
      
    }).join('^@^');  // Join the items with `^@^` as the separator
  return result

};