export const capitalizeFirstLetter = (word:any) => {
 return word.charAt(0).toUpperCase() + word.slice(1);
};

export const handleSelectString = (word:any) => {
 word = word[0];
 word = word.split('_');
 word = word.map((item:any) => capitalizeFirstLetter(item));
 return word.join(' ');
};
