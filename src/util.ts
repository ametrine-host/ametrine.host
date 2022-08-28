// util functions
export default {
  sreplace: (text: string, rep: Array<unknown>): string => {
    for (let i = 0; i < rep.length; i ++) {
      text = text.replace(new RegExp(`%${i}%`, "g"), rep[i] as string);
    }
    return text;
  },

  log  : (text: string): void => console.log  (`[ametrine] ${text}`),
  error: (text: string): void => console.error(`!!! [ametrine] ${text}`)
};
