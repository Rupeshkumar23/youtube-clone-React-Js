export const API_KEY = "AIzaSyApAKr_GCD8V3IyKgNK2jlS3YLbrg86lmY";

export const value_converter = (value) => {
  if (value>=1000000) {
    return Math.floor(value/1000000) + "M";
  } 
  else if (value >= 1000) {
    return Math.floor(value / 1000) + "K";
  } 
  else {
    return value;
  }
};
