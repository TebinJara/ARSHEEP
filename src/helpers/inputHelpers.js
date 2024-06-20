// inputHelpers.js
const regexMap = {
    number: /^[0-9]$/,
    uppercase: /^[A-Z]$/,
    string: /^.*$/, // Permitir cualquier carácter
  };
  
  export const handleKeyDown = (event, charType) => {
    const regex = regexMap[charType] || /.*/;
    const char = event.key;
    if (!regex.test(char)) {
      event.preventDefault();
    }
  };
  
  export const handleChange = (event, setValue, charType) => {
    let value = event.target.value;
    if (charType === 'uppercase') {
      value = value.toUpperCase();
    }
    setValue(value);
  };